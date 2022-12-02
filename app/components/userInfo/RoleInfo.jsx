import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	KeyboardAvoidingView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import useAuth from '../../hooks/useAuth';
import { db } from '../../../firebase';
import { ref, set } from 'firebase/database';

const { height } = Dimensions.get('screen');

const RoleInfo = ({ univ, group, role, setRole, setUniv, setGroup }) => {
	const { user } = useAuth();

	const [changeButton, setChangeButton] = useState(styles.conBtn);
	const [changeBtnText, setChangeBtnText] = useState(styles.btnText);

	useEffect(() => {
		if (role !== '') {
			setChangeButton(styles.conBtnActiveGo);
			setChangeBtnText(styles.btnTextActiveGo);
		} else {
			setChangeButton(styles.conBtnActiveStop);
			setChangeBtnText(styles.btnTextActiveStop);
		}
	}, [role]);

	const writeToDatabase = () => {
		set(ref(db, 'users/' + user.uid + '/' + 'userInfo'), {
			univ: univ,
			group: group,
			role: role
		})
			.then(() => {
				//Data saved successfully
				console.log('data wrote');
				setUniv('');
				setGroup('');
				setRole('');
			})
			.catch(error => {
				//The write failed
				console.log(error);
				setUniv('');
				setGroup('');
				setRole('');
			});
	};

	return (
		<KeyboardAvoidingView style={styles.containerKeyboard}>
			<View style={styles.con}>
				<View style={styles.content}>
					<Text style={styles.title}>Вы студент или преподователь?</Text>
					<View style={styles.btnsCon}>
						<TouchableOpacity
							style={styles.container}
							onPress={() => {
								setRole('Студент');
								console.log(role);
							}}>
							<LinearGradient
								colors={['#0d9490', 'black']}
								start={{ x: 0, y: 0.5 }}
								end={{ x: 1, y: 0.5 }}
								style={styles.conBtnActive}>
								<Text style={styles.btnTextActive}>Студент</Text>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.container}
							onPress={() => {
								setRole('Преподователь');
								console.log(role);
							}}>
							<LinearGradient
								colors={['tomato', 'black']}
								start={{ x: 1, y: 0.5 }}
								end={{ x: 0, y: 0.5 }}
								style={styles.conBtnActive}>
								<Text style={styles.btnText}>Преподователь</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.container}
						onPress={() => {
							if (role !== '') {
								writeToDatabase();
							}
						}}>
						<View style={changeButton}>
							<Text style={changeBtnText}>Продолжить</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default RoleInfo;

const styles = StyleSheet.create({
	containerKeyboard: {
		height,
		flex: 1
	},
	con: {
		backgroundColor: 'white',
		paddingVertical: 20,
		paddingHorizontal: 20,
		flex: 1
	},
	content: {
		flex: 1
	},
	title: {
		color: '#1E1E1F',
		fontSize: 24,
		lineHeight: 32,
		fontFamily: 'Montserrat-SemiBold'
	},
	inputVuz: {
		borderWidth: 1,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		borderRadius: 8,
		backgroundColor: '#ffffff',
		padding: 10,
		marginTop: 50,
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Regular'
	},
	container: {
		alignItems: 'center'
	},
	btnsCon: {
		display: 'flex',
		flexDirection: 'row'
	},
	conBtn: {
		backgroundColor: '#1E1E1F',
		borderRadius: 16,
		padding: 15,
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 50
	},
	conBtnActive: {
		borderRadius: 16,
		padding: 15,
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 50,
		marginRight: 40
	},
	btnText: {
		fontSize: 17,
		lineHeight: 24,
		color: '#ffffff',
		fontFamily: 'Montserrat-Medium'
	},
	btnTextActive: {
		fontSize: 17,
		lineHeight: 24,
		color: '#ffffff',
		fontFamily: 'Montserrat-Medium'
	},
	conBtnActiveStop: {
		backgroundColor: '#F2F2F7',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 50
	},
	conBtnActiveGo: {
		backgroundColor: '#1E1E1F',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 50
	},
	btnTextActiveStop: {
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium'
	},
	btnTextActiveGo: {
		fontSize: 17,
		lineHeight: 24,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-Medium'
	}
});
