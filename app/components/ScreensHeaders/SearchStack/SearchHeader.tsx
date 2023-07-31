import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const SearchHeader = ({ width }) => {
	const theme = useTheme();
	return (
		<View
			style={{
				backgroundColor: theme.colors.first
			}}>
			<Text
				style={{
					fontFamily: 'Montserrat-SemiBold',
					fontSize: 20,
					lineHeight: 25,
					alignSelf: 'center',
					color: theme.colors.tertiary,
					borderBottomColor: theme.colors.secondary,
					borderBottomWidth: 1,
					width,
					alignItems: 'center',
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 20,
					backgroundColor: theme.colors.first
				}}>
				Поиск
			</Text>
		</View>
	);
};

export default SearchHeader;
