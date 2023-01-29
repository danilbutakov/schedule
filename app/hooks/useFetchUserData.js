import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { fs } from '../../firebase';
import auth from '@react-native-firebase/auth';

const useFetchUserData = () => {
	const [userData, setUserData] = useState(null);
	const user = auth().currentUser;

	useEffect(() => {
		if (user) {
			const userRef = doc(fs, 'users', user.uid);
			return onSnapshot(userRef, doc => {
				if (doc.data()) {
					const data = doc.data();
					if (data?.uid === user.uid) {
						setUserData(data);
					}
				} else {
					setUserData(null);
				}
			});
		} else {
			setUserData(null);
		}
	}, [user]);

	return { userData, setUserData };
};

export default useFetchUserData;
