import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import useAuth from './app/hooks/useAuth';
import OnBoard from './app/screens/OnBoard';
import VuzScreen from './app/screens/VuzScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

	return (
		<Stack.Navigator>
			{user && (
				<>
					<Stack.Screen
						name='Vuz'
						options={{ headerShown: false }}
						component={VuzScreen}
					/>
					<Stack.Screen name='Home' component={HomeScreen} />
				</>
			)}
			{!user && (
				<>
					<Stack.Screen
						name='OnBoard'
						options={{ headerShown: false }}
						component={OnBoard}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
