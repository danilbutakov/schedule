import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fs } from '../../firebase';

export const useFetchContacts = () => {
	const currentUser = auth().currentUser;

	const [contacts, setContacts] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const fetchData = async () => {
		const q = query(
			collection(fs, 'users'),
			where('email', '!=', currentUser.email)
		);

		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setContacts(newData);
			if (refreshing) {
				setContacts(newData);
			}
		});
	};

	const wait = timeout => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData();
		wait(1000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		fetchData();
	}, [refreshing]);

	return { contacts, onRefresh, refreshing };
};
