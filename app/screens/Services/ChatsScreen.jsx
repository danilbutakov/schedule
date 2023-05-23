import {
	FlatList,
	RefreshControl,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where
} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { fs } from '../../../firebase';
import AvatarChat from '../../components/Chat/AvatarChat';
import { useFetchUserData } from '../../hooks/useFetchUserData';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const ChatsScreen = () => {
	const currentUser = auth().currentUser;
	const [chats, setChats] = useState([]);
	const [chatsFiltered, setChatsFiltered] = useState([]);
	const navigation = useNavigation();
	const [usersB, setUsersB] = useState([]);
	const [usersBPhotos, setUsersBPhotos] = useState([]);
	const [usersBNames, setUsersBNames] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const { userData } = useFetchUserData();

	const fetchChats = async () => {
		try {
			const q1 = query(
				collection(fs, 'users'),
				where('email', '!=', currentUser.email)
			);
			await getDocs(q1).then(snapshot => {
				const newData = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setUsersB(newData);
			});

			const q = query(collection(fs, 'chats'));

			const unsub = onSnapshot(q, snapshot => {
				const chatDoc = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setChats(chatDoc);
			});

			return () => unsub();
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchChats();
		return () => setChats([]);
	}, [currentUser, userData?.profileName]);

	useEffect(() => {
		let fChats = chats.filter(c => c.uids.includes(currentUser.uid));
		if (fChats.length) {
			setChatsFiltered(fChats);
			const usersBUids = fChats.map(c =>
				c.uids.filter(d => d !== currentUser.uid)
			);

			const str2 = usersBUids.map(r => r.join(''));
			const str = usersB.filter(b => str2.includes(b.uid));
			const photos = str.map(s => s.photoURL);
			setUsersBPhotos(photos);
			const names = str.map(s => s.profileName);
			setUsersBNames(names);
		} else {
			setChatsFiltered([]);
		}
	}, [chats]);

	useEffect(() => {
		const chatUserUid = chatsFiltered.map(item =>
			item.uids.filter(uid => uid !== userData?.uid)
		);

		const filteredUser = usersB.find(user => user.uid === `${chatUserUid}`);
	}, [refreshing]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchChats();
		wait(1000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		fetchChats();
	}, [refreshing]);

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 10
			}}>
			{chatsFiltered.length ? (
				<FlatList
					data={chatsFiltered}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
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
									navigation.navigate('Chat', {
										chat: item,
										userB: filteredUser
									});
								}}
								style={{
									backgroundColor: '#FFFFFF',
									borderRadius: 150,
									padding: 5,
									marginBottom: 20
								}}>
								<Animatable.View
									animation='fadeIn'
									duration={300}
									useNativeDriver
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center'
										}}>
										<AvatarChat
											image={usersBPhotos.filter(
												photo =>
													photo ===
													filteredUser.photoURL
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
															flexDirection:
																'row',
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
								</Animatable.View>
							</TouchableOpacity>
						);
					}}
				/>
			) : (
				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%'
					}}>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 17
						}}>
						Начните общение с кем нибудь &#128521;
					</Text>
				</View>
			)}
		</View>
	);
};

export default ChatsScreen;
