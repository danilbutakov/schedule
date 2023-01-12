import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as CardStyleInterpolates from '@react-navigation/stack/src/TransitionConfigs/CardStyleInterpolators';

import TabNavigator from './TabNavigator';
import useAuth from './app/hooks/useAuth';
import OnBoard from './app/screens/OnBoard';
import UserData from './app/screens/UserData';
import { images } from './assets/globalImages';
import { doc, onSnapshot } from 'firebase/firestore';
import { fs } from './firebase';

const Stack = createStackNavigator();
const { width } = Dimensions.get('screen');

const StackNavigator = () => {
	const { user, userData } = useAuth();
	const navigation = useNavigation();

	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS,
				headerStyle: {
					backgroundColor: '#FFFFFF',
					shadowOpacity: 0,
					elevation: 0
				}
			}}>
			{user && userData === null && user.emailVerified === true && (
				<Stack.Screen
					name='UserData'
					component={UserData}
					options={{
						headerShown: false
					}}
				/>
			)}
			{user && userData !== null && user.emailVerified === true && (
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
											Расписание
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
						name='UserInfo'
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
											Изменить профиль
										</Text>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<Stack.Screen
						name='Premium'
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
											Schedule Premium
										</Text>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<Stack.Screen
						name='FAQ'
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
											FAQ
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
						name='SearchScreen'
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
						name='SearchGroupScreen'
						component={TabNavigator}
						options={{
							header: () => (
								<TouchableOpacity
									onPress={() => navigation.navigate('SearchScreen')}>
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
											Группа
										</Text>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<Stack.Screen
						name='SearchAuditionScreen'
						component={TabNavigator}
						options={{
							header: () => (
								<TouchableOpacity
									onPress={() => navigation.navigate('SearchScreen')}>
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
											Аудитория
										</Text>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
					<Stack.Screen
						name='SearchTeachersScreen'
						component={TabNavigator}
						options={{
							header: () => (
								<TouchableOpacity
									onPress={() => navigation.navigate('SearchScreen')}>
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
											Преподователь
										</Text>
									</View>
								</TouchableOpacity>
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
			{!user ? (
				<Stack.Screen
					name='OnBoard'
					options={{
						headerShown: false,
						cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS
					}}
					component={OnBoard}
				/>
			) : null}
			{user && user.emailVerified === false && (
				<Stack.Screen
					name='OnBoard'
					options={{
						headerShown: false,
						cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS
					}}
					component={OnBoard}
				/>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
