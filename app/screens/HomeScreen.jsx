import { View, Text, Image, Button, StyleSheet } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
	const { user, signOut } = useAuth();

	return (
		<View style={styles.mainCon}>
			<Text style={styles.text}>Hello, {user.displayName || user.email}</Text>
			{user.photoURL ? (
				<Image
					source={{ uri: user.photoURL }}
					style={{ width: 100, height: 100 }}
				/>
			) : null}
			<Button style={styles.btn} title='Sign out' onPress={signOut} />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 25,
		lineHeight: 35,
		marginBottom: 20
	}
});
