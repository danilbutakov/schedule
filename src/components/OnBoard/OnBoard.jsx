import React, { useState } from 'react';

import styles from './OnBoard.module.scss';
import '../../index.css';
import SwiperComponent from '../Swiper/SwiperComponent';
import { useNavigate } from 'react-router-dom';
import AnimationLayout from '../../animations/AnimationLayout';
import { AnimatePresence } from 'framer-motion';

const OnBoard = () => {
	const [showOnBoard, setShowOnBoard] = useState(true);
	const navigate = useNavigate();

	return (
		<AnimatePresence>
			{showOnBoard && (
				<AnimationLayout>
					<div className={styles.con}>
						<div className={styles.swiper}>
							<SwiperComponent />
						</div>
						<button
							onClick={() => {
								setShowOnBoard(false);
								setTimeout(() => {
									navigate('/auth');
								}, 300);
							}}
							className={styles.btn}>
							Войти
						</button>
					</div>
				</AnimationLayout>
			)}
		</AnimatePresence>
	);
};

export default OnBoard;
