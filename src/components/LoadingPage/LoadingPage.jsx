import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

import styles from './LoadingPage.module.scss';
import logo from '../../assets/LogoShapes.svg';
import AnimationLayout from '../../animations/AnimationLayout';
import { AnimatePresence } from 'framer-motion';

const LoadingPage = () => {
	const [user, loading] = useAuthState(auth);

	const [showLoadPage, setLoadPage] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				setLoadPage(false);
			}, 3200);
			setTimeout(() => {
				navigate('/home');
			}, 3500);
		}
		if (!user) {
			setTimeout(() => {
				setLoadPage(false);
			}, 3200);
			setTimeout(() => {
				navigate('/onBoard');
			}, 3500);
		}
	}, [user]);

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
