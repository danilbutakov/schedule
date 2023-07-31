import React, { useCallback, useEffect, useState } from 'react';
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	NavigationContainer
} from '@react-navigation/native';
import { LogBox, SafeAreaView, StatusBar } from 'react-native';
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from './app/hooks/useAuth';
import { useFonts } from './app/hooks/useFonts';
import StackNavigator from './StackNavigator';
import { store } from './app/store/store';
import { Provider } from 'react-redux';
import { AppContextProvider } from './app/utils/Context';
import { DarkTheme, LightTheme } from './app/utils/Theme';
import { PreferencesContext } from './app/utils/PreferencesContext';
import merge from 'deepmerge';
import { NativeBaseProvider } from 'native-base';

const CombinedDarkTheme = merge(DarkTheme, NavigationDefaultTheme);
const CombinedLightTheme = merge(LightTheme, NavigationDarkTheme);

LogBox.ignoreLogs([
	'Setting a timer',
	'AsyncStorage has been extracted from react-native core and will be removed in a future release.'
]);

const App = () => {
	const [appIsReady, setAppIsReady] = useState(false);

	const [isThemeDark, setIsThemeDark] = useState(true);

	let theme = isThemeDark ? CombinedDarkTheme : CombinedLightTheme;

	const toggleTheme = React.useCallback(
		type => {
			if (type === 'dark') {
				return setIsThemeDark(true);
			} else {
				return setIsThemeDark(false);
			}
		},
		[isThemeDark]
	);

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			isThemeDark
		}),
		[toggleTheme, isThemeDark]
	);

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
		} else {
			return null;
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<PreferencesContext.Provider value={preferences}>
				<NativeBaseProvider>
					<StatusBar />
					<Provider store={store}>
						<AuthProvider>
							<AppContextProvider>
								<NavigationContainer theme={theme}>
									<StackNavigator />
								</NavigationContainer>
							</AppContextProvider>
						</AuthProvider>
					</Provider>
				</NativeBaseProvider>
			</PreferencesContext.Provider>
		</SafeAreaView>
	);
};

export default App;
