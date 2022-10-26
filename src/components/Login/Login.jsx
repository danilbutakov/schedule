import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import styles from './Login.module.scss';
import '../../styles/index.scss';

import LoginFirst from './LoginFirst';
import LoginSecond from './LoginSecond';

const Login = () => {
	const [showFirst, setShowFirst] = useState(true);
	const [showSecond, setShowSecond] = useState(false);
	const [showLogins, setShowLogins] = useState(true);

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
			navigate('/onBoard');
			console.log('diff < -8');
		}

		setTouchPosition(null);
	};

	return (
		<div className={styles.loginContainer}>
			<div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
				<div className={styles.upperLineContainer}>
					<div className={styles.upperLine}></div>
				</div>
				<div className={styles.header}>
					<div className={styles.headerTitle}>Вход</div>
				</div>
			</div>
			<div className={styles.upLine}></div>
			<CSSTransition classNames='login' in={showSecond} timeout={500}>
				{showFirst ? (
					<LoginFirst
						setShowFirst={setShowFirst}
						setShowSecond={setShowSecond}
					/>
				) : (
					<LoginSecond
						setShowFirst={setShowFirst}
						setShowSecond={setShowSecond}
					/>
				)}
			</CSSTransition>
		</div>
	);
};

export default Login;
