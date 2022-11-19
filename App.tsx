import React, { useState } from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './app/hooks/useAuth';
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';

import 'expo-dev-client';
import { useFonts } from './app/hooks/useFonts';

const App = () => {
	const [IsReady, SetIsReady] = useState(false);

	const LoadFonts = async () => {
		await useFonts();
	};

	if (!IsReady) {
		return (
			<AppLoading
				startAsync={LoadFonts}
				onFinish={() => SetIsReady(true)}
				onError={() => {}}
			/>
		);
	}
	return (
		<AuthProvider>
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		</AuthProvider>
	);
};

export default App;

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
