import { Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFetchUserData } from '../../../hooks/useFetchUserData';

const ServicesHeader = ({ width }) => {
	const navigation = useNavigation();
	const { userData } = useFetchUserData();

	return (
		<TouchableOpacity
			style={{
				backgroundColor: '#1E1E1F',
				flexDirection: 'row',
				alignItems: 'center',
				paddingLeft: 15,
				paddingVertical: 10
			}}
			onPress={() =>
				navigation.navigate('ContactInfo', {
					user: userData
				})
			}>
			<Image
				style={{
					width: 35,
					height: 35,
					borderRadius: 35
				}}
				source={{ uri: userData?.photoURL }}
			/>
			<Text
				style={{
					fontFamily: 'Montserrat-SemiBold',
					fontSize: 20,
					alignSelf: 'center',
					color: '#F7F7F7',
					width,
					paddingLeft: 15
				}}>
				Сервисы
			</Text>
		</TouchableOpacity>
	);
};

export default ServicesHeader;
