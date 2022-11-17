import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
	Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

import { images } from '../../../assets/globalImages';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('screen');

const SheetAuth = () => {
	const { onGoogleButtonPress } = useAuth();
	const [register, setRegister] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const [isError, setIsError] = useState(false);
	const [isErrorPassword, setIsErrorPassword] = useState(false);

	const signUp = async () => {
		if (
			email !== '' &&
			password !== '' &&
			passwordConfirm !== '' &&
			password === passwordConfirm
		) {
			setIsError(false);
			const regEmail = await auth().createUserWithEmailAndPassword(
				email,
				password,
				passwordConfirm
			);
			regEmail
				.then(() => {
					console.log('Register successfully');
					Alert.alert('Вы успешно зарегистрировались');
				})
				.catch(error => {
					console.log(error);
					Alert.alert('Аккаунт с такой почтой уже зарегестрирован');
				});
		} else {
			setIsError(true);
		}
	};

	const signIn = () => {
		try {
			if (email !== '' && password !== '') {
				auth()
					.signInWithEmailAndPassword(email, password)
					.then(() => {
						console.log('Login successfully');
						Alert.alert('Вы успешно вошли в аккаунт');
					});
				setIsError(false);
			} else {
				setIsError(true);
			}
		} catch (error) {
			console.log(error);
			console.log('Не удалось войти в аккаунт');
		}
	};

	useEffect(() => {
		if (password !== passwordConfirm) {
			setTimeout(() => {
				setIsErrorPassword(true);
			}, 1000);
		}
		if (password === passwordConfirm) {
			setIsErrorPassword(false);
		}
		if (email === '') {
			setIsError(false);
		}
	}, [password, passwordConfirm, email]);

	return (
		<View>
			<View style={styles.conMain}>
				<Text style={styles.title}>
					{register ? 'Регистрация' : 'Войти с помощью'}
				</Text>
				<TouchableOpacity style={styles.container}>
					<TouchableOpacity onPress={onGoogleButtonPress}>
						<View style={styles.conBtnActive}>
							<Image source={images.google} />
							<Text style={styles.btnTextActive}>Sign in with Google</Text>
						</View>
					</TouchableOpacity>
					<Text style={styles.another}>или</Text>
					{register ? (
						<View style={styles.conSign}>
							<Text style={styles.text}>Почта</Text>
							<TextInput
								value={email}
								onChangeText={email => setEmail(email)}
								placeholder='Введите email'
								style={styles.inputVuz}
							/>
							<Text style={styles.text}>Пароль</Text>
							<TextInput
								value={password}
								onChangeText={password => setPassword(password)}
								placeholder='Введите пароль'
								secureTextEntry={true}
								style={styles.inputVuz}
							/>
							<Text style={styles.text}>Подтвердите пароль</Text>
							<TextInput
								value={passwordConfirm}
								onChangeText={passwordConfirm =>
									setPasswordConfirm(passwordConfirm)
								}
								placeholder='Подтвердите пароль'
								secureTextEntry={true}
								style={styles.inputVuz}
							/>
							<TouchableOpacity style={styles.signButton} onPress={signUp}>
								<Text style={styles.signButtonText}>Зарегистрироваться</Text>
							</TouchableOpacity>
							{isErrorPassword && (
								<Text style={styles.error}>Пароли не совпадают</Text>
							)}
						</View>
					) : (
						<View style={styles.conSign}>
							<Text style={styles.text}>Почта</Text>
							<TextInput
								value={email}
								onChangeText={email => setEmail(email)}
								placeholder='Введите email'
								style={styles.inputVuz}
							/>
							<Text style={styles.text}>Пароль</Text>
							<TextInput
								value={password}
								onChangeText={password => setPassword(password)}
								placeholder='Введите пароль'
								secureTextEntry={true}
								style={styles.inputVuz}
							/>
							<TouchableOpacity style={styles.signButton} onPress={signIn}>
								<Text style={styles.signButtonText}>Войти</Text>
							</TouchableOpacity>
						</View>
					)}
					{isError ? (
						<View style={styles.conSign}>
							<Text style={styles.error}>Заполнены не все поля</Text>
						</View>
					) : null}
					<View styles={styles.bottom}>
						<Text style={styles.reg} onPress={() => setRegister(!register)}>
							{register
								? 'Уже есть аккаунт? Войти'
								: 'Нет аккаунта? Зарегистрироваться'}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SheetAuth;

const styles = StyleSheet.create({
	conMain: {
		flex: 1,
		width
	},
	title: {
		color: '#1E1E1F',
		fontWeight: '600',
		fontSize: 27,
		lineHeight: 32,
		alignSelf: 'center'
	},
	container: {
		marginTop: 20,
		width
	},
	conBtnActive: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		borderColor: 'black',
		borderWidth: 1,
		borderColor: 'black',
		padding: 15,
		alignSelf: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row'
	},
	btnTextActive: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 24,
		color: 'black'
	},
	another: {
		color: '#8A8A8E',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 31,
		marginTop: 10,
		alignSelf: 'center'
	},
	conSign: {
		marginTop: 10,
		marginHorizontal: 20
	},
	text: {
		color: '#1E1E1F',
		fontWeight: '400',
		fontSize: 17,
		lineHeight: 20
	},
	inputVuz: {
		borderWidth: 1,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		borderRadius: 8,
		backgroundColor: '#ffffff',
		padding: 10,
		marginTop: 5,
		marginBottom: 10,
		fontWeight: '400',
		fontSize: 15,
		lineHeight: 18,
		color: 'rgba(60, 60, 67, 0.6)'
	},
	bottom: {},
	signButton: {
		padding: 14,
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: '#1E1E1F'
	},
	signButtonText: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 20,
		color: '#FFFFFF'
	},
	reg: {
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		alignSelf: 'center',
		marginVertical: 20
	},
	error: {
		backgroundColor: '#fca5a5',
		borderWidth: 1,
		borderColor: '#f87171',
		borderRadius: 10,
		padding: 10,
		marginTop: 10
	}
});
