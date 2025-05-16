// Rest of the import statements
import * as Font from 'expo-font';

export const loadFonts = async () => {
	await Font.loadAsync({
		'Bai-Jamjuree': require('./../../assets/fonts/BaiJamjuree-SemiBold.ttf'),
		'Montserrat-Black': require('./../../assets/fonts/Poppins-Black.ttf'), //900
		'Montserrat-ExtraBold': require('./../../assets/fonts/Poppins-ExtraBold.ttf'), //800
		'Montserrat-Bold': require('./../../assets/fonts/Poppins-Bold.ttf'), //700
		'Montserrat-SemiBold': require('./../../assets/fonts/Poppins-SemiBold.ttf'), //600
		'Montserrat-Medium': require('./../../assets/fonts/Poppins-Medium.ttf'), //500
		'Montserrat-Regular': require('./../../assets/fonts/Poppins-Regular.ttf'), //400
		'Montserrat-Light': require('./../../assets/fonts/Poppins-Light.ttf'), //300
		'Montserrat-ExtraLight': require('./../../assets/fonts/Poppins-ExtraLight.ttf'), //200
		'Montserrat-Thin': require('./../../assets/fonts/Poppins-Thin.ttf') //100
	});
};
