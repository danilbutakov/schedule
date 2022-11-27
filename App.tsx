import React, { useState, useEffect, useCallback } from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './app/hooks/useAuth';
import { LogBox, View, StatusBar } from 'react-native';

import AppContext from './app/utils/Context';
import useAuth from './app/hooks/useAuth.js';

import 'expo-dev-client';
import { useFonts } from './app/hooks/useFonts';
import * as SplashScreen from 'expo-splash-screen';

const App = () => {
	const [appIsReady, setAppIsReady] = useState(false);
	const [handleClickPair, setHandleClickPair] = useState();
	const [notes, setNotes] = useState([]);
	const [notesDataScreen, setNotesDataScreen] = useState([]);

	useEffect(() => {
		async function prepare() {
			try {
				// Keep the splash screen visible while we fetch resources
				await SplashScreen.preventAutoHideAsync();
				// Pre-load fonts, make any API calls you need to do here
				await useFonts();
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				await new Promise(resolve => setTimeout(resolve, 1500));
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<AppContext.Provider
				value={{
					handleClickPair,
					setHandleClickPair,
					notes,
					setNotes,
					notesDataScreen,
					setNotesDataScreen
				}}>
				<AuthProvider>
					<NavigationContainer>
						<StackNavigator />
					</NavigationContainer>
				</AuthProvider>
			</AppContext.Provider>
			<StatusBar />
		</View>
	);
};

export default App;

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
