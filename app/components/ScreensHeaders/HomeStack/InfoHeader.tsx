import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../@types/navigation';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

const InfoHeader = () => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
	const theme = useTheme();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
				<Feather name={'chevron-left'} size={25} color={'white'} />
				<Text
					style={{
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 17,
						lineHeight: 25,
						color: theme.colors.tertiary,
						marginLeft: 15
					}}>
					Расписание
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default InfoHeader;
