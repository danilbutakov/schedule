import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Separator = (type: string) => {
	return (
		<View
			style={[
				styles.default,
				{
					marginVertical: type === 'chats' ? 10 : 20,
					borderBottomColor: type === 'chats' ? '#A5A5A5' : '#F7F7F7'
				}
			]}
		/>
	);
};

const styles = StyleSheet.create({
	default: {
		borderBottomWidth: 0.5,
		marginVertical: 20,
		borderBottomColor: '#F7F7F7'
	}
});
