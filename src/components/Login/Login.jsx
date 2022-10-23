import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

const Login = ({ setShowSwiper, setShowLogin }) => {
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
			console.log('diff < 5');
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
					<Link to={'/onBoard'}>
						<h2
							onClick={() => {
								setShowSwiper(true);
								setShowLogin(false);
							}}
							className={styles.headerCancel}>
							Отменить
						</h2>
					</Link>
					<div className={styles.headerTitle}>Вход</div>
				</div>
			</div>
			<div className={styles.upLine}></div>
			<div className={styles.main}>
				<div className={styles.mainContent}>
					<h1 className={styles.title}>Введите номер зачетки</h1>
					<h2 className={styles.subTitle}>
						Номер зачетной книжки находится на первой странице.
					</h2>
					<input
						className={styles.input}
						type='text'
						placeholder='Номер зачетки'
					/>
				</div>
				<Link to='/schedule'>
					<button
						onClick={() => {
							setShowSwiper(true);
							setShowLogin(false);
						}}
						className={styles.btn}>
						Войти
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;
