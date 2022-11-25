import { View, Text, Dimensions } from 'react-native';
import React from 'react';

const { height } = Dimensions.get('screen');

const PremiumScreen = () => {
	return (
		<View
			style={{
				backgroundColor: '#F7F7F7',
				height,
				paddingHorizontal: 20
			}}>
			<Text
				style={{
					fontFamily: 'Montserrat-SemiBold',
					fontSize: 15,
					lineHeight: 20,
					marginTop: 20
				}}>
				В скором будущем здесь вы сможете оформить подписку :D
			</Text>
		</View>
	);
};

export default PremiumScreen;
