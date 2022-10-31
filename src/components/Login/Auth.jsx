import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from '../../components/Login/Login.module.scss';
import { useNavigate } from 'react-router-dom';

import AnimationSwipe from '../../animations/AnimationSwipeDown';
import appleLogo from '../../assets/appleLogo.svg';
import googleLogo from '../../assets/googleLogo.svg';

export const Auth = ({ setShowFirst }) => {
	const [user, loading] = useAuthState(auth);

	const [input, setInputValue] = useState('');
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

	useEffect(() => {
		if (user) {
			navigate('/home');
		} else {
			navigate('/onBoard');
		}
		if (!user) {
			navigate('/login');
		} else {
			navigate('/home');
		}
	}, [user]);

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
							<input
								onChange={handleChangeInput}
								value={input}
								className={styles.input}
								type='phone'
								placeholder='Введите номер телефона'
							/>
						</div>
						<button
							onClick={() => {
								if (input !== '' && user) {
									setShowAuth(false);
									setShowFirst(true);
								}
							}}
							className={btnActive}>
							Продолжить
						</button>
					</div>
				</AnimationSwipe>
			)}
		</div>
	);
};

export default Auth;
