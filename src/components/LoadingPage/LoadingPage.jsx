import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LoadingPage.module.scss';
import logo from '../../assets/logo.svg';

const LoadingPage = () => {
	const [state, setSate] = React.useState(true);

	const navigate = useNavigate();

	if (state) {
		setTimeout(() => {
			navigate('/onBoard');
		}, 6666665500);
	}

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<img className={styles.img} src={logo} alt='logo' />
			</div>
			<div className={styles.textContainer}>
				<span className={styles.text}>Schedule</span>
			</div>
		</div>
	);
};

export default LoadingPage;
