import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { images } from '../../../../assets/globalImages';
import { useNavigation } from '@react-navigation/native';

const SearchGroupHeader = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Search')}>
			<View
				style={{
					backgroundColor: '#F7F7F7',
					borderBottomColor: 'rgba(60, 60, 67, 0.13)',
					borderBottomWidth: 1,
					marginTop: 10,
					paddingBottom: 10,
					paddingLeft: 20,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Image
					source={images.arrowLeft}
					style={{
						width: 10,
						height: 20
					}}
				/>
				<Text
					style={{
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 17,
						lineHeight: 25,
						color: '1E1E1F',
						paddingLeft: 10
					}}>
					Поиск
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SearchGroupHeader;
