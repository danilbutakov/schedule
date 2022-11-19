import {
	View,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	Button
} from 'react-native';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { ScrollView } from 'react-native-gesture-handler';
import Pairs from '../components/Pairs/Pairs';

const { width, height } = Dimensions.get('screen');

const HomeScreen = () => {
	const { user, signOut } = useAuth();

	return (
		<SafeAreaView style={{ marginBottom: 30 }}>
			<View style={styles.mainCon}>
				<ScrollView style={styles.main}>
					<Pairs />
					<Button style={styles.btn} title='Sign out' onPress={signOut} />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	mainCon: {
		backgroundColor: '#F7F7F7'
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		paddingHorizontal: 10,
		marginTop: 12,
		width
	}
});
