import * as React from 'react';
import { View } from 'react-native';
import Slider from '../components/Slider/Slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const OnBoard = () => {
	return (
		<GestureHandlerRootView>
			<View>
				<Slider />
			</View>
		</GestureHandlerRootView>
	);
};

export default OnBoard;
