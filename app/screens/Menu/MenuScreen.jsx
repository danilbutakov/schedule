import {
	ActivityIndicator,
	Alert,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { doc, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import Ant from 'react-native-vector-icons/AntDesign';
import { BlurView } from '@react-native-community/blur';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';

import useAuth from '../../hooks/useAuth';

const { width } = Dimensions.get('screen');

const MenuScreen = () => {
	const { signOut, user, loading } = useAuth();

	const [menuItems, setMenuItems] = useState([]);
	const navigation = useNavigation();

	const currentUser = auth().currentUser;

	const fetchUserData = () => {
		const userRef = doc(fs, 'users', user.uid);
		return onSnapshot(userRef, doc => {
			if (doc.data()) {
				const docData = doc.data();
				setMenuItems([docData]);
			} else {
				setMenuItems(null);
			}
		});
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<View style={styles.mainContainer}>
			{menuItems.map((item, key) => {
				if (item.role || item.group || item.univ) {
					return (
						<TouchableOpacity
							style={styles.infoCon}
							key={key}
							onPress={() => {
								navigation.navigate('UserInfo');
							}}>
							<View style={styles.infoMain}>
								<View style={styles.infoUser}>
									<Text style={styles.role}>
										{item.role}, {''}
										{item.profileName}
									</Text>
									<Text style={styles.group}>
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
			{loading ? (
				<>
					<BlurView
						style={styles.absolute}
						blurType='light'
						blurAmount={3}
					/>
					<ActivityIndicator
						size='large'
						color='#1E1E1F'
						style={{ backgroundColor: '#F7F7F7' }}
					/>
				</>
			) : null}
		</View>
	);
};

export default MenuScreen;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: '#F7F7F7',
		height: '100%',
		width
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	infoCon: {
		marginTop: 10,
		marginBottom: 20,
		backgroundColor: '#FFFFFF',
		width: '100%',
		padding: 20
	},
	infoMain: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	infoUser: {},
	role: {
		fontFamily: 'Montserrat-Bold',
		color: '#1E1E1F',
		fontSize: 15,
		marginBottom: 9,
		width: 200
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
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#FFFFFF'
	},
	links: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#FFFFFF'
	},
	faq: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#FFFFFF'
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
