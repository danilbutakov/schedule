import { useEffect, useState } from 'react';
import { fs } from '../utils/firebaseNative';
import auth from '@react-native-firebase/auth';

export const useFetchUserDataItems = () => {
	const [profileItems, setProfileItems] = useState([]);
	const [image, setImage] = useState(null);
	const user = auth().currentUser;

	useEffect(() => {
		if (!user?.uid) return;
		const userRef = fs.collection('users').doc(user.uid);
		const unsubscribe = userRef.onSnapshot((doc) => {
			if (doc.exists) {
				const docData = doc.data();
				setProfileItems([docData]);
				setImage(docData.photoURL);
			} else {
				setProfileItems(null);
			}
		});
		return unsubscribe;
	}, [user]);

	return { profileItems, image, setImage };
};
