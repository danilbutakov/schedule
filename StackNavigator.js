import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { View, Text, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';

import TabNavigator from './TabNavigator';
import useAuth from './app/hooks/useAuth';
import OnBoard from './app/screens/OnBoard';
import UserData from './app/screens/UserData';

import { useNavigation } from '@react-navigation/native';

import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

const Stack = createStackNavigator();

const { width } = Dimensions.get('screen');

const StackNavigator = () => {
	// const authed = auth();
	// const user = authed.currentUser;
	const { user } = useAuth();

	const [userData, setUserData] = useState();

	useEffect(() => {
		if (user) {
			const starCountRef = ref(db, 'users/' + `${user.uid}/` + 'userInfo');
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
					<Stack.Screen
						name='Info'
						component={TabNavigator}
						options={{
							header: () => (
								<TouchableOpacity onPress={() => navigation.navigate('Main')}>
									<View
										style={{
											backgroundColor: '#F7F7F7',
											borderBottomColor: 'rgba(60, 60, 67, 0.13)',
											borderBottomWidth: 1,
											marginTop: 10,
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
												fontSize: 17,
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
					<Stack.Screen
						name='Sched'
						component={TabNavigator}
						options={{
							header: () => (
								<TouchableOpacity
									onPress={() => navigation.navigate('MenuScreen')}>
									<View
										style={{
											backgroundColor: '#F7F7F7',
											borderBottomColor: 'rgba(60, 60, 67, 0.13)',
											borderBottomWidth: 1,
											marginTop: 10,
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
												fontSize: 17,
												lineHeight: 25,
												color: '1E1E1F',
												paddingLeft: 10
											}}>
											Профиль
										</Text>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<Stack.Screen
						name='Links'
						component={TabNavigator}
						options={{
							header: () => (
								<TouchableOpacity
									onPress={() => navigation.navigate('MenuScreen')}>
									<View
										style={{
											backgroundColor: '#F7F7F7',
											borderBottomColor: 'rgba(60, 60, 67, 0.13)',
											borderBottomWidth: 1,
											marginTop: 10,
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
												fontSize: 17,
												lineHeight: 25,
												color: '1E1E1F',
												paddingLeft: 10
											}}>
											Профиль
										</Text>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<Stack.Screen
						name='NotesStack'
						component={TabNavigator}
						options={{
							headerShown: false
						}}
					/>
					<Stack.Screen
						name='SearchStack'
						component={TabNavigator}
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
											lineHeight: 32,
											alignSelf: 'center',
											color: '1E1E1F',
											borderBottomColor: 'rgba(60, 60, 67, 0.13)',
											borderBottomWidth: 1,
											width,
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'center',
											textAlign: 'center',
											marginTop: 10,
											marginBottom: 5,
											paddingBottom: 10
										}}>
										Поиск
									</Text>
								</View>
							)
						}}
					/>
					<Stack.Screen
						name='MenuScreen'
						component={TabNavigator}
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
											lineHeight: 32,
											alignSelf: 'center',
											color: '1E1E1F',
											borderBottomColor: 'rgba(60, 60, 67, 0.13)',
											borderBottomWidth: 1,
											width,
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'center',
											textAlign: 'center',
											marginTop: 10,
											marginBottom: 5,
											paddingBottom: 10
										}}>
										Меню
									</Text>
								</View>
							)
						}}
					/>
				</>
			)}
			{!user && userData === null && (
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
