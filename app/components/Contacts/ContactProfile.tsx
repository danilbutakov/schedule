import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
import { PreferencesContext } from '../../utils/PreferencesContext';

const ContactProfile = () => {
	const route = useRoute();
	const contact = route.params.user;

	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	return (
		<View style={[styles.main, { backgroundColor: theme.colors.first }]}>
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
			<ScrollView
				style={{
					backgroundColor: isThemeDark
						? theme.colors.gray800
						: theme.colors.fullWhite,
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
					paddingHorizontal: 5,
					paddingVertical: 5
				}}>
				<View style={styles.mainInfo}>
					<Text
						style={[
							styles.mainText,
							{ color: theme.colors.tertiary }
						]}>
						{contact.role}, {contact.email}
					</Text>
				</View>
				<View>
					<View style={styles.mainInfo}>
						<Text
							style={[
								styles.mainText,
								{ color: theme.colors.tertiary }
							]}>
							ВУЗ:{' '}
						</Text>
						<Text style={styles.secondText}>{contact.univ}</Text>
					</View>
					<View style={styles.mainInfo}>
						<Text
							style={[
								styles.mainText,
								{ color: theme.colors.tertiary }
							]}>
							Группа:{' '}
						</Text>
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
		height: '100%'
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
		fontSize: 15,
		color: '#919191'
	}
});
