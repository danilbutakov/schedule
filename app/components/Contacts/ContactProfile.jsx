import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const ContactProfile = () => {
	const route = useRoute();
	const contact = route.params.user;

	return (
		<View style={styles.main}>
			<View style={styles.mainInfo}>
				<Text style={styles.mainText}>{contact.role}, </Text>
				<Text style={styles.mainText}>{contact.email}</Text>
			</View>
			<View>
				<View style={styles.mainInfo}>
					<Text style={styles.mainText}>ВУЗ: </Text>
					<Text style={styles.secondText}>{contact.univ}</Text>
				</View>
				<View style={styles.mainInfo}>
					<Text style={styles.mainText}>Группа: </Text>
					<Text style={styles.secondText}>{contact.group}</Text>
				</View>
			</View>
		</View>
	);
};

export default ContactProfile;

const styles = StyleSheet.create({
	main: {
		padding: 10
	},
	mainInfo: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15
	},
	mainText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 16
	},
	secondText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15
	}
});
