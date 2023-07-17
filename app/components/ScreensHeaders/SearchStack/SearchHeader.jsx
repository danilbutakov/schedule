import { Text, View } from 'react-native';
import React from 'react';

const SearchHeader = ({ width }) => {
	return (
		<View
			style={{
				backgroundColor: '#F7F7F7'
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
					paddingBottom: 15,
					paddingLeft: 20,
					backgroundColor: '#1E1E1F'
				}}>
				Поиск
			</Text>
		</View>
	);
};

export default SearchHeader;
