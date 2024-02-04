import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Entypo from 'react-native-vector-icons/Entypo';

import AvatarChat from './AvatarChat';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useFetchChats } from '../../hooks/useFetchChats';
import { fs } from '../../../firebase';
import Readed from '../../../assets/images/readed.svg';
import NotReaded from '../../../assets/images/notReaded.svg';

const ChatsItem = ({ item }) => {
	const { userData } = useFetchUserData();
	const { usersB, usersBPhotos, usersBNames } = useFetchChats(userData);
	const navigation = useNavigation();

	const chatUserUid = item.uids.filter(uid => uid !== userData?.uid);
	const filteredUser = usersB.find(user => user.uid === `${chatUserUid}`);
	const query = collection(fs, `messages/${item.combinedId}/children`);
	const [docs, loading, error] = useCollectionData(query);
	const theme = useTheme();

	const lastMessage = docs?.map(item => item.message).pop();
	const timeMessage = docs?.map(item => item.time).pop();
	const senderMessage = docs?.map(item => item.senderId).pop();
	const isRead = docs?.map(item => item.isRead).pop();
	const isImageLast = docs?.map(item => item.image).pop();

	const handleUpdateRead = async () => {
		for (let i = 0; i <= docs?.length; i++) {
			const document = docs[i];
			if (document?.isRead === false) {
				const docRef = doc(
					fs,
					`messages/${item.combinedId}/children/${document.messageId}`
				);
				await updateDoc(docRef, {
					isRead: true
				});
			}
		}
	};

	return (
		<TouchableOpacity
			onPress={() => {
				// @ts-ignore
				navigation.navigate('Chat', {
					chat: item,
					userB: filteredUser
				});
				navigation.setOptions({ tabBarVisible: false });

				if (senderMessage !== userData.uid) {
					handleUpdateRead();
				}
			}}
			style={{
				marginHorizontal: 2,
				width: '100%'
			}}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: 5,
					width: '100%'
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					<AvatarChat
						image={usersBPhotos
							.filter(photo => photo === filteredUser.photoURL)
							.toString()}
						size={50}
					/>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}>
						<View
							style={{
								flexDirection: 'column'
							}}>
							<Text
								style={{
									fontFamily: 'Montserrat-SemiBold',
									fontSize: 16,
									color: theme.colors.tertiary
								}}>
								{usersBNames.filter(name => name === filteredUser.profileName)}
							</Text>
							{docs?.length === 0 ? (
								<Text
									style={{
										fontSize: 14,
										color: '#3eb59f',
										fontFamily: 'Montserrat-Regular'
									}}>
									Начните общение первым
								</Text>
							) : (
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between'
									}}>
									<View
										style={{
											flexDirection: 'row'
										}}>
										<Text
											style={{
												fontSize: 14,
												color: '#3eb59f',
												fontFamily: 'Montserrat-Regular'
											}}>
											{senderMessage === userData?.uid && 'Вы: '}
										</Text>
										<Text
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: 14,
												maxWidth: 160,
												color: theme.colors.tertiary
											}}
											numberOfLines={1}
											ellipsizeMode='tail'>
											{isImageLast ? 'Фото' : lastMessage}
										</Text>
									</View>
									{item?.date && (
										<View
											style={{
												marginLeft: 5
											}}>
											<Text
												style={{
													fontFamily: 'Montserrat-Medium',
													color: '#A5A5A5'
												}}>
												{'• ' + timeMessage}
											</Text>
										</View>
									)}
								</View>
							)}
						</View>
					</View>
				</View>
				{isRead && senderMessage === userData?.uid && <Readed />}
				{!isRead && senderMessage === userData?.uid && <NotReaded />}
				{senderMessage !== userData?.uid && !isRead && docs?.length !== 0 && (
					<Entypo name='dot-single' size={30} color={'white'} />
				)}
			</View>
		</TouchableOpacity>
	);
};

export default ChatsItem;
