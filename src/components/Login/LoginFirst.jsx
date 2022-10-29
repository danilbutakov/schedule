import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import AnimationLayout from '../../animations/AnimationLayout';
import AnimationSwipe from '../../animations/AnimationSwipeDown';

import styles from './Login.module.scss';

const LoginFirst = ({ setShowFirst, setShowSecond }) => {
	const [input, setInputValue] = useState('');
	const [btnActive, setBtnActive] = useState(styles.btnActive);

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

	return (
		<div className={styles.main}>
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
	);
};

export default LoginFirst;
