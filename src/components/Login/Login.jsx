import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';

import styles from './Login.module.scss';
import '../../styles/index.scss';

import LoginFirst from './LoginFirst';
import LoginSecond from './LoginSecond';
import { AnimatePresence } from 'framer-motion';
import AnimationSwipe from '../../animations/AnimationSwipeDown';

const Login = () => {
	const [showLogin, setShowLogin] = useState(true);
	const [showFirst, setShowFirst] = useState(true);
	const [showSecond, setShowSecond] = useState(false);

	const navigate = useNavigate();

	const [touchPosition, setTouchPosition] = useState(null);
	// ...
	const handleTouchStart = (e) => {
		const touchDown = e.touches[0].clientY;
		setTouchPosition(touchDown);
	};

	const handleTouchMove = (e) => {
		const touchDown = touchPosition;

		if (touchDown === null) {
			return;
		}

		const currentTouch = e.touches[0].clientY;
		const diff = touchDown - currentTouch;

		if (diff < -8) {
			setShowLogin(false);
			setTimeout(() => {
				navigate('/onBoard');
				auth.signOut();
			}, 300);
		}

		setTouchPosition(null);
	};

	return (
		<AnimatePresence>
			{showLogin && (
				<AnimationSwipe>
					<div className={styles.loginShape}>
						<div className={styles.loginMain}>
							<div className={styles.loginContainer}>
								<div
									onTouchStart={handleTouchStart}
									onTouchMove={handleTouchMove}>
									<div className={styles.upperLineContainer}>
										<div className={styles.upperLine}></div>
									</div>
									<div className={styles.header}>
										<div className={styles.headerTitle}>Вход</div>
									</div>
								</div>
								<div className={styles.upLine}></div>

								{showFirst ? (
									<LoginFirst
										showFirst={showFirst}
										setShowFirst={setShowFirst}
										setShowSecond={setShowSecond}
									/>
								) : (
									<LoginSecond
										setShowFirst={setShowFirst}
										setShowSecond={setShowSecond}
										setShowLogin={setShowLogin}
									/>
								)}
							</div>
						</div>
					</div>
				</AnimationSwipe>
			)}
		</AnimatePresence>
	);
};

export default Login;
