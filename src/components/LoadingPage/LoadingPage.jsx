import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './LoadingPage.module.scss';
import logo from '../../assets/LogoShapes.svg';
import AnimationLayout from '../../animations/AnimationLayout';
import { AnimatePresence } from 'framer-motion';

const LoadingPage = () => {
	const [showLoadPage, setLoadPage] = useState(true);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === location.pathname) {
			setTimeout(() => {
				setLoadPage(false);
			}, 3200);
			setTimeout(() => {
				navigate('/onBoard');
			}, 3500);
		}
	}, [location.pathname]);

	return (
		<AnimatePresence>
			{showLoadPage && (
				<AnimationLayout>
					<div className={styles.container}>
						<div className={styles.imgContainer}>
							<img className={styles.img} src={logo} alt='logo' />
						</div>
						<div className={styles.textContainer}>
							<span className={styles.text}>Schedule</span>
						</div>
					</div>
				</AnimationLayout>
			)}
		</AnimatePresence>
	);
};

export default LoadingPage;
