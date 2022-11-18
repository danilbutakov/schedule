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
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { db } from '../../firebase';
import { ref, set } from 'firebase/database';

const { height, width } = Dimensions.get('screen');

const GroupScreen = () => {
	const [changeButton, setChangeButton] = useState(styles.conBtn);
	const [changeBtnText, setChangeBtnText] = useState(styles.btnText);
	const [group, setGroup] = useState('');

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
		set(ref(db, 'users/'), {
			group: group
		})
			.then(() => {
				//Data saved successfully
				console.log('data wrote');
				setUniv('');
			})
			.catch(error => {
				//The write failed
				console.log(error);
				setUniv('');
			});
	};

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
							{ marginBottom: isOpenedKeyboard ? 60 : 0 }
						]}
						onPress={() => {
							if (group !== '') {
								writeToDatabase();
								console.log(group);
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

export default GroupScreen;

const styles = StyleSheet.create({
	containerKeyboard: {
		flex: 1,
		height
	},
	con: {
		backgroundColor: 'white'
	},
	conMain: {
		alignSelf: 'center'
	},
	content: {
		flex: 1,
		width,
		padding: 20
	},
	title: {
		color: '#1E1E1F',
		fontWeight: '600',
		fontSize: 27,
		lineHeight: 32
	},
	inputVuz: {
		borderWidth: 1,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		borderRadius: 8,
		backgroundColor: '#ffffff',
		padding: 10,
		marginTop: 50,
		fontWeight: '400',
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		width: '100%'
	},
	container: {
		alignItems: 'center',
		width,
		padding: 20
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
		backgroundColor: '#1E1E1F',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center'
	},
	btnText: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)'
	},
	btnTextActive: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 24,
		color: '#ffffff'
	}
});
