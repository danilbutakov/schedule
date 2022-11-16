import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import useAuth from './app/hooks/useAuth';
import OnBoard from './app/screens/OnBoard';
import UserData from './app/screens/UserData';

import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

	const [userData, setUserData] = useState();

	useEffect(() => {
		if (user) {
			const starCountRef = ref(
				db,
				'users/' + user.uid + '/' + user.displayName
			);
			onValue(starCountRef, snapshot => {
				const data = snapshot.val();

				setUserData(data);
			});
		}
	}, [user]);

	return (
		<Stack.Navigator>
			{user && userData !== null && (
				<>
					<Stack.Screen name='Home' component={HomeScreen} />
				</>
			)}
			{user && userData === null && (
				<Stack.Screen
					name='UserData'
					component={UserData}
					options={{ headerShown: false }}
				/>
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
