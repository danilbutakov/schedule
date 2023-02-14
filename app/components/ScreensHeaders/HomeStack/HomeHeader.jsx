import { Text, View } from 'react-native';
import React from 'react';

const HomeHeader = () => {
	return (
		<View
			style={{
				backgroundColor: '#F7F7F7'
			}}>
			<Text
				style={{
					fontFamily: 'Bai-Jamjuree',
					fontSize: 23,
					lineHeight: 32,
					alignSelf: 'center',
					color: '1E1E1F',
					borderBottomColor: 'rgba(60, 60, 67, 0.13)',
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
