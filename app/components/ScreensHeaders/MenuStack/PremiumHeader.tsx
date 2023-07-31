import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
// @ts-ignore
import Arrow from '../../../../assets/svgUtils/Arrow.svg';

const PremiumHeader = () => {
	const navigation = useNavigation();
	const theme = useTheme();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Menu')}>
			<View
				style={{
					backgroundColor: theme.colors.first,
					borderBottomColor: theme.colors.secondary,
					borderBottomWidth: 1,
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 20,
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Arrow
					style={{
						transform: [{ rotateY: '180deg' }]
					}}
				/>
				<Text
					style={{
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 17,
						lineHeight: 25,
						color: theme.colors.tertiary,
						paddingLeft: 10
					}}>
					Schedule Premium
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default PremiumHeader;
