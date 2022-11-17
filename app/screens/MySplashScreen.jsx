import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';

const { width, height } = Dimensions.get('screen');

const MySplashScreen = ({ children }) => {
	const [loading, setLoading] = useState(false);

	setTimeout(() => {
		setLoading(true);
	}, 2000);
	return (
		<AnimatedSplash
			translucent={true}
			isLoaded={loading}
			logoImage={require('../../assets/splash.png')}
			backgroundColor={'#1E1E1F'}
			logoHeight={height}
			logoWidth={width}>
			<View style={styles.container}>{children}</View>
		</AnimatedSplash>
	);
};

export default MySplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	}
});
