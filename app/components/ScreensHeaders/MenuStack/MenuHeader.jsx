import { Text, View } from 'react-native';
import React from 'react';

const MenuHeader = ({ width }) => {
	return (
		<View
			style={{
				backgroundColor: '#1E1E1F'
			}}>
			<Text
				style={{
					fontFamily: 'Montserrat-SemiBold',
					fontSize: 20,
					lineHeight: 25,
					alignSelf: 'center',
					color: '#F7F7F7',
					borderBottomColor: '#F7F7F7',
					borderBottomWidth: 1,
					width,
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					textAlign: 'left',
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 20
				}}>
				Профиль
			</Text>
		</View>
	);
};

export default MenuHeader;
