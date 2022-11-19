import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	Keyboard
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import useAuth from '../../hooks/useAuth';
import { db } from '../../../firebase';
import { ref, set } from 'firebase/database';

const { height } = Dimensions.get('screen');

const GroupInfo = ({ group, setGroup, univ, setUniv, setShowGroup }) => {
	const { user } = useAuth();

	const [changeButton, setChangeButton] = useState(styles.conBtn);
	const [changeBtnText, setChangeBtnText] = useState(styles.btnText);

	const navigation = useNavigation();

	useEffect(() => {
		if (group !== '') {
			setChangeButton(styles.conBtnActive);
			setChangeBtnText(styles.btnTextActive);
		} else {
			setChangeButton(styles.conBtn);
			setChangeBtnText(styles.btnText);
		}
	}, [group]);

	//Обработчик появления и исчезания клавиатуры
	const [isOpenedKeyboard, setIsOpenKeyboard] = useState(false);

	const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
		setIsOpenKeyboard(true);
	});
	const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
		setIsOpenKeyboard(false);
	});

	const writeToDatabase = () => {
		set(ref(db, 'users/' + user.uid + '/' + user.displayName), {
			univ: univ,
			group: group
		})
			.then(() => {
				//Data saved successfully
				console.log('data wrote');
				setUniv('');
				setGroup('');
			})
			.catch(error => {
				//The write failed
				console.log(error);
				setUniv('');
				setGroup('');
			});
	};

	useEffect(() => {
		console.log(isOpenedKeyboard);
	}, [isOpenedKeyboard]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.containerKeyboard}>
			<View style={styles.con}>
				<View style={styles.conMain}>
					<View style={styles.content}>
						<Text style={styles.title}>Введите название группы</Text>
						<TextInput
							value={group}
							onChangeText={group => setGroup(group)}
							placeholder='Например ПИ-1-21-1'
							style={styles.inputVuz}
						/>
					</View>
					<TouchableOpacity
						style={[
							styles.container,
							{ marginBottom: isOpenedKeyboard ? 80 : 20 }
						]}
						onPress={() => {
							if (group !== '') {
								writeToDatabase();
								console.log(group);
								setShowGroup(false);
								setTimeout(() => {
									navigation.navigate('SCHEDULE');
								}, 300);
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

export default GroupInfo;

const styles = StyleSheet.create({
	containerKeyboard: {
		height,
		flex: 1
	},
	con: {
		backgroundColor: 'white',
		padding: 10
	},
	conMain: {
		alignSelf: 'center'
	},
	content: {
		flex: 1
	},
	title: {
		color: '#1E1E1E',
		fontSize: 27,
		lineHeight: 34,
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
	conBtn: {
		backgroundColor: '#F2F2F7',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center'
	},
	conBtnActive: {
		backgroundColor: '#0d9488',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center'
	},
	btnText: {
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium'
	},
	btnTextActive: {
		fontSize: 17,
		lineHeight: 24,
		color: '#ffffff',
		fontFamily: 'Montserrat-Medium'
	}
});
