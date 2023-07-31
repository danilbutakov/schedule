import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const HomeHeader = () => {
	const theme = useTheme();
	return (
		<View
			style={{
				backgroundColor: theme.colors.first
			}}>
			<Text
				style={{
					fontFamily: 'Bai-Jamjuree',
					fontSize: 23,
					lineHeight: 32,
					alignSelf: 'center',
					color: theme.colors.tertiary,
					borderBottomColor: theme.colors.secondary,
					borderBottomWidth: 1,
					width: '100%',
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					textAlign: 'center',
					marginTop: 10,
					marginBottom: 5,
					paddingBottom: 10
				}}>
				SCHEDULE
			</Text>
		</View>
	);
};

export default HomeHeader;
