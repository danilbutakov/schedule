import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Separator = (type: string) => {
	return (
		<View
			style={[
				styles.default,
				{
					marginVertical: type === 'chats' ? 10 : 20,
					borderBottomWidth: type === 'chats' ? 0.5 : 1,
					borderBottomColor: type === 'chats' ? '#A5A5A5' : '#1E1E1F'
				}
			]}
		/>
	);
};

const styles = StyleSheet.create({
	default: {
		borderBottomWidth: 1,
		marginVertical: 20,
		borderBottomColor: '#1E1E1F'
	}
});
