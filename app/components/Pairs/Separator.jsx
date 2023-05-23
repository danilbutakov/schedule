import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Separator = () => {
	return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
	separator: {
		backgroundColor: '#1E1E1F',
		height: 1,
		marginVertical: 20
	}
});
