import React, { useState, useEffect } from 'react';
import { Easing } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import useAuth from './app/hooks/useAuth';
import OnBoard from './app/screens/OnBoard';
import UserData from './app/screens/UserData';
import { useNavigation } from '@react-navigation/native';

import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

const Stack = createStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

	const [userData, setUserData] = useState();

	useEffect(() => {
		if (user) {
			const starCountRef = ref(
				db,
				'users/' + user.uid + '/' + ('univ' && 'group')
			);
			onValue(starCountRef, snapshot => {
				const data = snapshot.val();

				setUserData(data);
			});
		}
	}, [user]);

	const navigation = useNavigation();

	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
			}}>
			{user && userData === null && (
				<Stack.Screen
					name='UserData'
					component={UserData}
					options={{
						headerShown: false
					}}
				/>
			)}
			{user && userData !== null && (
				<>
					<Stack.Screen
						name='Main'
						component={TabNavigator}
						options={{
							headerShown: false
						}}
					/>
				</>
			)}
			{!user && (
				<>
					<Stack.Screen
						name='OnBoard'
						options={{
							headerShown: false,
							cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
						}}
						component={OnBoard}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
