import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

const LoginSecond = ({ setShowFirst, setShowSecond }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.main}>
			<div className={styles.mainContent}>
				<h1 className={styles.title}>Введите группу</h1>
				<input
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
						navigate('/schedule');
					}}
					className={styles.btn1}>
					Продолжить
				</button>
			</div>
		</div>
	);
};

export default LoginSecond;
