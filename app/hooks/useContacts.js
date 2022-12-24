import { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';

import { fs } from '../../firebase';
import auth from '@react-native-firebase/auth';

export const useContacts = () => {
	const [contacts, setContacts] = useState([]);
	const currentUser = auth().currentUser;
	useEffect(() => {
		(async () => {
			const q = query(
				collection(fs, 'users'),
				where('email', '!=', currentUser.email)
			);
			await getDocs(q).then(snapshot => {
				const newData = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setContacts(newData);
			});
		})();
	}, []);
	return contacts;
};
