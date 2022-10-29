import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimationSwipe from '../../animations/AnimationSwipeDown';

import styles from './Login.module.scss';

const LoginSecond = ({ setShowFirst, setShowSecond, setShowLogin }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [input, setInputValue] = useState('');
	const [btnActive, setBtnActive] = useState(styles.btn1);
	const [showSecondLogin, setShowSecondLogin] = useState(true);

	useEffect(() => {
		if (input !== '') {
			setBtnActive(styles.btn1Active);
		} else {
			setBtnActive(styles.btn1);
		}
	}, [input]);

	const handleChangeInput = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className={styles.main}>
			{showSecondLogin && (
				<AnimationSwipe>
					<div className={styles.mainContent}>
						<h1 className={styles.title}>Введите группу</h1>
						<input
							onChange={handleChangeInput}
							value={input}
							className={styles.input}
							type='text'
							placeholder='Например: БИ.1-19-1'
						/>
					</div>
					<div className={styles.btns}>
						<button
							onClick={() => {
								setShowFirst(true);
								setShowSecond(false);
							}}
							className={styles.btn2}>
							Назад
						</button>
						<button
							onClick={() => {
								if (
									location.pathname === location.pathname &&
									input !== ''
								) {
									setShowLogin(false);
									setTimeout(() => {
										navigate('/home');
									}, 300);
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

export default LoginSecond;
