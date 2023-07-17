import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ant from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import useAuth from '../../hooks/useAuth';

const MenuItems = () => {
	const navigation = useNavigation();
	// @ts-ignore
	const { signOut } = useAuth();
	return (
		<Animatable.View animation='fadeIn' duration={1000} useNativeDriver>
			<View style={styles.mainCon}>
				<TouchableOpacity
					style={styles.sched}
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
						<Text style={styles.schedText}>Расписание звонков</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.links}
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
						<Text style={styles.linksText}>Подписка Premium</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.links}
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
						<Text style={styles.linksText}>Полезные ссылки</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.faq}
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
						<Text style={styles.faqText}>FAQ</Text>
					</View>
					<Feather name='chevron-right' size={25} color='#AEAEB2' />
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={styles.faq}
				onPress={() => {
					Alert.alert(
						'Выход',
						'Вы уверены, что хотите выйти из аккаунта?',
						[
							{
								text: 'Отменить',
								onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
							{
								text: 'Выйти',
								onPress: () => {
									signOut();
								}
							}
						]
					);
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
					<Text style={styles.faqText}>Выйти</Text>
				</View>
				<Feather name='chevron-right' size={25} color='#AEAEB2' />
			</TouchableOpacity>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	mainCon: {
		marginBottom: 20
	},
	sched: {
		marginBottom: 20,
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#4B4B4B'
	},
	links: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#4B4B4B'
	},
	faq: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#4B4B4B'
	},
	schedCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	linksCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	faqCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	feather: {
		backgroundColor: '#1E1E1F',
		borderRadius: 10,
		marginRight: 15
	},
	schedText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 20
	},
	linksText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 20
	},
	faqText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 20
	},
	btnExit: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7
	},
	btnCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	btn: {
		display: 'flex',
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
