import React, { useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';

import styles from '../../components/Login/Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import AnimationSwipe from '../../animations/AnimationSwipeDown';
import appleLogo from '../../assets/appleLogo.svg';
import googleLogo from '../../assets/googleLogo.svg';
import AppContext from '../../utils/Context';

export const Auth = ({ setShowFirst }) => {
	const [user, loading] = useAuthState(auth);

	const { setUnivs, setGroups } = useContext(AppContext);

	const [input, setInputValue] = useState('');
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');
	const [clickCon, setClickCon] = useState(false);

	const [btnActive, setBtnActive] = useState(styles.btnActive);
	const [showAuth, setShowAuth] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		if (input !== '') {
			setBtnActive(styles.btn);
		} else {
			setBtnActive(styles.btnActive);
		}
	}, [input]);

	const handleChangeInput = (e) => {
		setInputValue(e.target.value);
	};

	const handleChangeOtp = (e) => {
		setotp(e.target.value);
	};

	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log(result.user);
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	// Sent OTP
	const signin = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			'recaptcha-container',
			{
				size: 'invisible',
				callback: (response) => {
					signin();
				},
			},
			auth,
		);
		const phoneNumber = input;
		console.log(phoneNumber);
		const appVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setshow(true);
				setfinal(confirmationResult);
				alert('otp sended');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Validate OTP
	const ValidateOtp = () => {
		final
			.confirm(otp)
			.then((result) => {
				// User signed in successfully.
				const user = result.user;
				console.log(user);
				alert('Done, you can go continue');
				// ...
			})
			.catch((error) => {
				// User couldn't sign in (bad verification code?)
				// ...
				alert(error.message);
			});
	};

	const clickContinue = () => {
		if (input !== '' && user) {
			setClickCon(true);
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
							<div style={{ display: !show ? 'block' : 'none' }}>
								<input
									onChange={handleChangeInput}
									value={input}
									className={styles.input}
									type='phone'
									placeholder='Введите номер телефона, начиная с +7'
								/>
								<br />
								<br />
								<div id='recaptcha-container'></div>
								<button onClick={signin}>Send OTP</button>
							</div>
							<div style={{ display: show ? 'block' : 'none' }}>
								<input
									type='number'
									className={styles.input}
									placeholder={'Enter your OTP'}
									value={otp}
									onChange={handleChangeOtp}
								/>
								<br />
								<br />
								<button className={styles.btn} onClick={ValidateOtp}>
									Verify
								</button>
							</div>
						</div>
						<button onClick={clickContinue} className={btnActive}>
							Продолжить
						</button>
					</div>
				</AnimationSwipe>
			)}
		</div>
	);
};

export default Auth;
