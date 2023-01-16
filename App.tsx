import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { LogBox, StatusBar, View } from 'react-native';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from './app/hooks/useAuth';
import { useFonts } from './app/hooks/useFonts';
import { ChatContextProvider } from './app/utils/ChatContext';
import { AppContextProvider } from './app/utils/Context';
import TabNavigator from './TabNavigator';
import StackNavigator from './StackNavigator';

LogBox.ignoreLogs([
	'Setting a timer',
	'AsyncStorage has been extracted from react-native core and will be removed in a future release.'
]);

const App = () => {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await useFonts();
				await new Promise(resolve => setTimeout(resolve, 1000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
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
		<View onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<AuthProvider>
				<AppContextProvider>
					<ChatContextProvider>
						<NavigationContainer>
							<StackNavigator />
						</NavigationContainer>
					</ChatContextProvider>
				</AppContextProvider>
			</AuthProvider>
			<StatusBar />
		</View>
	);
};

export default App;
