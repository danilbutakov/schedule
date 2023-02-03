import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as CardStyleInterpolates from '@react-navigation/stack/src/TransitionConfigs/CardStyleInterpolators';

import TabNavigator from './TabNavigator';
import useAuth from './app/hooks/useAuth';
import OnBoard from './app/screens/OnBoard';
import UserData from './app/screens/UserData';
import { images } from './assets/globalImages';

const Stack = createStackNavigator();
const { width } = Dimensions.get('screen');

const StackNavigator = () => {
	const { user, userData } = useAuth();

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
						name='Stack'
						component={TabNavigator}
						options={{
							headerShown: false
						}}
					/>
				</>
			)}
			{!user ? (
				<Stack.Screen
					name='OnBoard'
					options={{
						headerShown: false,
						cardStyleInterpolator:
							CardStyleInterpolates.forHorizontalIOS
					}}
					component={OnBoard}
				/>
			) : null}
			{user && user.emailVerified === false && (
				<Stack.Screen
					name='OnBoard'
					options={{
						headerShown: false,
						cardStyleInterpolator:
							CardStyleInterpolates.forHorizontalIOS
					}}
					component={OnBoard}
				/>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
