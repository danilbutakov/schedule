import { View, Text, Dimensions } from 'react-native';
import React from 'react';

const { height } = Dimensions.get('screen');

const FAQScreen = () => {
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
				В разработке
			</Text>
		</View>
	);
};

export default FAQScreen;
