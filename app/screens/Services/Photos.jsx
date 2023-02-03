import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { pickImage } from '../../utils/Functions';

const Photos = () => {
	const navigation = useNavigation();
	const [cancelled, setCancelled] = useState(false);
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			const result = await pickImage();
			navigation.navigate('Contacts', { image: result });
			if (result.canceled) {
				setTimeout(() => {
					setCancelled(true);
					navigation.navigate('Chat');
				}, 100);
			}
		});
		return () => unsubscribe();
	}, [navigation, cancelled]);
	return <View />;
};

export default Photos;
