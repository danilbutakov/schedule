import React from 'react';
import {
	View,
	Text,
	RefreshControl,
	TouchableOpacity,
	FlatList
} from 'react-native';

import AvatarChat from './AvatarChat';
import { useFetchChats } from '../../hooks/useFetchChats';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useNavigation } from '@react-navigation/native';

const Chats = () => {
	const { userData } = useFetchUserData();
	const navigation = useNavigation();

	const {
		// @ts-ignore
		usersB,
		// @ts-ignore
		chatsFiltered,
		// @ts-ignore
		usersBPhotos,
		// @ts-ignore
		usersBNames
	} = useFetchChats(userData);

	return (
		<FlatList
			data={chatsFiltered}
			maxToRenderPerBatch={10}
			renderItem={({ item }) => {
				const chatUserUid = item.uids.filter(
					uid => uid !== userData?.uid
				);

				const filteredUser = usersB.find(
					user => user.uid === `${chatUserUid}`
				);

				return (
					<TouchableOpacity
						onPress={() => {
							// @ts-ignore
							navigation.navigate('Chat', {
								chat: item,
								userB: filteredUser
							});
						}}
						style={{
							marginBottom: 20,
							backgroundColor: '#FFFFFF',
							borderRadius: 50,
							elevation: 1,
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
									image={usersBPhotos.filter(
										photo => photo === filteredUser.photoURL
									)}
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
												fontFamily:
													'Montserrat-SemiBold',
												fontSize: 16
											}}>
											{usersBNames.filter(
												name =>
													name ===
													filteredUser.profileName
											)}
										</Text>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center'
											}}>
											{/* {chat?.lastMessage && ( */}
											<View
												style={{
													flexDirection: 'row',
													marginTop: 7
												}}>
												<Text
													style={{
														fontSize: 14,
														color: '#81F2DF',
														fontFamily:
															'Montserrat-Regular'
													}}>
													Вы: {''}
												</Text>
												<Text
													style={{
														fontFamily:
															'Montserrat-Regular',
														fontSize: 14,
														maxWidth: 160
													}}
													numberOfLines={1}
													ellipsizeMode='tail'>
													{/* {description} */}
													ваше сообщение
												</Text>
											</View>
											{/* )} */}
											{item?.date && (
												<View
													style={{
														marginTop: 7,
														marginLeft: 5
													}}>
													<Text
														style={{
															fontFamily:
																'Montserrat-Medium',
															color: '#A5A5A5'
														}}>
														{'• ' +
															new Date()
																.toLocaleTimeString()
																.replace(
																	/(.*)\D\d+/,
																	'$1'
																)}
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
			}}
		/>
	);
};

export default Chats;
