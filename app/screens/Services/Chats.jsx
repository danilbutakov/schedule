import { View, Text, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';
import AppContext from '../../utils/Context';
import ContactItem from '../../components/Contacts/ContactItem';
import ChatItem from '../../components/Chat/ChatItem';

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
				userB: doc.data().participants.find(b => b.email !== currentUser.email)
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
					<ChatItem
						type='chats'
						description={room.lastMessage.text}
						key={room.id}
						roomId={room.id}
						room={room}
						time={room.lastMessage.createdAt}
						user={getUserB(room.userB, contactUser)}
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
