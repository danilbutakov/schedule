import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, SafeAreaView, StatusBar } from 'react-native';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from './app/hooks/useAuth';
import { useFonts } from './app/hooks/useFonts';
import StackNavigator from './StackNavigator';
import { store } from './app/store/store';
import { Provider } from 'react-redux';

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
			<StatusBar />
			<Provider store={store}>
				<AuthProvider>
					<NavigationContainer>
						<StackNavigator />
					</NavigationContainer>
				</AuthProvider>
			</Provider>
		</SafeAreaView>
	);
};

export default App;
