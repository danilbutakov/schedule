import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import { RootStackParamList } from '../../../../@types/navigation';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

const LinksHeader = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const theme = useTheme();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('MenuStack')}>
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
						paddingLeft: 10
					}}>
					Полезные ссылки
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default LinksHeader;
