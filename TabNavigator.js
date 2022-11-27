import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { images } from './assets/globalImages';
import HomeScreen from './app/screens/HomeScreen';
import MenuScreen from './app/screens/MenuScreen';
import { db } from './firebase';
import Search from './app/screens/Search';
import PairInfo from './app/screens/PairInfo';
import NotesScreen from './app/screens/NotesScreen';
import useAuth from './app/hooks/useAuth';
import LinksScreen from './app/screens/LinksScreen';
import SchedScreen from './app/screens/SchedScreen';
import UserInfo from './app/screens/UserInfo';
import PremiumScreen from './app/screens/PremiumScreen';
import FAQScreen from './app/screens/FAQScreen';
import UserData from './app/screens/UserData';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const { width } = Dimensions.get('screen');

const HomeStack = () => {
	const { user } = useAuth();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (user) {
			const starCountRef = ref(db, 'users/' + user.uid + '/userInfo');
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
						name='Home'
						component={HomeScreen}
						options={{
							header: () => (
								<View
									style={{
										backgroundColor: '#F7F7F7'
									}}>
									<Text
										style={{
											fontFamily: 'Bai-Jamjuree',
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
								<TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
				</>
			)}
		</Stack.Navigator>
	);
};

const MenuStack = () => {
	const { user } = useAuth();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (user) {
			const starCountRef = ref(db, 'users/' + user.uid + '/userInfo');
			onValue(starCountRef, snapshot => {
				const data = snapshot.val();
				setUserData(data);
			});
		}
	}, [user]);

	console.log(userData);

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
						name='Menu'
						component={MenuScreen}
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
					<Stack.Screen
						name='Sched'
						component={SchedScreen}
						options={{
							header: () => (
								<TouchableOpacity onPress={() => navigation.navigate('Menu')}>
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
						component={LinksScreen}
						options={{
							header: () => (
								<TouchableOpacity onPress={() => navigation.navigate('Menu')}>
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
						component={UserInfo}
						options={{
							header: () => (
								<TouchableOpacity onPress={() => navigation.navigate('Menu')}>
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
						component={PremiumScreen}
						options={{
							header: () => (
								<TouchableOpacity onPress={() => navigation.navigate('Menu')}>
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
						component={FAQScreen}
						options={{
							header: () => (
								<TouchableOpacity onPress={() => navigation.navigate('Menu')}>
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
				</>
			)}
		</Stack.Navigator>
	);
};

const NotesStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
			}}>
			<Stack.Screen
				name='Поиск'
				component={NotesScreen}
				options={{
					header: () => (
						<View
							style={{
								backgroundColor: '#F7F7F7'
							}}>
							<Text
								style={{
									fontFamily: 'Bai-Jamjuree',
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
								Заметки
							</Text>
						</View>
					)
				}}
			/>
		</Stack.Navigator>
	);
};

const TabNavigator = () => {
	const { user } = useAuth();

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (user) {
			const starCountRef = ref(db, 'users/' + user.uid + '/userInfo');
			onValue(starCountRef, snapshot => {
				const data = snapshot.val();
				setUserData(data);
			});
		}
	}, [user]);

	return (
		<>
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
				<Tab.Navigator
					initialRouteName='ScheduleStack'
					screenOptions={{
						tabBarStyle: { backgroundColor: '#F7F7F7' },
						tabBarShowLabel: false,
						tabBarInactiveTintColor: '#979797',
						tabBarActiveTintColor: '#81F2DE'
					}}>
					<Tab.Screen
						name='NotesStack'
						component={NotesStack}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Feather
									name='bookmark'
									size={size}
									color={color}
									width={23}
									height={23}
								/>
							),
							headerShown: false
						}}
					/>
					<Tab.Screen
						name='ScheduleStack'
						component={HomeStack}
						options={{
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<Feather
									name='calendar'
									size={size}
									color={color}
									width={23}
									height={23}
								/>
							)
						}}
					/>
					<Tab.Screen
						name='SearchStack'
						component={Search}
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
							),
							tabBarIcon: ({ color, size }) => (
								<Ionicons
									name='search'
									size={size}
									color={color}
									width={23}
									height={23}
								/>
							)
						}}
					/>
					<Tab.Screen
						name='MenuStack'
						component={MenuStack}
						options={{
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<Feather
									name='menu'
									size={size}
									color={color}
									width={23}
									height={23}
								/>
							)
						}}
					/>
				</Tab.Navigator>
			)}
		</>
	);
};

export default TabNavigator;
