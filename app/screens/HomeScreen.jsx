import {
	View,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	Button,
	RefreshControl
} from 'react-native';
import React, { useState, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import { ScrollView } from 'react-native-gesture-handler';
import Pairs from '../components/Pairs/Pairs';

const { width, height } = Dimensions.get('screen');

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
	const { user, signOut } = useAuth();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.mainCon}>
				<ScrollView style={styles.main}>
					<Pairs />
				</ScrollView>
			</View>
			<Button style={styles.btn} title='Sign out' onPress={signOut} />
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	mainCon: {
		backgroundColor: '#F7F7F7',
		paddingBottom: 10
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		paddingHorizontal: 10,
		marginTop: 12,
		width
	},
	btn: {
		flex: 1
	}
});
