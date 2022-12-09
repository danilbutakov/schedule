import { View, Text, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';
import AppContext from '../../utils/Context';
import ContactItem from '../../components/Contacts/ContactItem';
// import ChatItem from '../../components/Chat/ChatItem';
import { useContacts } from '../../hooks/useContacts';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const Chats = () => {
	const currentUser = auth().currentUser;
	const { rooms, setRooms, setUnfilteredRooms } = useContext(AppContext);

	const contacts = useContacts();
	const chatsQuery = query(
		collection(fs, 'rooms'),
		where('participantsArray', 'array-contains', currentUser.email)
	);

	useEffect(() => {
		const unsubscribe = onSnapshot(chatsQuery, querySnapshot => {
			const parsedChats = querySnapshot.docs
				.filter(doc => doc.data().lastMessage)
				.map(doc => ({
					...doc.data(),
					id: doc.id,
					userB: doc
						.data()
						.participants.find(p => p.email !== currentUser.email)
				}));
			setRooms(parsedChats);
		});
		return () => unsubscribe();
	}, []);

	const getUserB = (user, contacts) => {
		const userContact = contacts.find(c => c.email === user.email);
		if (userContact && userContact.profileName) {
			return { ...user, profileName: userContact.profileName };
		}
		return user;
	};

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData();
		wait(1000).then(() => setRefreshing(false));
	}, []);

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 5
			}}>
			<View>
				{rooms.map(room => (
					<ContactItem
						type='chat'
						description={room.lastMessage.text}
						key={room.id}
						room={room}
						time={room.lastMessage.createdAt}
						user={getUserB(room.userB, contacts)}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
					/>
				))}
			</View>
		</View>
	);
};

export default Chats;
