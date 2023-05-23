import React from 'react';
import { View, Platform, StatusBar, ActivityIndicator } from 'react-native';

const IsLoading = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				paddingTop:
					Platform.OS === 'android' ? StatusBar.currentHeight : 0
			}}>
			<ActivityIndicator size={'large'} />
		</View>
	);
};

export default IsLoading;
