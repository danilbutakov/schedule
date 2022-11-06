import React from 'react';
import { motion } from 'framer-motion';

const AnimationLayout = ({ children }) => {
	const animations = {
		initial: { x: 650, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<motion.div
			variants={animations}
			initial='initial'
			animate='animate'
			exit='exit'
			transition={{ duration: 0.4 }}>
			{children}
		</motion.div>
	);
};

export default AnimationLayout;
