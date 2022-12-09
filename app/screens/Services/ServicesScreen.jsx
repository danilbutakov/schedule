import { Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Chats from './Chats';
import ContactsScreen from './ContactsScreen';

const Tab = createMaterialTopTabNavigator();

const ServicesScreen = () => {
	return (
		// <Tab.Navigator
		// 	screenOptions={({ route }) => {
		// 		return {
		// 			tabBarLabel: () => {
		// 				if (route.name === 'contacts') {
		// 					return (
		// 						<Text
		// 							style={{
		// 								color: '#1E1E1F',
		// 								fontFamily: 'Montserrat-SemiBold',
		// 								fontSize: 15
		// 							}}>
		// 							Контакты
		// 						</Text>
		// 					);
		// 				}
		// 				if (route.name === 'chats') {
		// 					return (
		// 						<Text
		// 							style={{
		// 								color: '#1E1E1F',
		// 								fontFamily: 'Montserrat-SemiBold',
		// 								fontSize: 15
		// 							}}>
		// 							ЧАТЫ
		// 						</Text>
		// 					);
		// 				}
		// 			},
		// 			tabBarShowIcon: true,
		// 			tabBarLabelStyle: {
		// 				color: '#F7F7F7'
		// 			},
		// 			tabBarIndicatorStyle: {
		// 				backgroundColor: '#1E1E1F'
		// 			},
		// 			tabBarStyle: {
		// 				backgroundColor: '#F7F7F7'
		// 			}
		// 		};
		// 	}}
		// 	initialRouteName='chats'>
		// 	<Tab.Screen name='chats' component={Chats} />
		// 	<Tab.Screen name='contacts' component={ContactsScreen} />
		// </Tab.Navigator>
		<View style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 10 }}>
			<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 17 }}>
				В разработке
			</Text>
		</View>
	);
};

export default ServicesScreen;
