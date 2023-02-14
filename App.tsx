import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, SafeAreaView, StatusBar, View } from 'react-native';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from './app/hooks/useAuth';
import { useFonts } from './app/hooks/useFonts';
import { AppContextProvider } from './app/utils/Context';
import StackNavigator from './StackNavigator';
import useFetchUserData from './app/hooks/useFetchUserData';

LogBox.ignoreLogs([
	'Setting a timer',
	'AsyncStorage has been extracted from react-native core and will be removed in a future release.'
]);

const App = () => {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				await SplashScreen.preventAutoHideAsync();
				await useFonts();
				await new Promise(resolve => setTimeout(resolve, 1000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		})();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<AuthProvider>
				<AppContextProvider>
					<NavigationContainer>
						<StackNavigator />
					</NavigationContainer>
				</AppContextProvider>
			</AuthProvider>
			<StatusBar />
		</SafeAreaView>
	);
};

export default App;
