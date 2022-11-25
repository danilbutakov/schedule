import {
	View,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	Button
} from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import { ScrollView } from 'react-native-gesture-handler';
import Pairs from '../components/Pairs/Pairs';

const { width } = Dimensions.get('screen');

const HomeScreen = () => {
	const { user, signOut } = useAuth();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.mainCon}>
				<ScrollView style={styles.main}>
					<Pairs />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	mainCon: {
		backgroundColor: '#F7F7F7',
		paddingBottom: 60
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
