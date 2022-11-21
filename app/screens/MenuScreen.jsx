import { View, Text, Button } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

const MenuScreen = () => {
	const { signOut } = useAuth();
	return (
		<View style={{ backgroundColor: '#F7F7F7', height: '100%' }}>
			<Text>MenuScreen</Text>
			<Button title='Sign out' onPress={signOut} />
		</View>
	);
};

export default MenuScreen;
