import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';
import { PreferencesContext } from '../../utils/PreferencesContext';

const ProfileItems = () => {
	const navigation = useNavigation();
	const { profileItems } = useFetchUserDataItems();
	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	return (
		<Animatable.View animation='fadeIn' duration={1000} useNativeDriver>
			{profileItems?.map((item, key) => {
				if (item.role || item.group || item.univ) {
					return (
						<TouchableOpacity
							key={key}
							style={[
								styles.infoCon,
								{
									backgroundColor:
										isThemeDark === true
											? theme.colors.gray800
											: theme.colors.fullWhite
								}
							]}
							onPress={() => {
								// @ts-ignore
								navigation.navigate('UserInfo');
							}}>
							<View style={styles.infoMain}>
								<View>
									<Text
										style={[
											styles.role,
											{ color: theme.colors.tertiary }
										]}>
										{item.role}, {''}
										{item.profileName}
									</Text>
									<Text
										style={[
											styles.group,
											{ color: theme.colors.tertiary }
										]}>
										{item.group}
									</Text>
									<Text style={styles.univ}>{item.univ}</Text>
								</View>
								<Image
									source={{
										uri: item?.photoURL
									}}
									style={{
										width: 80,
										height: 80,
										borderRadius: 80
									}}
								/>
							</View>
						</TouchableOpacity>
					);
				}
			})}
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	infoCon: {
		marginTop: 10,
		marginBottom: 20,
		width: '100%',
		padding: 20
	},
	infoMain: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	role: {
		fontFamily: 'Montserrat-Bold',
		fontSize: 15,
		marginBottom: 9,
		width: 200
	},
	group: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 18,
		marginBottom: 4
	},
	univ: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93',
		fontSize: 15,
		lineHeight: 18
	}
});

export default ProfileItems;
