import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fs } from '../../../firebase';
import Avatar from './Avatar';
import SearchImg from '../../../assets/svgUtils/search.svg';
import Delete from '../../../assets/svgUtils/delete.svg';

const SearchContacts = () => {
	const currentUser = auth().currentUser;
	const navigation = useNavigation();

	const [searchValue, setSearchValue] = useState('');
	const newSearchValue = searchValue.toLowerCase();

	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [curUser, setCurUser] = useState({});

	const [userPhoto, setUserPhoto] = useState([]);

	const fetchCurrentUser = async () => {
		const q = query(
			collection(fs, 'users'),
			where('email', '==', currentUser.email)
		);

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			setCurUser(doc.data());
		});
	};

	useEffect(() => {
		fetchCurrentUser();
	}, [currentUser]);

	const handleSelect = async (user: {
		uid: string | number;
		displayName: string;
		profileName: string;
		photoURL: string;
	}) => {
		// создаем комбо id двух юзеров в чате
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;
		try {
			const res = await getDoc(doc(fs, 'chats', combinedId));
			const q1 = query(
				collection(fs, 'users'),
				where('email', '!=', currentUser.email)
			);
			await getDocs(q1).then(snapshot => {
				const newData = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setUsers(newData);
			});
			const chat = res.data();
			const chatUserUid = await chat?.uids.filter(
				(uid: string | number) => uid !== currentUser?.uid
			);

			const filteredUser = await users?.find(
				user => user.uid === `${chatUserUid}`
			);

			//создаем чаты юзеров
			if (!res.exists()) {
				//создаем чат в коллекции чатов
				await setDoc(doc(fs, 'chats', combinedId), {
					messages: [],
					uids: [currentUser.uid, user.uid],
					names: [
						user.displayName || user.profileName,
						curUser.profileName
					],
					photos: [user.photoURL, currentUser.photoURL],
					date: serverTimestamp(),
					combinedId: combinedId
				}).then(async () => {
					const res = await getDoc(doc(fs, 'chats', combinedId));
					const q1 = query(
						collection(fs, 'users'),
						where('email', '!=', currentUser.email)
					);
					await getDocs(q1).then(snapshot => {
						const newData = snapshot.docs.map(doc => ({
							...doc.data()
						}));
						setUsers(newData);
					});
					const chat = res.data();
					const chatUserUid = await chat.uids.filter(
						(uid: string) => uid !== currentUser?.uid
					);

					const filteredUser = await users.find(
						user => user.uid === `${chatUserUid}`
					);
					navigation.navigate('Chat', { chat, userB: filteredUser });
				});
			} else {
				navigation.navigate('Chat', { chat, userB: filteredUser });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSearch = async () => {
		const q = query(
			collection(fs, 'users'),
			where('uid', '!=', currentUser.uid)
		);

		const unsubscribe = onSnapshot(q, querySnapshot => {
			setUsers(
				querySnapshot.docs.map(doc => {
					return { ...doc.data() };
				})
			);
			return () => unsubscribe();
		});

		if (searchValue.length > 2) {
			setFilteredUsers(
				users.filter(
					user =>
						user.profileName
							.toLowerCase()
							.includes(newSearchValue) ||
						user.email.toLowerCase().includes(newSearchValue)
				)
			);
		} else {
			setFilteredUsers([]);
		}
	};

	useEffect(() => {
		handleSearch();
	}, [searchValue]);

	return (
		<View style={styles.searchCont}>
			<View style={styles.searchBlock}>
				<View style={styles.inputBlock}>
					<View style={styles.leftBlock}>
						<SearchImg
							width={12}
							height={12}
							style={{ marginRight: 13 }}
						/>
						<TextInput
							style={styles.inputText}
							onChangeText={text => {
								setSearchValue(text);
							}}
							value={searchValue}
							placeholder='Поиск по имени или e-mail'
						/>
					</View>
					{searchValue && (
						<TouchableOpacity
							style={{ flex: 1 }}
							onPress={() => setSearchValue('')}>
							<Delete width={20} height={20} />
						</TouchableOpacity>
					)}
				</View>
			</View>
			{filteredUsers.length > 0 && (
				<ScrollView
					style={{
						backgroundColor: '#e5e5ea',
						borderRadius: 16,
						paddingTop: 20,
						paddingHorizontal: 10
					}}>
					{filteredUsers.map((user, key) => (
						<View
							style={{
								borderRadius: 20,
								marginBottom: 20,
								flex: 1
							}}
							key={key}>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									flex: 1
								}}>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate('ContactInfo', {
											user
										})
									}
									style={{
										display: 'flex',
										flexDirection: 'row',
										flex: 1
									}}>
									<Avatar user={user} size={50} />
									<View style={{ flex: 1 }}>
										<Text
											style={{
												fontFamily: 'Montserrat-Bold',
												fontSize: 14,
												marginBottom: 5
											}}>
											{user.profileName}
										</Text>
										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												flex: 1
											}}>
											<Text
												ellipsizeMode='tail'
												numberOfLines={1}
												style={{
													fontFamily:
														'Montserrat-Regular',
													color: '#8E8E93',
													fontSize: 14,
													flex: 3.5,
													paddingRight: 10
												}}>
												{user.email}
											</Text>
										</View>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										handleSelect(user).then(() =>
											setSearchValue('')
										);
									}}>
									<Ionicons
										size={35}
										name='md-chatbubbles-sharp'
										color={'#3eb59f'}
									/>
								</TouchableOpacity>
							</View>
							<View
								style={{
									borderBottomWidth: 1,
									borderBottomColor: '#7c7772',
									paddingTop: 10
								}}></View>
						</View>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default SearchContacts;

const styles = StyleSheet.create({
	searchCont: {
		width: '100%',
		paddingHorizontal: 5,
		marginVertical: 5,
		borderRadius: 16
	},
	searchBlock: {
		width: '100%',
		borderRadius: 16,
		backgroundColor: '#e5e5ea',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: 5
	},
	inputBlock: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 16,
		flex: 1
	},
	leftBlock: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 14
	},
	inputText: {
		fontSize: 16,
		fontFamily: 'Montserrat-Medium',
		lineHeight: 20,
		flex: 14
	}
});
