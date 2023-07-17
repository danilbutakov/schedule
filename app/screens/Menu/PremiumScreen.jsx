import { View, Text, Dimensions } from 'react-native';
import React from 'react';

const { height } = Dimensions.get('screen');

const PremiumScreen = () => {
	return (
		<View
			style={{
				backgroundColor: '#1E1E1F',
				height,
				paddingHorizontal: 20
			}}>
			<Text
				style={{
					fontFamily: 'Montserrat-SemiBold',
					fontSize: 15,
					lineHeight: 20,
					marginTop: 20,
					color: '#F7F7F7'
				}}>
				В разработке
			</Text>
		</View>
	);
};

export default PremiumScreen;
