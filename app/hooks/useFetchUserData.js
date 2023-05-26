import { useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../firebase';

export const useFetchUserData = () => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const user = auth().currentUser;

	useEffect(() => {
		(async () => {
			const userRef = await doc(fs, 'users', user?.uid);
			await onSnapshot(userRef, doc => {
				if (doc.data()) {
					const data = doc.data();
					setUserData(data);
					setIsLoading(false);
				} else {
					setUserData(null);
					setIsLoading(false);
				}
			});
		})();
	}, [user]);

	return { userData, setUserData, isLoading };
};
