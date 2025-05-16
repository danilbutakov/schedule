import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { fs } from '../utils/firebaseNative';

export const useFetchUserData = () => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const user = auth().currentUser;

	useEffect(() => {
		if (!user?.uid) return;
		const userRef = fs.collection('users').doc(user.uid);
		const unsubscribe = userRef.onSnapshot((doc) => {
			if (doc.exists) {
				setUserData(doc.data());
				setIsLoading(false);
			} else {
				setUserData(null);
				setIsLoading(false);
			}
		});
		return unsubscribe;
	}, [user]);

	return { userData, setUserData, isLoading };
};
