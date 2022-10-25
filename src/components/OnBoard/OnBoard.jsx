import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './OnBoard.module.scss';
import '../../index.css';
import SwiperComponent from '../Swiper/SwiperComponent';
import { Link } from 'react-router-dom';

const OnBoard = () => {
	const [showLogin, setShowLogin] = useState(false);
	const [showSwiper, setShowSwiper] = useState(true);

	return (
		<div className={styles.con}>
			<div className={styles.swiper}>
				<SwiperComponent />
			</div>
			<Link to={'/login'}>
				<button className={styles.btn}>Войти</button>
			</Link>
		</div>
	);
};

export default OnBoard;
