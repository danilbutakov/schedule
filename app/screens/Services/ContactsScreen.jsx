import { FlatList, View, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot
} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';
import AppContext from '../../utils/Context';
import ContactItem from '../../components/Contacts/ContactItem';

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const ContactsScreen = () => {
	const { contactUser, setContactUser } = useContext(AppContext);
	const currentUser = auth().currentUser;

	const route = useRoute();
	const image = route.params && route.params.image;

	const fetchData = async () => {
		const q = query(
			collection(fs, 'users'),
			where('email', '!=', currentUser.email)
		);

		const querySnapshot = await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setContactUser(newData);
		});
		return () => querySnapshot();
	};

	useEffect(() => {
		fetchData();
	}, []);

	const [refreshing, setRefreshing] = React.useState(false);

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
				paddingHorizontal: 10
			}}>
			<FlatList
				data={contactUser}
				style={{ flex: 1 }}
				keyExtractor={(_, i) => i}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				renderItem={({ item }) => (
					<ContactPreview contact={item} image={image} />
				)}
			/>
		</View>
	);
};

const ContactPreview = ({ contact, image }) => {
	const { unfilteredRooms } = useContext(AppContext);
	const [userPreview, setUserPreview] = useState(contact);

	const currentUser = auth().currentUser;

	useEffect(() => {
		const q = query(
			collection(fs, 'users'),
			where('email', '==', userPreview.email)
		);
		const unsubscribe = onSnapshot(q, snapshot => {
			if (snapshot.docs.length) {
				const userDoc = snapshot.docs[0].data();
				setUserPreview(prevUser => ({ ...prevUser, userDoc }));
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<ContactItem
			style={{ marginTop: 7, marginBottom: 10 }}
			type='contacts'
			user={userPreview}
			image={image}
			room={unfilteredRooms.find(room =>
				room.participantsArray.includes(currentUser.email)
			)}
		/>
	);
};

export default ContactsScreen;
