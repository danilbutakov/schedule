import { useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { fs } from '../../firebase';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchUserData = () => {
	const [userData, setUserData] = useState(null);
	const user = auth().currentUser;

	const fetchData = async () => {
		const userRef = await doc(fs, 'users', user.uid);
		await onSnapshot(userRef, doc => {
			if (doc.data()) {
				const data = doc.data();
				if (data.uid === user.uid) {
					setUserData(data);
				}
			}
		});
	};

	useMemo(() => {
		fetchData();
	}, [user]);

	const saveUserDataToDevice = async data => {
		try {
			const stringifyUserData = JSON.stringify(data);
			await AsyncStorage.setItem('userData', stringifyUserData);
		} catch (e) {
			console.error(e);
		}
	};

	const getUserDataFromUserDevice = async () => {
		try {
			const userDeviceData = await AsyncStorage.getItem('userData');
			if (userDeviceData !== null) {
				setUserData(JSON.parse(userDeviceData));
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		saveUserDataToDevice(userData);
	}, [userData]);

	useEffect(() => {
		getUserDataFromUserDevice();
	}, []);

	return { userData, setUserData };
};

export default useFetchUserData;
