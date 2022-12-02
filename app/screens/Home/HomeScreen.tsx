import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import Pairs from '../../components/Pairs/Pairs';

const HomeScreen = () => {
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
		flex: 1
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		paddingHorizontal: 12,
		marginTop: 12
	}
});
