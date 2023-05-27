import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { fs } from '../../firebase';
import auth from '@react-native-firebase/auth';

export const useFetchUserDataItems = () => {
	const [profileItems, setProfileItems] = useState([]);
	const [image, setImage] = useState(null);
	const user = auth().currentUser;

	useEffect(() => {
		(async () => {
			const userRef = doc(fs, 'users', user.uid);
			await onSnapshot(userRef, doc => {
				if (doc.data()) {
					const docData = doc.data();
					setProfileItems([docData]);
					setImage(doc.data().photoURL);
				} else {
					setProfileItems(null);
				}
			});
		})();
	}, [user]);

	return { profileItems, image, setImage };
};
