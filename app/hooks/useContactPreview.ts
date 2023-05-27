import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { fs } from '../../firebase';

export const useContactPreview = (contact, refreshing) => {
	const [userPreview, setUserPreview] = useState(contact);

	useEffect(() => {
		setUserPreview(contact);
	}, [refreshing]);

	useEffect(() => {
		const q = query(
			collection(fs, 'users'),
			where('email', '==', userPreview.email)
		);
		const unsubscribe = onSnapshot(q, snapshot => {
			if (snapshot.docs.length) {
				const userDoc = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setUserPreview(prevUser => ({ ...prevUser, userDoc }));
			}
		});

		return () => unsubscribe();
	}, [refreshing, contact]);

	return { userPreview };
};
