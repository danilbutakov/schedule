import React, { useCallback, useEffect, useState } from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './app/hooks/useAuth';
import { LogBox } from 'react-native';

import 'expo-dev-client';
import MySplashScreen from './app/screens/MySplashScreen';

const App = () => {
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
