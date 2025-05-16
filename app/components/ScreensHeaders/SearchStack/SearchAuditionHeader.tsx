import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import { RootStackParamList } from '../../../../@types/navigation';
// @ts-ignore
import Arrow from '../../../../assets/svgUtils/Arrow.svg';

const SearchAuditionHeader = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const theme = useTheme();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('SearchStack')}>
			<View
				style={{
					backgroundColor: theme.colors.first,
					borderBottomColor: theme.colors.secondary,
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
						transform: [{ rotateY: '180deg' }]
					}}
				/>
				<Text
					style={{
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 17,
						lineHeight: 25,
						color: theme.colors.tertiary,
						marginLeft: 15
					}}>
					Поиск
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SearchAuditionHeader;
