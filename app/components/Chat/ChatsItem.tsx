import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AvatarChat from './AvatarChat';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useFetchChats } from '../../hooks/useFetchChats';
import { useNavigation } from '@react-navigation/native';

const ChatsItem = ({ item }) => {
	const { userData } = useFetchUserData();
	const { usersB, usersBPhotos, usersBNames } = useFetchChats(userData);
	const navigation = useNavigation();

	const chatUserUid = item.uids.filter(uid => uid !== userData?.uid);
	const filteredUser = usersB.find(user => user.uid === `${chatUserUid}`);

	return (
		<TouchableOpacity
			onPress={() => {
				// @ts-ignore
				navigation.navigate('Chat', {
					chat: item,
					userB: filteredUser
				});
				navigation.setOptions({ tabBarVisible: false });
			}}
			style={{
				marginHorizontal: 2
			}}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: 5
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
									fontSize: 16
								}}>
								{usersBNames.filter(
									name => name === filteredUser.profileName
								)}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center'
								}}>
								<View
									style={{
										flexDirection: 'row',
										marginTop: 7
									}}>
									<Text
										style={{
											fontSize: 14,
											color: '#3eb59f',
											fontFamily: 'Montserrat-Regular'
										}}>
										Вы: {''}
									</Text>
									<Text
										style={{
											fontFamily: 'Montserrat-Regular',
											fontSize: 14,
											maxWidth: 160
										}}
										numberOfLines={1}
										ellipsizeMode='tail'>
										ваше сообщение
									</Text>
								</View>
								{item?.date && (
									<View
										style={{
											marginTop: 7,
											marginLeft: 5
										}}>
										<Text
											style={{
												fontFamily: 'Montserrat-Medium',
												color: '#A5A5A5'
											}}>
											{'• ' +
												new Date()
													.toLocaleTimeString()
													.replace(/(.*)\D\d+/, '$1')}
										</Text>
									</View>
								)}
							</View>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ChatsItem;
