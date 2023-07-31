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

const { height } = Dimensions.get('screen');

const SettingsScreen = () => {
	const theme = useTheme();
	const { toggleTheme, isThemeDark } = useContext(PreferencesContext);
	const scheme = useColorScheme();

	const schemes = [
		{
			text: 'Системная',
			type: scheme.toString()
		},
		{
			text: 'Темная',
			type: 'dark'
		},
		{
			text: 'Светлая',
			type: 'light'
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
						<Text
							style={[
								styles.themesText,
								{ color: theme.colors.tertiary }
							]}>
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
		marginTop: 10
	},
	themesText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 16,
		lineHeight: 25
	}
});

export default SettingsScreen;
