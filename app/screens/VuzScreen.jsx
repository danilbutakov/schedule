import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	SafeAreaView
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { ref, set, onValue } from 'firebase/database';

const { height } = Dimensions.get('screen');

const VuzScreen = () => {
	const [univ, setUniv] = useState('');
	const [changeButton, setChangeButton] = useState(styles.conBtn);
	const [changeBtnText, setChangeBtnText] = useState(styles.btnText);

	const navigation = useNavigation();

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
			univ: univ
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

	useEffect(() => {
		if (univ !== '') {
			setChangeButton(styles.conBtnActive);
			setChangeBtnText(styles.btnTextActive);
		} else {
			setChangeButton(styles.conBtn);
			setChangeBtnText(styles.btnText);
		}
	}, [univ]);

	return (
		<SafeAreaView>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.containerKeyboard}>
				<View style={styles.con}>
					<View style={styles.conMain}>
						<View style={styles.content}>
							<Text style={styles.title}>Введите название ВУЗа</Text>
							<TextInput
								value={univ}
								onChangeText={univ => setUniv(univ)}
								placeholder='Например МГУ'
								style={styles.inputVuz}
							/>
						</View>
						<TouchableOpacity
							style={[
								styles.container,
								{ marginBottom: isOpenedKeyboard ? 60 : 10 }
							]}
							onPress={() => {
								if (univ !== '') {
									writeToDatabase();
									navigation.navigate('Group');
									console.log(univ);
								}
							}}>
							<View style={changeButton}>
								<Text style={changeBtnText}>Продолжить</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default VuzScreen;

const styles = StyleSheet.create({
	containerKeyboard: {
		flex: 1,
		height
	},
	con: {
		backgroundColor: 'white',
		padding: 20
	},
	conMain: {
		alignSelf: 'center'
	},
	content: {
		flex: 1
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
		color: 'rgba(60, 60, 67, 0.6)'
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
