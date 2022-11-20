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

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => {
			return setRefreshing(false);
		});
	}, []);

	return (
		<SafeAreaView style={{ marginBottom: 30 }}>
			<ScrollView
				contentContainerStyle={styles.scrollView}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
				<View style={styles.mainCon}>
					<ScrollView style={styles.main}>
						{!refreshing && <Pairs />}
						<Button style={styles.btn} title='Sign out' onPress={signOut} />
					</ScrollView>
				</View>
			</ScrollView>
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
