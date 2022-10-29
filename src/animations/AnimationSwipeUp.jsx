import React from 'react';
import { motion } from 'framer-motion';

import styles from './Animations.module.scss';

const AnimationSwipeUp = ({ children }) => {
	const animations = {
		initial: { y: -650, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: -650, opacity: 0 },
	};

	return (
		<motion.div
			className={styles.motion}
			variants={animations}
			initial='initial'
			animate='animate'
			exit='exit'
			transition={{ duration: 0.4 }}>
			{children}
		</motion.div>
	);
};

export default AnimationSwipeUp;
