import { useEffect, useState } from 'react';

import { pickImage } from '../utils/Functions';

export const useHandleProfilePicture = () => {
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			const result = await pickImage();
			if (!result.canceled) {
				setImage(result.assets[0].uri);
			}
		})();
	}, []);

	return { image, setImage };
};
