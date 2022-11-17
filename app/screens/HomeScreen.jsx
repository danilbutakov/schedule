import { View, Text, Image, Button } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
	const { user, signOut } = useAuth();

	return (
		<View>
			<Text>Hello, {user.displayName || user.email}</Text>
			{user.photoURL ? (
				<Image
					source={{ uri: user.photoURL }}
					style={{ width: 100, height: 100 }}
				/>
			) : null}
			<Button title='Sign out' onPress={signOut} />
		</View>
	);
};

export default HomeScreen;
