import { Dimensions, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

const FAQScreen = () => {
	const theme = useTheme();
	return (
		<View
			style={[
				{
					height,
					paddingHorizontal: 20
				},
				{ backgroundColor: theme.colors.first }
			]}>
			<Text
				style={[
					{
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 15,
						lineHeight: 20,
						marginTop: 20
					},
					{ color: theme.colors.tertiary }
				]}>
				В разработке
			</Text>
		</View>
	);
};

export default FAQScreen;
