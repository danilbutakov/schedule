import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

import { storage } from '../../firebase';

export const pickImage = async () => {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		quality: 1
	});
	return result;
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

	const snapshot = await uploadBytes(imageRef, blob, {
		contentType: 'image/jpeg'
	});

	blob.close();

	const url = await getDownloadURL(snapshot.ref);

	return { url, fileName };
};
