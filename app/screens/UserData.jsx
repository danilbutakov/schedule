import { View, Dimensions } from 'react-native';
import React, { useState, useCallback } from 'react';
import VuzInfo from '../components/userInfo/VuzInfo';
import GroupInfo from '../components/userInfo/GroupInfo';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const { height, width } = Dimensions.get('screen');

const UserData = () => {
	const [showUniv, setShowUniv] = useState(true);
	const [showGroup, setShowGroup] = useState(false);

	const [univ, setUniv] = useState('');
	const [group, setGroup] = useState('');

	const [fontsLoaded] = useFonts({
		'Montserrat-Black': require('../../assets/fonts/Montserrat-Black.ttf')
	});
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			{showUniv && (
				<VuzInfo
					univ={univ}
					setUniv={setUniv}
					setShowUniv={setShowUniv}
					setShowGroup={setShowGroup}
				/>
			)}
			{showGroup && (
				<GroupInfo
					group={group}
					setGroup={setGroup}
					univ={univ}
					setUniv={setUniv}
					setShowGroup={setShowGroup}
				/>
			)}
		</View>
	);
};

export default UserData;
