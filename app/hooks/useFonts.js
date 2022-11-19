// Rest of the import statements
import * as Font from 'expo-font';

export const useFonts = async () => {
	await Font.loadAsync({
		'Montserrat-Black': require('./../../assets/fonts/Montserrat-Black.ttf'), //900
		'Montserrat-ExtraBold': require('./../../assets/fonts/Montserrat-ExtraBold.ttf'), //800
		'Montserrat-Bold': require('./../../assets/fonts/Montserrat-Bold.ttf'), //700
		'Montserrat-SemiBold': require('./../../assets/fonts/Montserrat-SemiBold.ttf'), //600
		'Montserrat-Medium': require('./../../assets/fonts/Montserrat-Medium.ttf'), //500
		'Montserrat-Regular': require('./../../assets/fonts/Montserrat-Regular.ttf'), //400
		'Montserrat-Light': require('./../../assets/fonts/Montserrat-Light.ttf'), //300
		'Montserrat-ExtraLight': require('./../../assets/fonts/Montserrat-ExtraLight.ttf'), //200
		'Montserrat-Thin': require('./../../assets/fonts/Montserrat-Thin.ttf') //100
	});
};
