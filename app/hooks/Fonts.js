// Rest of the import statements
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const Fonts = () => {
	const [fontsLoaded] = useFonts({
		'Montserrat-Black': require('./../../assets/fonts/Montserrat-Black.ttf')
	});
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
};
