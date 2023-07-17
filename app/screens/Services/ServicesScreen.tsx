import { Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ChatsScreen from './ChatsScreen';
import ContactsScreen from './ContactsScreen';

const Tab = createMaterialTopTabNavigator();

const ServicesScreen = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => {
				return {
					tabBarLabel: () => {
						if (route.name === 'contacts') {
							return (
								<Text
									style={{
										color: '#F7F7F7',
										fontFamily: 'Montserrat-SemiBold',
										fontSize: 15
									}}>
									Контакты
								</Text>
							);
						} else {
							return (
								<Text
									style={{
										color: '#F7F7F7',
										fontFamily: 'Montserrat-SemiBold',
										fontSize: 15
									}}>
									Чаты
								</Text>
							);
						}
					},
					tabBarShowIcon: true,
					tabBarLabelStyle: {
						color: '#1E1E1F'
					},
					tabBarIndicatorStyle: {
						backgroundColor: '#F7F7F7'
					},
					tabBarStyle: {
						backgroundColor: '#1E1E1F'
					}
				};
			}}
			initialRouteName='chats'>
			<Tab.Screen name='chats' component={ChatsScreen} />
			<Tab.Screen name='contacts' component={ContactsScreen} />
		</Tab.Navigator>
	);
};

export default ServicesScreen;
