import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { images } from '../../../../assets/globalImages';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../../../assets/svgUtils/Arrow.svg';

const FAQHeader = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Menu')}>
			<View
				style={{
					backgroundColor: '#1E1E1F',
					borderBottomColor: '#F7F7F7',
					borderBottomWidth: 1,
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 20,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Arrow
					style={{
						width: 25,
						height: 25,
						color: '#F7F7F7',
						transform: [{ rotateY: '180deg' }]
					}}
				/>
				<Text
					style={{
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 17,
						lineHeight: 25,
						color: '#F7F7F7',
						paddingLeft: 10
					}}>
					FAQ
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default FAQHeader;
