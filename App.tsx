import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, View, StatusBar } from 'react-native';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';

import StackNavigator from './StackNavigator';
import { AuthProvider } from './app/hooks/useAuth';
import AppContext from './app/utils/Context';
import { useFonts } from './app/hooks/useFonts';
import { ChatContextProvider } from './app/utils/ChatContext';

LogBox.ignoreLogs([
	'Setting a timer',
	'AsyncStorage has been extracted from react-native core and will be removed in a future release.'
]);

const App = () => {
	const [appIsReady, setAppIsReady] = useState(false);
	const [handleClickPair, setHandleClickPair] = useState();
	const [notes, setNotes] = useState([]);
	const [notesDataScreen, setNotesDataScreen] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [room, setRoom] = useState();
	const [unfilteredRooms, setUnfilteredRooms] = useState([]);
	const [contactUser, setContactUser] = useState([]);

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
					setNotesDataScreen,
					rooms,
					setRooms,
					contactUser,
					setContactUser,
					unfilteredRooms,
					setUnfilteredRooms,
					room,
					setRoom
				}}>
				<AuthProvider>
					<ChatContextProvider>
						<NavigationContainer>
							<StackNavigator />
						</NavigationContainer>
					</ChatContextProvider>
				</AuthProvider>
			</AppContext.Provider>
			<StatusBar />
		</View>
	);
};

export default App;
