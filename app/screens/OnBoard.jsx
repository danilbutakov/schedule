import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Slider from '../components/Slider/Slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const OnBoard = () => {
	return (
		<GestureHandlerRootView>
			<SafeAreaView>
				<Slider />
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default OnBoard;
