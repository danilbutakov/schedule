import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Alert,
	TextInput
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ref, onValue, update } from 'firebase/database';

import useAuth from '../../hooks/useAuth';
import { db } from '../../../firebase';

const { height } = Dimensions.get('screen');

const UserInfo = () => {
	const { user } = useAuth();
	const [group, setGroup] = useState('');
	const [univ, setUniv] = useState('');

	const [menuItems, setMenuItems] = useState([]);

	//read from database
	useEffect(() => {
		if (user) {
			onValue(ref(db, 'users/' + user.uid), snapshot => {
				setMenuItems([]);
				const data = snapshot.val();
				if (data !== null) {
					Object.values(data).map(note => {
						setMenuItems(oldArray => [...oldArray, note]);
					});
				}
			});
		}
	}, [user]);

	const handleUpdateGroup = () => {
		update(ref(db, 'users/' + `${user.uid}/` + 'userInfo'), {
			group: group
		});
	};
	const handleUpdateUniv = () => {
		update(ref(db, 'users/' + `${user.uid}/` + 'userInfo'), {
			univ: univ
		});
	};

	return (
		<View
			style={{
				paddingHorizontal: 20,
				paddingTop: 12,
				height,
				backgroundColor: '#F7F7F7'
			}}>
			<Text
				style={{
					fontFamily: 'Montserrat-SemiBold',
					fontSize: 24,
					lineHeight: 28
				}}>
				Изменить профиль
			</Text>
			{menuItems.map((item, key) => {
				if (item.group || item.univ) {
					return (
						<View style={styles.infoCon} key={key}>
							<View style={styles.infoMain}>
								<View style={styles.infoUser}>
									<TextInput
										style={styles.group}
										placeholder={item.group}
										value={group}
										onChangeText={text => setGroup(text)}
									/>
									<View style={styles.btnCon}>
										<TouchableOpacity
											style={styles.change}
											onPress={() => {
												Alert.alert(
													'Изменение группы',
													'Вы действительно хотите изменить вашу группу?',
													[
														{
															text: 'Отменить',
															onPress: () => console.log('Cancel Pressed'),
															style: 'cancel'
														},
														{
															text: 'Изменить',
															onPress: () => {
																if (group !== '') {
																	handleUpdateGroup(group);
																	if (handleUpdateGroup) {
																		Alert.alert('Вы успешно обновили группу');
																		setGroup('');
																	} else {
																		Alert.alert('Не удалось обновить группу');
																	}
																} else {
																	Alert.alert(
																		'Поле группы пустое.',
																		'Пожалуйста введите значение чтобы изменить данные'
																	);
																}
															}
														}
													]
												);
											}}>
											<View style={styles.changeCon}>
												<Text style={styles.changeText}>Изменить группу</Text>
											</View>
										</TouchableOpacity>
									</View>
									<TextInput
										style={styles.univ}
										placeholder={item.univ}
										value={univ}
										onChangeText={text => setUniv(text)}
									/>
									<View style={styles.btnCon}>
										<TouchableOpacity
											style={styles.change}
											onPress={() => {
												Alert.alert(
													'Изменение ВУЗа?',
													'Вы действительно хотите изменить ваш ВУЗ?',
													[
														{
															text: 'Отменить',
															onPress: () => console.log('Cancel Pressed'),
															style: 'cancel'
														},
														{
															text: 'Изменить',
															onPress: () => {
																if (univ !== '') {
																	handleUpdateUniv(univ);
																	if (handleUpdateGroup) {
																		Alert.alert('Вы успешно обновили ВУЗ');
																		setUniv('');
																	} else {
																		Alert.alert('Не удалось обновить ВУЗ');
																	}
																} else {
																	Alert.alert(
																		'Поле ВУЗа пустое.',
																		'Пожалуйста введите значение чтобы изменить данные'
																	);
																}
															}
														}
													]
												);
											}}>
											<View style={styles.changeCon}>
												<Text style={styles.changeText}>Изменить ВУЗ</Text>
											</View>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
					);
				}
			})}
		</View>
	);
};

export default UserInfo;

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
	infoUser: {
		width: '100%'
	},
	btnCon: {
		marginBottom: 20
	},
	group: {
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		backgroundColor: '#FFFFFF',
		padding: 10,
		marginTop: 20,
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium'
	},
	univ: {
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		backgroundColor: '#FFFFFF',
		padding: 10,
		marginTop: 20,
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium'
	},
	change: {
		marginTop: 20
	},
	changeCon: {
		padding: 15,
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: '#1E1E1F',
		width: '100%'
	},
	changeText: {
		fontSize: 17,
		lineHeight: 20,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-SemiBold'
	}
});
