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

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const ChatsScreen = () => {
	const currentUser = auth().currentUser;
	const [chats, setChats] = useState([]);
	const [chatsFiltered, setChatsFiltered] = useState([]);
	const navigation = useNavigation();
	const [curUser, setCurUser] = useState(null);
	const [usersB, setUsersB] = useState([]);

	const fetchChats = async () => {
		const qU = query(
			collection(fs, 'users'),
			where('email', '==', currentUser.email)
		);

		const querySnapshot = await getDocs(qU);
		querySnapshot.forEach(doc => {
			setCurUser(doc.data());
		});

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
			if (snapshot.docs.length) {
				const chatDoc = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setChats(chatDoc);
			}
		});
		return () => unsub();
	};

	useEffect(() => {
		fetchChats().then(() => console.log('Чаты загружены'));
		return () => setChats([]);
	}, [currentUser.uid]);

	useEffect(() => {
		if (chats !== undefined) {
			let fChats = chats.filter(c => c.uids.includes(currentUser.uid));
			setChatsFiltered(fChats);
		}
	}, [chats]);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchChats();
		wait(1000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		fetchChats().then(() => console.log('Чаты загружены'));
	}, [refreshing]);

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 10
			}}>
			<FlatList
				data={chatsFiltered}
				keyExtractor={(_, i) => i}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={async () => {
							const chatUserUid = item.uids.filter(
								uid => uid !== curUser?.uid
							);

							const filteredUser = await usersB.find(
								user => user.uid === `${chatUserUid}`
							);

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
									image={item.photos.filter(
										photo => photo !== currentUser.photoURL
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
											{item.names.filter(
												name =>
													name !== curUser.profileName
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
						</Animatable.View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default ChatsScreen;
