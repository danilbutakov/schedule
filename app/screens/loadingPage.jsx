import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

import { images } from '../../assets/globalImages';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const LoadingPage = () => {
	const { user } = useAuth();

	const navigation = useNavigation();

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigation.navigate('Home');
			}, 2200);
		}
		if (!user) {
			setTimeout(() => {
				navigation.navigate('AuthScreen');
			}, 2200);
		}
	}, [user]);

	return (
		<View>
			<Image source={images.loadingIcon.LI} />
			<Text>SCHEDULE</Text>
		</View>
	);
};

export default LoadingPage;
