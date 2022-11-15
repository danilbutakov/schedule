import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
	Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const SheetAuth = () => {
	const { onGoogleButtonPress, loading, user } = useAuth();

	return (
		<View>
			<View style={styles.conMain}>
				<Text style={styles.title}>
					{loading ? 'Загрузка...' : 'Войти с помощью'}
				</Text>

				<TouchableOpacity
					style={styles.container}
					onPress={onGoogleButtonPress}>
					<View style={styles.conBtnActive}>
						<Text style={styles.btnTextActive}>Google</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SheetAuth;

const styles = StyleSheet.create({
	conMain: {
		flex: 1
	},
	title: {
		color: '#1E1E1E',
		fontWeight: '600',
		fontSize: 27,
		lineHeight: 32
	},
	container: {
		flex: 0.45,
		alignItems: 'center',
		marginTop: 30
	},
	conBtnActive: {
		backgroundColor: '#0d9488',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center'
	},
	btnTextActive: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 24,
		color: '#ffffff'
	}
});
