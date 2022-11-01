import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimationSwipe from '../../animations/AnimationSwipeDown';
import AppContext from '../../utils/Context';

import styles from './Login.module.scss';

const LoginSecond = ({ setShowFirst, setShowSecond, setShowLogin }) => {
	const navigate = useNavigate();
	const [btnActive, setBtnActive] = useState(styles.btn1);
	const [showSecondLogin, setShowSecondLogin] = useState(true);

	const { group, setGroup, writeToDataBaseGroup, writeToDataBaseUniv } =
		useContext(AppContext);

	useEffect(() => {
		if (group !== '') {
			setBtnActive(styles.btn1Active);
		} else {
			setBtnActive(styles.btn1);
		}
	}, [group]);

	const handleChangeInput = (e) => {
		setGroup(e.target.value);
	};

	return (
		<div className={styles.main}>
			{showSecondLogin && (
				<AnimationSwipe>
					<div className={styles.mainContent}>
						<h1 className={styles.title}>Введите группу</h1>
						<input
							onChange={handleChangeInput}
							value={group}
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
								if (group !== '') {
									setShowLogin(false);
									writeToDataBaseUniv();
									writeToDataBaseGroup();
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
