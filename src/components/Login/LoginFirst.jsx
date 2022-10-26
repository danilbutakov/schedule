import React from 'react';

import styles from './Login.module.scss';

const LoginFirst = ({ setShowFirst, setShowSecond }) => {
	return (
		<div className={styles.main}>
			<div className={styles.mainContent}>
				<h1 className={styles.title}>Введите название ВУЗа</h1>
				<input
					className={styles.input}
					type='text'
					placeholder='Например: МГУ'
				/>
			</div>
			<button
				onClick={() => {
					setShowFirst(false);
					setShowSecond(true);
				}}
				className={styles.btn}>
				Продолжить
			</button>
		</div>
	);
};

export default LoginFirst;
