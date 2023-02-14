import { useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { fs } from '../../firebase';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchUserData = () => {
	const [userData, setUserData] = useState(null);
	const user = auth().currentUser;

	useMemo(() => {
		if (user) {
			const userRef = doc(fs, 'users', user.uid);
			return onSnapshot(userRef, doc => {
				if (doc.data()) {
					const data = doc.data();
					if (data.uid === user.uid) {
						setUserData(data);
					}
				} else {
					setUserData(null);
				}
			});
		} else {
			setUserData(null);
		}
	}, [user.uid]);

	const saveUserDataToDevice = async userData => {
		try {
			const stringifyUserData = JSON.stringify(userData);
			await AsyncStorage.setItem('userData', stringifyUserData);
		} catch (e) {
			console.error(e);
		}
	};

	const getUserDataFromUserDevice = async () => {
		try {
			const userTodos = await AsyncStorage.getItem('userData');
			if (userTodos !== null) {
				setUserData(JSON.parse(userTodos));
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getUserDataFromUserDevice();
	}, []);

	useEffect(() => {
		saveUserDataToDevice(userData);
	}, [userData]);

	return { userData, setUserData };
};

export default useFetchUserData;
