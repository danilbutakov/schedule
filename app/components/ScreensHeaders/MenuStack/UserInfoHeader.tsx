import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

const UserInfoHeader = () => {
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
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
				<View
					style={{
						display: 'flex',
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
						Изменение профиля
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default UserInfoHeader;
