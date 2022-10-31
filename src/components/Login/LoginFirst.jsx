import React, { useEffect, useState } from 'react';
import AnimationSwipe from '../../animations/AnimationSwipeDown';

import styles from './Login.module.scss';

const LoginFirst = ({ setShowFirst, setShowSecond, setShowAuth, showAuth }) => {
	const [input, setInputValue] = useState('');
	const [btnActive, setBtnActive] = useState(styles.btn1);

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
			<AnimationSwipe>
				<div className={styles.mainContent}>
					<h1 className={styles.title}>Введите название ВУЗа</h1>
					<input
						onChange={handleChangeInput}
						value={input}
						className={styles.input}
						type='text'
						placeholder='Например: МГУ'
					/>
				</div>
				<div className={styles.btns}>
					<button
						onClick={() => {
							setShowAuth(true);
							setShowFirst(false);
						}}
						className={styles.btn2}>
						Назад
					</button>
					<button
						onClick={() => {
							if (input !== '') {
								setShowFirst(false);
								setShowSecond(true);
							}
						}}
						className={btnActive}>
						Продолжить
					</button>
				</div>
			</AnimationSwipe>
		</div>
	);
};

export default LoginFirst;
