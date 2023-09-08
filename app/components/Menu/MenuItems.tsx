import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ant from 'react-native-vector-icons/AntDesign';
import { useNavigation, useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { PreferencesContext } from '../../utils/PreferencesContext';
import Alert from '../AlertDialog';
import useAuth from '../../hooks/useAuth';

const MenuItems = () => {
	const navigation = useNavigation();
	const [isOpen, setIsOpen] = useState(false);
	// @ts-ignore
	const { signOut } = useAuth();

	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	return (
		<Animatable.View animation='fadeIn' duration={1000} useNativeDriver>
			<View style={styles.mainCon}>
				<TouchableOpacity
					style={[
						styles.sched,
						{
							backgroundColor:
								isThemeDark === true
									? theme.colors.gray800
									: theme.colors.fullWhite
						}
					]}
					onPress={() => {
						// @ts-ignore
						navigation.navigate('Sched');
					}}>
					<View style={styles.schedCon}>
						<View style={styles.feather}>
							<Ant
								style={{ padding: 7 }}
								name='clockcircle'
								size={15.5}
								color='#81F2DE'
							/>
						</View>
						<Text
							style={[
								styles.text,
								{ color: theme.colors.tertiary }
							]}>
							Расписание звонков
						</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.links,
						{
							backgroundColor:
								isThemeDark === true
									? theme.colors.gray800
									: theme.colors.fullWhite
						}
					]}
					onPress={() => {
						// @ts-ignore
						navigation.navigate('Premium');
					}}>
					<View style={styles.linksCon}>
						<View style={styles.feather}>
							<Feather
								style={{ padding: 7 }}
								name='slack'
								size={15.5}
								color='#81F2DE'
							/>
						</View>
						<Text
							style={[
								styles.text,
								{ color: theme.colors.tertiary }
							]}>
							Подписка Premium
						</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.links,
						{
							backgroundColor:
								isThemeDark === true
									? theme.colors.gray800
									: theme.colors.fullWhite
						}
					]}
					onPress={() => {
						// @ts-ignore
						navigation.navigate('Links');
					}}>
					<View style={styles.linksCon}>
						<View style={styles.feather}>
							<Feather
								style={{ padding: 7 }}
								name='link'
								size={15.5}
								color='#81F2DE'
							/>
						</View>
						<Text
							style={[
								styles.text,
								{ color: theme.colors.tertiary }
							]}>
							Полезные ссылки
						</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.faq,
						{
							backgroundColor:
								isThemeDark === true
									? theme.colors.gray800
									: theme.colors.fullWhite
						}
					]}
					onPress={() => {
						// @ts-ignore
						navigation.navigate('FAQ');
					}}>
					<View style={styles.faqCon}>
						<View style={styles.feather}>
							<Ant
								style={{ padding: 7 }}
								name='questioncircle'
								size={15.5}
								color='#81F2DE'
							/>
						</View>
						<Text
							style={[
								styles.text,
								{ color: theme.colors.tertiary }
							]}>
							FAQ
						</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.settings,
						{
							backgroundColor:
								isThemeDark === true
									? theme.colors.gray800
									: theme.colors.fullWhite
						}
					]}
					onPress={() => {
						// @ts-ignore
						navigation.navigate('Settings');
					}}>
					<View style={styles.schedCon}>
						<View style={styles.feather}>
							<Ant
								style={{ padding: 7 }}
								name='setting'
								size={15.5}
								color='#81F2DE'
							/>
						</View>
						<Text
							style={[
								styles.text,
								{ color: theme.colors.tertiary }
							]}>
							Настройки
						</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={[
					styles.faq,
					{
						backgroundColor:
							isThemeDark === true
								? theme.colors.gray800
								: theme.colors.fullWhite
					}
				]}
				onPress={() => {
					setIsOpen(!isOpen);
				}}>
				<View style={styles.faqCon}>
					<View style={styles.feather}>
						<Feather
							style={{ padding: 7 }}
							name='power'
							size={15.5}
							color='#81F2DE'
						/>
					</View>
					<Text
						style={[styles.text, { color: theme.colors.tertiary }]}>
						Выйти
					</Text>
				</View>
				<Feather name='chevron-right' size={25} color='#AEAEB2' />
			</TouchableOpacity>
			{isOpen && (
				<Alert
					header={'Выход'}
					btnText={'Выйти'}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					anotherFunc={signOut}
				/>
			)}
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	mainCon: {
		marginBottom: 20
	},
	sched: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7
	},
	links: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7
	},
	faq: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7
	},
	settings: {
		marginTop: 20,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7
	},
	schedCon: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	linksCon: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	faqCon: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	feather: {
		backgroundColor: '#1E1E1F',
		borderRadius: 10,
		marginRight: 15
	},
	text: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 20
	},
	btnExit: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7
	},
	btnCon: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	btn: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	loading: {
		backgroundColor: '#ffffff10',
		height: '100%',
		paddingHorizontal: 20
	},
	blurredView: {
		backgroundColor: '#F7F7F7'
	}
});

export default MenuItems;
