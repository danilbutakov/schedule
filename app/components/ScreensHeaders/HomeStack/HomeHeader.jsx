import { Text, View } from 'react-native';
import React from 'react';

const HomeHeader = () => {
	return (
		<View
			style={{
				backgroundColor: '#1E1E1F'
			}}>
			<Text
				style={{
					fontFamily: 'Bai-Jamjuree',
					fontSize: 23,
					lineHeight: 32,
					alignSelf: 'center',
					color: '#F7F7F7',
					borderBottomColor: '#1E1E1F',
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
