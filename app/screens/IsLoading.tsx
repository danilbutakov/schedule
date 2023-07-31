import React from 'react';
import { ActivityIndicator, Platform, StatusBar, View } from 'react-native';

const IsLoading = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				paddingTop:
					Platform.OS === 'android' ? StatusBar.currentHeight : 0,
				backgroundColor: '#1E1E1F'
			}}>
			<ActivityIndicator
				size='large'
				color='#F7F7F7'
				style={{
					marginTop: 20
				}}
			/>
		</View>
	);
};

export default IsLoading;
