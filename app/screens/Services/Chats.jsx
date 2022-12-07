import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';
import AppContext from '../../utils/Context';
import ContactItem from '../../components/Contacts/ContactItem';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const Chats = () => {
	const currentUser = auth().currentUser;
	const { rooms, setRooms, contactUser, setUnfilteredRooms } =
		useContext(AppContext);
	const chatsQuery = query(
		collection(fs, 'rooms'),
		where('participantsArray', 'array-contains', currentUser.email)
	);

	useEffect(() => {
		const unsubscribe = onSnapshot(chatsQuery, querySnapshot => {
			const parsedChats = querySnapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
				userB: doc.data().participants.find(p => p.email !== currentUser.email)
			}));
			setUnfilteredRooms(parsedChats);
			setRooms(parsedChats.filter(doc => doc.lastMessage));
		});
		return () => unsubscribe();
	}, []);

	const getUserB = (user, contactUser) => {
		const userContact = contactUser.find(c => c.email === user.email);
		if (userContact && userContact.profileName) {
			return { ...user, profileName: userContact.profileName };
		}
		return user;
	};

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => setRefreshing(false));
	}, []);

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 10
			}}>
			<ScrollView
				style={{ flex: 1 }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
				{rooms.map(room => (
					<ContactItem
						style={{ marginTop: 7, marginBottom: 10 }}
						type='chat'
						description={room.lastMessage.text}
						key={room.id}
						room={room}
						time={room.lastMessage.createdAt}
						user={getUserB(room.userB, contactUser)}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default Chats;
