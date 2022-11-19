import { View, Text, Image, Button, StyleSheet } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
	const { user, signOut } = useAuth();

	return (
		<View style={styles.mainCon}>
			<Text style={styles.text}>SCHEDULE</Text>
			<View style={styles.main}></View>
			<Button style={styles.btn} title='Sign out' onPress={signOut} />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	mainCon: {
		marginTop: 6
	},
	text: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 23,
		lineHeight: 29,
		marginBottom: 6,
		alignSelf: 'center',
		color: '1E1E1F'
	},
	main: {
		display: 'flex',
		flexDirection: 'column'
	}
});
