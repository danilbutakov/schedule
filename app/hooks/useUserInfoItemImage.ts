import { useEffect, useState } from 'react';
import { useFetchUserDataItems } from './useFetchDataItems';

export const useUserInfoItemImage = () => {
	const [image, setImage] = useState(null);
	const { profileItems } = useFetchUserDataItems();

	useEffect(() => {
		const photo = profileItems?.map(item => item.photoURL);
		const photoURL = photo.toString();

		setImage(photoURL);
	}, [profileItems]);

	return { image, setImage };
};
