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
import { G } from 'react-native-svg';

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
													'Изменить данные?',
													'Вы действительно хотите изменить ваши данные?',
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
													'Изменить данные?',
													'Вы действительно хотите изменить ваши данные?',
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
		marginBottom: 50
	},
	group: {
		fontFamily: 'Montserrat-Medium',
		color: '#1E1E1F',
		fontSize: 15,
		lineHeight: 18,
		marginBottom: 4
	},
	univ: {
		fontFamily: 'Montserrat-Medium',
		color: '#8E8E93',
		fontSize: 15,
		lineHeight: 18
	},
	change: {
		marginTop: 20
	},
	changeCon: {
		padding: 10,
		backgroundColor: '#1E1E1F',
		alignItems: 'center',
		borderRadius: 15,
		borderWidth: 2,
		borderColor: '#81F2DE'
	},
	changeText: {
		fontFamily: 'Montserrat-Bold',
		color: '#FFFFFF',
		fontSize: 15,
		lineHeight: 20
	}
});
