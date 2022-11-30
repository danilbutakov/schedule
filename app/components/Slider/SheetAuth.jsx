import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
	Alert,
	ActivityIndicator
} from 'react-native';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import debounce from 'lodash.debounce';

import useAuth from '../../hooks/useAuth';
import { images } from '../../../assets/globalImages';

const { width } = Dimensions.get('screen');

const SheetAuth = () => {
	const { onGoogleButtonPress, setUser, loading, user, signOut } = useAuth();
	const currentUser = auth().currentUser;

	const [register, setRegister] = useState(false);
	const [userWithEmail, setUserWithEmail] = useState();
	const [showEmailVerified, setShowEmailVerified] = useState(false);
	const [showAuth, setShowAuth] = useState(true);

	const [email, setEmail] = useState('');
	const [emailValue, setEmailValue] = useState('');

	const [password, setPassword] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmValue, setPasswordConfirmValue] = useState('');

	const [isError, setIsError] = useState(false);
	const [isErrorPassword, setIsErrorPassword] = useState(false);
	const [verifError, setVerifError] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const handleChangeEmail = useCallback(
		debounce(str => {
			setEmail(str);
		}, 500),
		[]
	);

	const handleChangePassword = useCallback(
		debounce(str => {
			setPassword(str);
		}, 500),
		[]
	);

	const handleChangePasswordConfirm = useCallback(
		debounce(str => {
			setPasswordConfirm(str);
		}, 500),
		[]
	);

	const onChangeEmail = text => {
		setEmailValue(text);
		handleChangeEmail(text);
	};

	const onChangePassword = text => {
		setPasswordValue(text);
		handleChangePassword(text);
	};

	const onChangePasswordConfirm = text => {
		setPasswordConfirmValue(text);
		handleChangePasswordConfirm(text);
	};

	const signUp = () => {
		if (
			email === '' &&
			email === ' ' &&
			email.length <= 5 &&
			password === '' &&
			password === ' ' &&
			password.length <= 5 &&
			passwordConfirm === '' &&
			passwordConfirm === ' ' &&
			passwordConfirm.length <= 5
		) {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 4000);
		}
		if (
			email !== '' &&
			email !== ' ' &&
			email.length >= 5 &&
			password !== '' &&
			password !== ' ' &&
			password.length >= 5 &&
			passwordConfirm !== '' &&
			passwordConfirm !== ' ' &&
			passwordConfirm.length >= 5 &&
			password === passwordConfirm
		) {
			const userSignUp = auth().createUserWithEmailAndPassword(email, password);
			userSignUp
				.then(() => {
					auth()
						.currentUser.sendEmailVerification({
							handleCodeInApp: true,
							url: 'https://schedule-11f30.firebaseapp.com'
						})
						.then(() => {
							setUserWithEmail(userSignUp);
							console.log('verification email send');
							Alert.alert('Письмо с подтверждением почты успешно отправлено');
							setShowEmailVerified(true);
							setShowAuth(false);
						})
						.catch(error => {
							console.log(error);
							Alert.alert('Не удалось отправить письмо с подтверждением');
							setShowEmailVerified(false);
							setShowAuth(true);
							signOut();
						});
				})
				.catch(error => {
					console.log(error);
					Alert.alert('Аккаунт с такой почтой уже зарегестрирован');
					setShowEmailVerified(false);
					setShowAuth(true);
					signOut();
				});
		} else {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 4000);
		}
		if (password !== passwordConfirm) {
			setIsErrorPassword(true);
			setTimeout(() => {
				setIsErrorPassword(false);
			}, 4000);
		}
	};

	const signIn = () => {
		if (
			email === '' &&
			email === ' ' &&
			email.length <= 5 &&
			password === '' &&
			password === ' ' &&
			password.length <= 5
		) {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 4000);
		}
		if (
			email !== '' &&
			email !== ' ' &&
			email.length >= 5 &&
			password !== '' &&
			password !== ' ' &&
			password.length >= 5
		) {
			auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					setUser();
					console.log('Login successfully');
				})
				.catch(error => {
					console.log(error);
					Alert.alert('Неверный email или пароль');
				});
		} else {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 4000);
		}
	};

	return (
		<View>
			<View style={styles.conMain}>
				{loading ? <ActivityIndicator size='large' color='#1E1E1F' /> : null}
				{user && user.emailVerified === false && (
					<View style={{ marginTop: 10, paddingHorizontal: 20, flex: 1 }}>
						<Text
							style={{
								fontFamily: 'Montserrat-Bold',
								fontSize: 23,
								alignSelf: 'center',
								lineHeight: 28,
								marginBottom: 30
							}}>
							Письмо подтверждения
						</Text>
						<Text
							style={{
								fontFamily: 'Montserrat-Medium',
								fontSize: 15,
								alignSelf: 'center',
								lineHeight: 20,
								flex: 0.85
							}}>
							Перейдите по ссылке в отправленном письме на вашу почту, чтобы
							подтвердить email. Возможно письмо может оказаться в папке Спам.
						</Text>
						<TouchableOpacity
							onPress={() => {
								if (currentUser.emailVerified === false) {
									setVerifError(true);
								}
								if (currentUser.emailVerified === true) {
									setVerifError(false);
									setUser(currentUser);
								}
								currentUser.reload();
							}}>
							<View style={styles.signButton}>
								<Text style={styles.signButtonText}>Продолжить</Text>
							</View>
						</TouchableOpacity>
						{verifError === true && (
							<Text style={styles.error}>Подтвердите email</Text>
						)}
						<TouchableOpacity onPress={signOut}>
							<Text style={styles.reg}>
								Не пришло письмо? Пройдите регистрацию еще раз
							</Text>
						</TouchableOpacity>
					</View>
				)}
				{!user && (
					<>
						<Text style={styles.title}>
							{register ? 'Регистрация' : 'Войти с помощью'}
						</Text>
						<TouchableOpacity style={styles.container}>
							<TouchableOpacity
								onPress={() => {
									onGoogleButtonPress();
								}}>
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
										value={emailValue}
										ref={emailRef}
										onChangeText={onChangeEmail}
										placeholder='Введите email'
										style={styles.inputVuz}
									/>
									<Text style={styles.text}>Пароль</Text>
									<TextInput
										value={passwordValue}
										ref={passwordRef}
										onChangeText={onChangePassword}
										placeholder='Введите пароль'
										secureTextEntry={true}
										style={styles.inputVuz}
									/>
									<Text style={styles.text}>Подтвердите пароль</Text>
									<TextInput
										value={passwordConfirmValue}
										ref={passwordConfirmRef}
										onChangeText={onChangePasswordConfirm}
										placeholder='Подтвердите пароль'
										secureTextEntry={true}
										style={styles.inputVuz}
									/>
									{isError === false && isErrorPassword === false ? (
										<TouchableOpacity
											style={styles.signButton}
											onPress={signUp}>
											<Text style={styles.signButtonText}>
												Зарегистрироваться
											</Text>
										</TouchableOpacity>
									) : null}
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
					</>
				)}
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
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	title: {
		color: '#1E1E1F',
		fontSize: 27,
		lineHeight: 36,
		alignSelf: 'center',
		fontFamily: 'Montserrat-SemiBold',
		marginTop: 10
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
		fontSize: 17,
		lineHeight: 24,
		color: 'black',
		fontFamily: 'Montserrat-Medium'
	},
	another: {
		color: '#8A8A8E',
		fontSize: 15,
		lineHeight: 31,
		marginTop: 10,
		alignSelf: 'center',
		fontFamily: 'Montserrat-Regular'
	},
	conSign: {
		marginTop: 10,
		marginHorizontal: 20
	},
	text: {
		color: '#1E1E1F',
		fontSize: 17,
		lineHeight: 20,
		fontFamily: 'Montserrat-Regular'
	},
	inputVuz: {
		borderWidth: 1,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		borderRadius: 8,
		backgroundColor: '#ffffff',
		padding: 10,
		marginTop: 5,
		marginBottom: 10,
		fontSize: 15,
		lineHeight: 18,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Regular'
	},
	bottom: {},
	signButton: {
		padding: 14,
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: '#1E1E1F'
	},
	signButtonText: {
		fontSize: 17,
		lineHeight: 20,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-Medium'
	},
	reg: {
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		alignSelf: 'center',
		marginVertical: 20,
		fontFamily: 'Montserrat-Regular'
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
