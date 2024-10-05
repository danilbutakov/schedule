import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';

import Alert from '../../AlertDialog';
import { fs } from '../../../../firebase';
import Avatar from '../../Chat/AvatarChat';
import { deleteChat } from '../../../store/slices/deletechatSlice';
// @ts-ignore

import { collection, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatHeader = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const dispatch = useDispatch();
	const [selectEdit, setSelectEdit] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const theme = useTheme();

	const ids = route.params['chat'].combinedId;
	const query = collection(fs, `messages/${ids}/children`);
	const [docs, loading, error] = useCollectionData(query);

	const handleDeleteChat = async () => {
		try {
			// @ts-ignore
			dispatch(deleteChat(route));
			for (let i = 0; i <= docs?.length; i++) {
				const document = docs[i];
				await deleteDoc(
					doc(fs, 'messages', `${ids}/children/${document.messageId}`)
				);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View
			style={{
				backgroundColor: theme.colors.first,
				borderBottomColor: theme.colors.secondary,
				borderBottomWidth: 1,
				paddingTop: 10,
				paddingBottom: 10,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingHorizontal: 15
			}}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Feather name={'chevron-left'} size={25} color={'white'} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						// @ts-ignore
						navigation.navigate('ContactInfo', {
							user: route.params['userB']
						})
					}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginLeft: 20,
							alignItems: 'center'
						}}>
						<Avatar size={40} image={String(route.params['userB'].photoURL)} />
						<Text
							style={{
								fontFamily: 'Montserrat-SemiBold',
								fontSize: 19,
								lineHeight: 25,
								color: theme.colors.tertiary
							}}>
							{route.params['userB']?.profileName ||
								route.params['userB']?.displayName}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={{
					backgroundColor: '#d1d1d1b2',
					padding: 7,
					borderRadius: 50,
					position: 'absolute',
					right: 15,
					top: 14
				}}
				onPress={() => setSelectEdit(!selectEdit)}>
				<Entypo name='dots-three-vertical' size={20} />
			</TouchableOpacity>
			{selectEdit && (
				<Animatable.View animation='fadeIn' duration={400} useNativeDriver>
					<TouchableOpacity
						style={{
							position: 'absolute',
							right: 0,
							left: -250,
							top: 35,
							backgroundColor: '#d1d1d1',
							borderRadius: 10,
							paddingHorizontal: 10,
							paddingVertical: 10,
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center'
						}}
						onPress={() => {
							setIsOpen(!isOpen);
						}}>
						<MaterialCommunityIcons
							size={25}
							name='delete-forever'
							style={{ marginRight: 10 }}
							color={'#3eb59f'}
						/>
						{isOpen && (
							<Alert
								header={'Удалить чат'}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
								btnText={'Удалить'}
								anotherFunc={() => {
									handleDeleteChat().then(() => {
										setSelectEdit(false);
										// @ts-ignore
										navigation.navigate('chats');
									});
								}}
								body={'Вы действительно хотите удалить чат?'}
							/>
						)}
						<Text
							style={{
								fontFamily: 'Montserrat-Medium',
								color: '#1E1E1F',
								fontSize: 16
							}}>
							Удалить чат
						</Text>
					</TouchableOpacity>
				</Animatable.View>
			)}
		</View>
	);
};

export default ChatHeader;
