import { View, RefreshControl, TouchableOpacity, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';
import ChatItem from '../../components/Chat/ChatItem';
import Avatar from '../../components/Contacts/Avatar';
import { ChatContext } from '../../utils/ChatContext';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const Chats = () => {
	const currentUser = auth().currentUser;
	const [chats, setChats] = useState([]);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(fs, 'userChats', currentUser.uid), doc => {
				setChats(doc.data());
			});

			return () => unsub();
		};
		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = u => {
		dispatch({ type: 'CHANGE_USER', payload: u });
	};

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData();
		wait(1000).then(() => setRefreshing(false));
	}, []);

	// <ChatItem
	// 					key={chat[0]}
	// 					type='chat'
	// 					// description={room.lastMessage.text}
	// 					// time={room.lastMessage.createdAt}
	// 					chat={chat}
	// 					refreshControl={
	// 						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	// 					}
	// 				/>

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 5
			}}>
			<View>
				{Object.entries(chats)?.map(chat => {
					if (chat[1].displayName) {
						return (
							<TouchableOpacity
								// onPress={() => navigation.navigate('Chat', { user, room, image, roomId })}
								onPress={() => handleSelect(chat[1])}
								key={chat[0]}
								style={{
									backgroundColor: '#FFFFFF',
									borderRadius: 150,
									padding: 5,
									marginBottom: 20
								}}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Avatar user={chat[1]} size={50} />
										<View
											style={{ flexDirection: 'row', alignItems: 'center' }}>
											<View style={{ flexDirection: 'column' }}>
												<Text
													style={{
														fontFamily: 'Montserrat-SemiBold',
														fontSize: 16
													}}>
													{chat[1].displayName}
												</Text>
												<View
													style={{
														flexDirection: 'row',
														alignItems: 'center'
													}}>
													{chat[1]?.lastMessage && (
														<View
															style={{
																flexDirection: 'row',
																marginTop: 7
															}}>
															<Text
																style={{
																	fontSize: 14,
																	color: '#81F2DF',
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
																{/* {description} */}
															</Text>
														</View>
													)}
													{chat[1]?.date && (
														<View style={{ marginTop: 7, marginLeft: 10 }}>
															<Text
																style={{
																	fontFamily: 'Montserrat-Medium',
																	color: '#A5A5A5'
																}}>
																{new Date(time.seconds * 1000)
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
					} else {
						return null;
					}
				})}
			</View>
		</View>
	);
};

export default Chats;
