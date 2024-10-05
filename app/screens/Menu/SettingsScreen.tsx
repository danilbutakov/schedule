import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View
} from 'react-native';
import React, { useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { PreferencesContext } from '../../utils/PreferencesContext';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height } = Dimensions.get('screen');

const SettingsScreen = () => {
	const theme = useTheme();
	const { toggleTheme } = useContext(PreferencesContext);
	const scheme = useColorScheme();

	const schemes = [
		{
			text: 'Системная',
			type: scheme.toString(),
			icon: (
				<Feather
					style={{ padding: 7 }}
					name='smartphone'
					size={20}
					color='#81F2DE'
				/>
			)
		},
		{
			text: 'Темная',
			type: 'dark',
			icon: (
				<MaterialCommunityIcons
					style={{ padding: 7 }}
					name='theme-light-dark'
					size={20}
					color='#81F2DE'
				/>
			)
		},
		{
			text: 'Светлая',
			type: 'light',
			icon: (
				<MaterialCommunityIcons
					style={{ padding: 7 }}
					name='theme-light-dark'
					size={20}
					color='#81F2DE'
				/>
			)
		}
	];

	return (
		<View
			style={[
				{
					height,
					paddingHorizontal: 20,
					paddingTop: 20,
					alignItems: 'flex-start'
				},
				{ backgroundColor: theme.colors.first }
			]}>
			<View
				style={{
					flexDirection: 'column'
				}}>
				<Text
					style={[
						{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 17
						},
						{ color: theme.colors.gray500 }
					]}>
					Темы
				</Text>

				{schemes.map((schema, key) => (
					<TouchableOpacity
						key={key}
						style={styles.themesContainer}
						onPress={() => {
							toggleTheme(schema.type);
						}}>
						{schema.icon}
						<Text style={[styles.themesText, { color: theme.colors.tertiary }]}>
							{schema.text}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	themesContainer: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	themesText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 16,
		lineHeight: 25
	}
});

export default SettingsScreen;
