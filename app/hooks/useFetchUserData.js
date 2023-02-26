import { useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../firebase';

const useFetchUserData = () => {
	const [userData, setUserData] = useState(null);
	const user = auth().currentUser;

	const fetchData = async () => {
		const userRef = await doc(fs, 'users', user.uid);
		await onSnapshot(userRef, doc => {
			if (doc.data()) {
				const data = doc.data();
				setUserData(data);
			} else {
				setUserData(null);
			}
		});
		// console.log('GOOD fetch DATA', userData);
	};

	useMemo(() => {
		fetchData();
	}, []);

	return { userData, setUserData, fetchData };
};

export default useFetchUserData;
