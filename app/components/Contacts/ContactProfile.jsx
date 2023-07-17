import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const ContactProfile = () => {
	const route = useRoute();
	const contact = route.params.user;

	return (
		<View style={styles.main}>
			<View
				style={{
					width: '100%',
					height: '70%',
					paddingBottom: 15,
					borderRadius: 16,
					elevation: 40
				}}>
				<Image
					source={{ uri: contact?.photoURL }}
					style={{ width: '100%', height: '100%', borderRadius: 16 }}
				/>
			</View>
			<ScrollView>
				<View style={styles.mainInfo}>
					<Text style={styles.mainText}>
						{contact.role}, {contact.email}
					</Text>
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
			</ScrollView>
		</View>
	);
};

export default ContactProfile;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		padding: 10,
		width: '100%',
		height: '100%',
		backgroundColor: '#1E1E1F'
	},
	mainInfo: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15
	},
	mainText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 16,
		color: '#F7F7F7'
	},
	secondText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		color: '#919191'
	}
});
