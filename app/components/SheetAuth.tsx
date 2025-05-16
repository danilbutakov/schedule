import {
	ActivityIndicator,
	Alert,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useCallback, useRef, useState, RefObject } from 'react';
import auth from '@react-native-firebase/auth';
import { TextInput as RNTextInput } from 'react-native';
import debounce from 'lodash.debounce';

import useAuth from '../hooks/useAuth';
// @ts-ignore
import Google from '../../assets/images/Google.svg';
// @ts-ignore
import Apple from '../../assets/images/Apple.svg';

const { width } = Dimensions.get('screen');

const SheetAuth = () => {
	// @ts-ignore
	const { onGoogleButtonPress, setUser, loading, user, signOut, setLoading } =
		useAuth();
	const currentUser = auth().currentUser;

	const [register, setRegister] = useState(false);
	const [isErrorSignUp, setIsErrorSignUp] = useState<string>('');
	const [showEmailVerified, setShowEmailVerified] = useState(false);
	const [showAuth, setShowAuth] = useState(true);

	const [email, setEmail] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');

	const [password, setPassword] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');

	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [passwordConfirmValue, setPasswordConfirmValue] = useState<string>('');

	const [isError, setIsError] = useState(false);
	const [isErrorPassword, setIsErrorPassword] = useState(false);
	const [verifError, setVerifError] = useState(false);

	const emailRef = useRef<RNTextInput>(null);
	const passwordRef = useRef<RNTextInput>(null);
	const passwordConfirmRef = useRef<RNTextInput>(null);

	const handleChangeEmail = useCallback(
		debounce((str) => {
			setEmail(str);
		}, 500),
		[]
	);

	const handleChangePassword = useCallback(
		debounce((str) => {
			setPassword(str);
		}, 500),
		[]
	);

	const handleChangePasswordConfirm = useCallback(
		debounce((str) => {
			setPasswordConfirm(str);
		}, 500),
		[]
	);

	const onChangeEmail = (text) => {
		setEmailValue(text);
		handleChangeEmail(text);
	};

	const onChangePassword = (text) => {
		setPasswordValue(text);
		handleChangePassword(text);
	};

	const onChangePasswordConfirm = (text) => {
		setPasswordConfirmValue(text);
		handleChangePasswordConfirm(text);
	};

	const signUp = () => {
		if (
			email === '' &&
			// @ts-ignore
			email === ' ' &&
			// @ts-ignore
			email.length <= 5 &&
			password === '' &&
			// @ts-ignore
			password === ' ' &&
			// @ts-ignore
			password.length <= 5 &&
			passwordConfirm === '' &&
			// @ts-ignore
			passwordConfirm === ' ' &&
			// @ts-ignore
			passwordConfirm.length <= 5
		) {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
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
							handleCodeInApp: false,
							url: 'https://schedule-11f30.firebaseapp.com'
						})
						.then(() => {
							Alert.alert('Письмо с подтверждением почты успешно отправлено');
							setShowEmailVerified(true);
							setShowAuth(false);
						})
						.catch((error) => {
							console.log(error);
							Alert.alert('Не удалось отправить письмо с подтверждением');
							setShowEmailVerified(false);
							setShowAuth(true);
							signOut();
						});
				})
				.catch((error) => {
					setIsErrorSignUp(error.message);
					console.log(isErrorSignUp);
					if (
						isErrorSignUp ===
						'[auth/invalid-email] The email address is badly formatted.'
					) {
						Alert.alert('Неверный формат почты');
					} else {
						Alert.alert('Аккаунт с такой почтой уже зарегестрирован');
					}
					setShowEmailVerified(false);
					setShowAuth(true);
					signOut();
				});
		} else {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
		}
		if (password !== passwordConfirm) {
			setIsErrorPassword(true);
			setTimeout(() => {
				setIsErrorPassword(false);
			}, 3000);
		}
	};

	const signIn = async () => {
		setLoading(true);
		if (
			email === '' &&
			// @ts-ignore
			email === ' ' &&
			// @ts-ignore
			email.length <= 5 &&
			password === '' &&
			// @ts-ignore
			password === ' ' &&
			// @ts-ignore
			password.length <= 5
		) {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
			setLoading(false);
		}
		if (
			email !== '' &&
			email !== ' ' &&
			email.length >= 5 &&
			password !== '' &&
			password !== ' ' &&
			password.length >= 5
		) {
			try {
				await auth().signInWithEmailAndPassword(email, password);
			} catch (error) {
				console.log(error);
				Alert.alert('Неверный email или пароль');
			} finally {
				setLoading(false);
			}
		} else {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
			setLoading(false);
		}
	};

	return (
		<View>
			<View style={styles.conMain}>
				{loading ? <ActivityIndicator size='large' color='#F7F7F7' /> : null}
				{user && user.emailVerified === false && (
					<View style={{ marginTop: 10, flex: 1 }}>
						<Text
							style={{
								fontFamily: 'Montserrat-Bold',
								fontSize: 23,
								alignSelf: 'center',
								lineHeight: 28,
								marginBottom: 30,
								color: '#F7F7F7'
							}}>
							Письмо подтверждения
						</Text>
						<Text
							style={{
								fontFamily: 'Montserrat-Medium',
								fontSize: 15,
								alignSelf: 'center',
								lineHeight: 20,
								flex: 0.85,
								color: '#F7F7F7'
							}}>
							Перейдите по ссылке в отправленном письме на вашу почту:{' '}
							{user?.email}, чтобы подтвердить Email. {`\n`}Возможно письмо
							может оказаться в папке «Спам».
						</Text>
						а
						<TouchableOpacity
							onPress={() => {
								auth().onIdTokenChanged((user) => {
									if (user && user.uid) {
										if (user.emailVerified) {
											setUser(user);
											user.reload();
											currentUser.reload();
											setVerifError(false);
											console.log('cool');
										} else {
											setVerifError(true);
											user.reload();
											currentUser.reload();
											console.log('bad');
										}
									}
								});
							}}>
							<View style={styles.signButton}>
								<Text style={styles.signButtonText}>Продолжить</Text>
							</View>
						</TouchableOpacity>
						{verifError === true && (
							<Text style={styles.error}>Подтвердите Email</Text>
						)}
						<TouchableOpacity
							onPress={() => {
								auth()
									.currentUser.delete()
									.then(() => {
										setUser(null);
									})
									.catch((error) => {
										Alert.alert('Повторите попытку выхода');
										console.log(error);
									});
							}}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									color: '#F7F7F7'
								}}>
								{`Не пришло письмо?`}
								<Text
									style={{
										fontFamily: 'Montserrat-Regular',
										color: '#09C0A9'
									}}>
									{' '}
									Повторите попытку
								</Text>
							</Text>
						</TouchableOpacity>
					</View>
				)}
				{!user && (
					<View style={{ flex: 1 }}>
						<Text style={styles.title}>
							{register ? 'Создать учетную запись' : 'Войти'}
						</Text>
						<View style={styles.bottom}>
							<Text style={styles.reg} onPress={() => setRegister(!register)}>
								{register && (
									<Text>
										Уже есть учетная запись?
										<Text
											style={{
												fontFamily: 'Montserrat-Regular',
												color: '#09C0A9'
											}}>
											{''} Войти
										</Text>
									</Text>
								)}
								{!register && (
									<Text>
										{`Новый пользователь?\n`}
										<Text
											style={{
												fontFamily: 'Montserrat-Regular',
												color: '#09C0A9'
											}}>
											Создать учетную запись
										</Text>
									</Text>
								)}
							</Text>
						</View>
						<TouchableOpacity style={styles.container}>
							{register ? (
								<View style={styles.conSign}>
									<Text style={styles.text}>Адрес электронной почты</Text>
									<RNTextInput
										value={emailValue}
										ref={emailRef}
										onChangeText={onChangeEmail}
										placeholder='Введите email'
										style={styles.inputVuz}
									/>
									<Text style={styles.text}>Пароль</Text>
									<RNTextInput
										value={passwordValue}
										ref={passwordRef}
										onChangeText={onChangePassword}
										placeholder='Введите пароль'
										secureTextEntry={true}
										style={styles.inputVuz}
									/>
									<Text style={styles.text}>Подтвердите пароль</Text>
									<RNTextInput
										value={passwordConfirmValue}
										ref={passwordConfirmRef}
										onChangeText={onChangePasswordConfirm}
										placeholder='Подтвердите пароль'
										secureTextEntry={true}
										style={styles.inputVuz}
									/>
									{isErrorPassword && (
										<Text style={styles.error}>Пароли не совпадают</Text>
									)}
									{register && isError ? (
										<View style={styles.conSign}>
											<Text style={styles.error}>Заполнены не все поля</Text>
										</View>
									) : null}
									{!isError && !isErrorPassword && (
										<Text style={styles.another}>или</Text>
									)}
								</View>
							) : (
								<View style={styles.conSign}>
									<Text style={styles.text}>Адрес электронной почты</Text>
									<RNTextInput
										value={email}
										onChangeText={(email) => setEmail(email)}
										placeholder='Введите email'
										style={styles.inputVuz}
									/>
									<Text style={styles.text}>Пароль</Text>
									<RNTextInput
										value={password}
										onChangeText={(password) => setPassword(password)}
										placeholder='Введите пароль'
										secureTextEntry={true}
										style={styles.inputVuz}
									/>
									{isError && (
										<View style={styles.conSign}>
											<Text style={styles.error}>Заполнены не все поля</Text>
										</View>
									)}
									{!isError && <Text style={styles.another}>или</Text>}
								</View>
							)}
						</TouchableOpacity>
						<View style={{ flex: 1 }}>
							{register && isError === false && isErrorPassword === false && (
								<>
									<TouchableOpacity
										onPress={() => {
											onGoogleButtonPress();
										}}>
										<View style={styles.conBtnActive}>
											<Google style={{ marginRight: 7 }} />
											<Text style={styles.btnTextActive}>
												Продолжить с Google
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											Alert.alert(
												'В скором времени вход через Apple аккаунт будет доступен'
											);
										}}>
										<View style={styles.conBtnActiveApple}>
											<Apple style={{ marginRight: 7 }} />
											<Text style={styles.btnTextActiveApple}>
												Продолжить с Apple
											</Text>
										</View>
									</TouchableOpacity>
								</>
							)}
							{!register && !isError && (
								<>
									<TouchableOpacity
										onPress={() => {
											onGoogleButtonPress();
										}}>
										<View style={styles.conBtnActive}>
											<Google style={{ marginRight: 7 }} />
											<Text style={styles.btnTextActive}>
												Продолжить с Google
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											Alert.alert(
												'В скором времени вход через AppleID будет доступен'
											);
										}}>
										<View style={styles.conBtnActiveApple}>
											<Apple style={{ marginRight: 7 }} />
											<Text style={styles.btnTextActiveApple}>
												Продолжить с Apple
											</Text>
										</View>
									</TouchableOpacity>
								</>
							)}
						</View>
						{!register && isError === false && isErrorPassword === false && (
							<TouchableOpacity style={styles.signButton} onPress={signIn}>
								<Text style={styles.signButtonText}>Продолжить</Text>
							</TouchableOpacity>
						)}
						{register && isError === false && isErrorPassword === false ? (
							<TouchableOpacity style={styles.signButton} onPress={signUp}>
								<Text style={styles.signButtonText}>Регистрация</Text>
							</TouchableOpacity>
						) : null}
					</View>
				)}
			</View>
		</View>
	);
};

export default SheetAuth;

const styles = StyleSheet.create({
	conMain: {
		flex: 1,
		width,
		paddingHorizontal: 20,
		marginBottom: 35
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	title: {
		color: '#F7F7F7',
		fontSize: 24,
		lineHeight: 32,
		fontFamily: 'Montserrat-SemiBold',
		marginTop: 23
	},
	reg: {
		fontSize: 16,
		lineHeight: 18,
		marginTop: 8,
		color: '#F7F7F7',
		fontFamily: 'Montserrat-Medium',
		textAlign: 'left'
	},
	container: {
		marginTop: 20
	},
	conBtnActive: {
		backgroundColor: '#F7F7F7',
		borderRadius: 20,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		borderWidth: 1,
		paddingVertical: 13,
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	},
	conBtnActiveApple: {
		backgroundColor: '#303030',
		borderRadius: 20,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		borderWidth: 1,
		paddingVertical: 13,
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		marginTop: 12
	},
	btnTextActive: {
		fontSize: 14,
		lineHeight: 24,
		color: '#1E1E1F',
		fontFamily: 'Montserrat-SemiBold'
	},
	btnTextActiveApple: {
		fontSize: 14,
		lineHeight: 24,
		color: '#F7F7F7',
		fontFamily: 'Montserrat-SemiBold'
	},
	another: {
		color: '#F7F7F7',
		fontSize: 15,
		lineHeight: 31,
		marginBottom: 10,
		alignSelf: 'center',
		fontFamily: 'Montserrat-Medium'
	},
	conSign: {
		marginTop: 10
	},
	text: {
		color: '#F7F7F7',
		fontSize: 15,
		lineHeight: 18,
		fontFamily: 'Montserrat-Medium'
	},
	inputVuz: {
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		backgroundColor: '#FFFFFF',
		padding: 10,
		marginTop: 5,
		marginBottom: 8,
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium'
	},
	bottom: {},
	signButton: {
		padding: 17,
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: '#1E1E1F',
		marginBottom: 30
	},
	signButtonText: {
		fontSize: 17,
		lineHeight: 20,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-SemiBold'
	},
	error: {
		backgroundColor: '#fca5a5',
		borderWidth: 1,
		borderColor: '#f87171',
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		marginBottom: 10
	}
});
