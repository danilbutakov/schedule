import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

import { fs, storage } from '../../firebase';
import auth from '@react-native-firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';
import { useFetchUserDataItems } from '../hooks/useFetchDataItems';
import { useUserInfoItemImage } from '../hooks/useUserInfoItemImage';
import { useContext } from 'react';
import AppContext from './Context';

export const pickImage = async () => {
	return await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		quality: 1
	});
};

export const uploadImage = async (uri, path, fName) => {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			resolve(xhr.response);
		};
		xhr.onerror = error => {
			console.log(error);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});
	const fileName = fName || nanoid();
	const imageRef = ref(storage, `${path}/${fileName}.jpeg`);

	// @ts-ignore
	const snapshot = await uploadBytes(imageRef, blob, {
		contentType: 'image/jpeg'
	});

	// @ts-ignore
	blob.close();

	const url = await getDownloadURL(snapshot.ref);

	return { url, fileName };
};

export const handleActiveDay = (index, setActiveDay) => {
	if (index === 0) {
		setActiveDay('Понедельник');
	} else if (index === 1) {
		setActiveDay('Вторник');
	} else if (index === 2) {
		setActiveDay('Среда');
	} else if (index === 3) {
		setActiveDay('Четверг');
	} else if (index === 4) {
		setActiveDay('Пятница');
	} else if (index === 5) {
		setActiveDay('Суббота');
	}
};

export const getWeekDay = async (
	setWeekType,
	setActiveWeekType,
	setActive,
	setIndex,
	setActiveDay
) => {
	try {
		const d = new Date();
		let day = d.getDay();

		let currentDate = new Date();
		let startDate = new Date(currentDate.getFullYear(), 0, 1);
		let days = Math.floor(
			// @ts-ignore
			(currentDate - startDate) / (24 * 60 * 60 * 1000)
		);
		let weekNumber = Math.ceil(days / 7);

		if (weekNumber % 2) {
			setWeekType('Числитель');
			setActiveWeekType('Числитель');
		} else {
			setWeekType('Знаменатель');
			setActiveWeekType('Знаменатель');
		}

		setActive(day - 1);
		setIndex(day - 1);
		handleActiveDay(day, setActiveDay);
	} catch (e) {
		console.error(e);
	}
};

export const createProfile = async (
	profileName,
	image,
	setIsLoading,
	userId,
	email,
	univ,
	group,
	role,
	setProfileName
) => {
	if (profileName !== '' && image !== null) {
		setIsLoading(true);
		let photoURL;
		if (image) {
			const { url } = await uploadImage(
				image,
				`images/${userId}`,
				'profilePicture'
			);
			photoURL = url;
		}
		const userData = {
			profileName: profileName,
			email: email,
			univ: univ,
			group: group,
			role: role,
			photoURL
		};
		if (photoURL) {
			userData.photoURL = photoURL;
		}
		try {
			// @ts-ignore
			await auth().currentUser.updateProfile(userData);
			await setDoc(doc(fs, 'users', userId), {
				...userData,
				uid: userId
			}).then(() => {
				console.log('good authorized');
				setIsLoading(false);

				setProfileName('');
			});
		} catch (e) {
			console.error(e);
			setIsLoading(false);

			setProfileName('');
		} finally {
			setIsLoading(false);
			setProfileName('');
		}
	}
};

export const handleProfilePicture = async setImage => {
	const result = await pickImage();

	if (!result.canceled) {
		setImage(result.assets[0].uri);
	}
};

export const handleUserInfoPicture = async (
	setImage,
	setNewImage,
	newImage,
	image
) => {
	const result = await pickImage();

	if (!result.canceled) {
		setNewImage(result.assets[0].uri);
		setImage(null);
	}
};

export const handleUpdatePassword = async (auth, email) => {
	sendPasswordResetEmail(auth, email)
		.then(() => {
			Alert.alert('Письмо со сменой пароля успешно отправлено');
		})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log(errorCode);
			Alert.alert(errorMessage);
		});
};

export const handleUpdateImage = async (userRef, newImage) => {
	await updateDoc(userRef, {
		photoURL: newImage
	});
};

export const handleUpdateProfile = async (
	group: string,
	univ: string,
	userName: string,
	user,
	setUserName,
	setUniv,
	setGroup,
	newImage,
	setNewImage,
	setImage,
	setIsLoading
) => {
	const userRef = doc(fs, 'users', user.uid);

	try {
		setIsLoading(true);

		if (group !== '' && group !== ' ') {
			await updateDoc(userRef, {
				group: group
			});
		}

		if (univ !== '' && univ !== ' ') {
			await updateDoc(userRef, {
				univ: univ
			});
		}

		if (userName !== '' && userName !== ' ') {
			await updateDoc(userRef, {
				profileName: userName
			});
		}

		if (newImage) {
			let photoUrl;
			const { url } = await uploadImage(
				newImage,
				`images/${user.uid}`,
				'profilePicture'
			);
			photoUrl = url;
			if (photoUrl) {
				setImage(photoUrl);
				await user.updateProfile({ photoURL: photoUrl });
				newImage ? await handleUpdateImage(userRef, newImage) : null;
			}
		}
	} catch (e) {
		console.log(e);
		setIsLoading(false);
	} finally {
		Alert.alert('Вы успешно обновили профиль');
		setIsLoading(false);
		setUserName('');
		setUniv('');
		setGroup('');
		setNewImage(null);

		// useFetchUserDataItems();
	}
};
