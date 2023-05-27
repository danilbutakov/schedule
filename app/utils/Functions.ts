import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

import { storage } from '../../firebase';

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
