import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onValue, ref } from 'firebase/database';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FirebaseAuthentication } from '@robingenz/capacitor-firebase-authentication';
import { Capacitor } from '@capacitor/core';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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

	const [input, setInputValue] = useState('');

	const [clickCon, setClickCon] = useState(false);

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

	// useEffect(() => {
	// 	if (click !== '') {
	// 		setBtnActive(styles.btn);
	// 	} else {
	// 		setBtnActive(styles.btnActive);
	// 	}
	// }, [input]);

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

	const clickContinue = () => {
		if (user) {
			setShowAuth(false);
			setShowFirst(true);
		}
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
						</div>
						{clickCon && (
							<button onClick={clickContinue} className={styles.btn}>
								Продолжить
							</button>
						)}
					</div>
				</AnimationSwipe>
			)}
		</div>
	);
};

export default Auth;
