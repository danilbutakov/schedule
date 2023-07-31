import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const NotesHeader = ({ width }) => {
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
					justifyContent: 'center',
					textAlign: 'left',
					marginTop: 10,
					paddingBottom: 5,
					paddingLeft: 20
				}}>
				Заметки
			</Text>
		</View>
	);
};

export default NotesHeader;
