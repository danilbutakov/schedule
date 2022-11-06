import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onValue, ref } from 'firebase/database';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FirebaseAuthentication } from '@robingenz/capacitor-firebase-authentication';
import { Capacitor } from '@capacitor/core';
import {
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

import styles from '../../components/Login/Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import AnimationSwipe from '../../animations/AnimationSwipeDown';
import appleLogo from '../../assets/appleLogo.svg';
import googleLogo from '../../assets/googleLogo.svg';
import AppContext from '../../utils/Context';

export const Auth = ({ setShowFirst }) => {
	const [user, loading] = useAuthState(auth);
	const [showAuth, setShowAuth] = useState(true);

	const { setUnivs, setGroups } = useContext(AppContext);

	const [signIn, setSignIn] = useState(true);
	const [signUp, setSignUp] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const [clickCon, setClickCon] = useState(false);
	const [error, setError] = useState(false);
	const [errorSignIn, setErrorSignIn] = useState(false);

	const [btnActive, setBtnActive] = useState(styles.btnActive);

	const navigate = useNavigate();

	// const googleSignIn = async () => {
	// 	if (!Capacitor.isNativePlatform()) {
	// 		GoogleLogin();
	// 	}
	// 	try {
	// 		await FirebaseAuthentication.signInWithGoogle();

	// 		if (user) {
	// 			setClickCon(true);
	// 		}
	// 		console.log('123');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		if (email !== '' && password !== '' && passwordConfirm !== '') {
			setBtnActive(styles.btn);
		} else {
			setBtnActive(styles.btnActive);
		}
		if (email !== '' && password !== '') {
			setBtnActive(styles.btn);
		} else {
			setBtnActive(styles.btnActive);
		}
	}, [email, password, passwordConfirm]);

	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log(result.user);
			setClickCon(true);
			setShowAuth(false);
			setShowFirst(true);
		} catch (error) {
			console.log(error);
		}
	};

	const clickSignIn = () => {
		try {
			signInFunc();
			if (user) {
				setShowAuth(false);
				setShowFirst(true);
			}
		} catch (error) {
			console.log(error);
			setErrorSignIn(true);
		}
		if (passwordConfirm !== password) {
			setError(true);
		} else {
			setError(false);
		}
	};

	const clickSignUp = () => {
		try {
			signUpFunc();
			if (user) {
				setSignIn(true);
				setSignUp(false);
			}
		} catch (error) {
			console.log(error);
			setErrorSignIn(true);
		}
		if (passwordConfirm !== password) {
			setError(true);
		} else {
			setError(false);
		}
	};

	useEffect(() => {
		if (passwordConfirm !== password) {
			setError(true);
		} else {
			setError(false);
		}
	}, [passwordConfirm]);

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleChangePasswordConfirm = (e) => {
		setPasswordConfirm(e.target.value);
	};

	const signUpFunc = async () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;

				console.log(user);
			})
			.catch((error) => {
				console.log(error);
				// ..
			});
	};

	const signInFunc = async () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;

				console.log(user);
			})
			.catch((error) => {
				console.log(error);
				// ..
			});
	};

	//read from database
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
					setUnivs([]);
					setGroups([]);
					const data = snapshot.val();
					if (data !== null) {
						navigate('/home');
					}
					if (data === null) {
						setShowAuth(false);
						setShowFirst(true);
					}
				});
			}
		});
	}, [auth.currentUser]);

	return (
		<div className={styles.main}>
			{showAuth && (
				<AnimationSwipe>
					<div className={styles.mainContent}>
						<h1 className={styles.title}>Войти с помощью</h1>
						<div className={styles.content}>
							{/* {!Capacitor.isNativePlatform() ? (
								<>
									<div className={styles.authMethods}>
										<div className={styles.authMethod}>
											<img
												width={20}
												height={20}
												src={appleLogo}
												alt='apple'
												className={styles.authLogos}
											/>
											<span className={styles.authSpans}>
												Sign in with Apple
											</span>
										</div>
										<div
											onClick={GoogleLogin}
											className={styles.authMethod}>
											<img
												width={20}
												height={20}
												src={googleLogo}
												alt='apple'
												className={styles.authLogos}
											/>
											<span className={styles.authSpans}>
												Sign in with Google
											</span>
										</div>
									</div>
									<span className={styles.another}>или</span>
								</>
							) : ( */}
							<div className={styles.formContainer}>
								{signIn && (
									<form action='' className={styles.form}>
										<label className={styles.formLabel}>Email</label>
										<input
											className={styles.formInputs}
											type='email'
											value={email}
											onChange={handleChangeEmail}
											placeholder='Введите email'
										/>
										<label className={styles.formLabel}>Пароль</label>
										<input
											className={styles.formInputs}
											type='password'
											value={password}
											onChange={handleChangePassword}
											placeholder='Введите пароль'
										/>
										<button
											type='submit'
											onClick={clickSignIn}
											className={btnActive}>
											Продолжить
										</button>
									</form>
								)}
								{signUp && (
									<form action='' className={styles.form}>
										<label className={styles.formLabel}>Email</label>
										<input
											className={styles.formInputs}
											type='email'
											value={email}
											onChange={handleChangeEmail}
											placeholder='Введите email'
										/>
										<label className={styles.formLabel}>Пароль</label>
										<input
											className={styles.formInputs}
											type='password'
											value={password}
											onChange={handleChangePassword}
											placeholder='Введите пароль'
										/>
										<label className={styles.formLabel}>
											Подтвердите пароль
										</label>
										<input
											className={styles.formInputs}
											type='password'
											value={passwordConfirm}
											onChange={handleChangePasswordConfirm}
											placeholder='Подтвердите пароль'
										/>
										{error ? (
											<div className={styles.formError}>
												Пароли не совпадают
											</div>
										) : (
											<button
												type='submit'
												onClick={clickSignUp}
												className={btnActive}>
												Продолжить
											</button>
										)}
									</form>
								)}
							</div>
							{/* )} */}
						</div>
						{errorSignIn && (
							<div className={styles.formError}>
								Не удалось создать аккаунт
							</div>
						)}
						<span
							className={styles.register}
							onClick={() => {
								setSignIn(!signIn);
								setSignUp(!signUp);
							}}>
							{signIn && 'Нет аккаунта? Зарегестрироваться'}
							{signUp && 'Уже есть аккаунт? Войти'}
						</span>
					</div>
				</AnimationSwipe>
			)}
		</div>
	);
};

export default Auth;
