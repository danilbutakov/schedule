import { FlatList, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot
} from 'firebase/firestore';

import { fs } from '../../../firebase';
import AppContext from '../../utils/Context';
import ContactItem from '../../components/Contacts/ContactItem';
import useAuth from '../../hooks/useAuth';

const ContactsScreen = () => {
	const { user } = useAuth();
	const { contactUser, setContactUser } = useContext(AppContext);

	const route = useRoute();
	const image = route.params && route.params.image;

	const fetchData = async () => {
		await getDocs(
			collection(fs, 'users'),
			where('email', '!=', user.email)
		).then(querySnapshot => {
			const newData = querySnapshot.docs.map(doc => ({
				...doc.data()
			}));
			setContactUser(newData);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 20
			}}>
			<FlatList
				data={contactUser}
				style={{ flex: 1, padding: 10 }}
				keyExtractor={(_, i) => i}
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
	const { user } = useAuth();
	useEffect(() => {
		//нужно сделать обычную проверку у contactUser
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
				room.participantsArray.includes(contact.email)
			)}
		/>
	);
};

export default ContactsScreen;
