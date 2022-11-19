import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import useAuth from './app/hooks/useAuth';
import OnBoard from './app/screens/OnBoard';
import UserData from './app/screens/UserData';
import { useNavigation } from '@react-navigation/native';

import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

import PairInfo from './app/screens/PairInfo';
import { images } from './assets/globalImages';

const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('screen');

const StackNavigator = () => {
	const { user } = useAuth();

	const [userData, setUserData] = useState();

	useEffect(() => {
		if (user) {
			const starCountRef = ref(
				db,
				'users/' + user.uid + '/' + user.displayName + '/' + ('univ' && 'group')
			);
			onValue(starCountRef, snapshot => {
				const data = snapshot.val();

				setUserData(data);
			});
		}
	}, [user]);

	const navigation = useNavigation();

	return (
		<Stack.Navigator>
			{user && userData === null && (
				<Stack.Screen
					name='UserData'
					component={UserData}
					options={{ headerShown: false }}
				/>
			)}
			{user && userData !== null && (
				<>
					<Stack.Screen
						name='Schedule'
						component={HomeScreen}
						options={{
							header: () => (
								<View
									style={{
										backgroundColor: '#F7F7F7'
									}}>
									<Text
										style={{
											fontFamily: 'Montserrat-SemiBold',
											fontSize: 23,
											lineHeight: 29,
											alignSelf: 'center',
											color: '1E1E1F',
											borderBottomColor: 'rgba(60, 60, 67, 0.13)',
											borderBottomWidth: 1,
											width,
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'center',
											textAlign: 'center',
											marginTop: 5,
											marginBottom: 5,
											paddingBottom: 6
										}}>
										SCHEDULE
									</Text>
								</View>
							)
						}}
					/>
					<Stack.Screen
						name='Info'
						component={PairInfo}
						options={{
							header: () => (
								<TouchableOpacity onPress={() => navigation.goBack()}>
									<View
										style={{
											backgroundColor: '#F7F7F7',
											borderBottomColor: 'rgba(60, 60, 67, 0.13)',
											borderBottomWidth: 1,
											marginTop: 5,
											marginBottom: 15,
											paddingBottom: 10,
											paddingLeft: 20,
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center'
										}}>
										<Image
											source={images.arrowLeft}
											style={{
												width: 10,
												height: 20
											}}
										/>
										<Text
											style={{
												fontFamily: 'Montserrat-SemiBold',
												fontSize: 19,
												lineHeight: 25,
												color: '1E1E1F',
												paddingLeft: 10
											}}>
											Просмотр занятия
										</Text>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
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
