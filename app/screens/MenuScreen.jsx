import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Feather from 'react-native-vector-icons/Feather';
import Ant from 'react-native-vector-icons/AntDesign';
import { db } from '../../firebase';

import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
	const { signOut, user } = useAuth();
	// const authed = auth();
	// const user = authed.currentUser;

	const [menuItems, setMenuItems] = useState([]);
	const navigation = useNavigation();

	//read from database
	useEffect(() => {
		if (user) {
			onValue(ref(db, 'users/' + `${user.uid}`), snapshot => {
				setMenuItems([]);
				const data = snapshot.val();
				if (data !== null) {
					Object.values(data).map(note => {
						setMenuItems(oldArray => [...oldArray, note]);
					});
				}
			});
		}
	}, []);

	return (
		<View
			style={{
				backgroundColor: '#F7F7F7',
				height: '100%',
				paddingHorizontal: 20
			}}>
			{menuItems.map((item, key) => (
				<View style={styles.infoCon} key={key}>
					<View style={styles.infoMain}>
						<View style={styles.infoUser}>
							<Text style={styles.role}>{item.role}</Text>
							<Text style={styles.group}>{item.group}</Text>
							<Text style={styles.univ}>{item.univ}</Text>
						</View>
						<Image
							source={{ uri: user.photoURL }}
							style={{ width: 55, height: 55, borderRadius: 50 }}
						/>
					</View>
				</View>
			))}
			<View style={styles.mainCon}>
				<TouchableOpacity
					style={styles.sched}
					onPress={() => {
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
						// navigation.navigate('Links');
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
				<TouchableOpacity style={styles.faq}>
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
					Alert.alert('Выйти?', 'Вы уверены, что хотите выйти из приложения', [
						{
							text: 'Отменить',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel'
						},
						{ text: 'Выйти', onPress: () => signOut() }
					]);
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
		</View>
	);
};

export default MenuScreen;

const styles = StyleSheet.create({
	infoCon: {
		marginTop: 10,
		marginBottom: 40
	},
	infoMain: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	infoUser: {},
	role: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#1E1E1F',
		fontSize: 13,
		lineHeight: 16,
		marginBottom: 9
	},
	group: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#1E1E1F',
		fontSize: 15,
		lineHeight: 18,
		marginBottom: 4
	},
	univ: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93',
		fontSize: 15,
		lineHeight: 18
	},
	mainCon: {
		marginBottom: 20
	},
	sched: {
		marginBottom: 20,
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7
	},
	links: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7
	},
	faq: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7
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
	}
});