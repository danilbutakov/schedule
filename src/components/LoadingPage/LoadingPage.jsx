import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './LoadingPage.module.scss';
import logo from '../../assets/logo.svg';

const LoadingPage = () => {
	const [state, setSate] = React.useState(true);
	const location = useLocation();

	const navigate = useNavigate();

	if (location.pathname === location.pathname) {
		setTimeout(() => {
			navigate('/onBoard');
		}, 3500);
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
