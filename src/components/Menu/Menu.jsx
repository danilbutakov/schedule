import React from 'react';
import { Link } from 'react-router-dom';

import ScheduleNavBar from '../Schedule/ScheduleNavBar';
import styles from '../ScheduleInfo/ScheduleInfo.module.scss';

const Menu = () => {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.header}>
				<div className={styles.headContainer}>
					<div className={styles.title}></div>
					<h2>Меню</h2>
				</div>
			</div>

			<div className={styles.upLine}></div>

			<div className={styles.mainContent}>
				<span>Профиль</span>
				<Link to={'/'}>
					<span>Выйти</span>
				</Link>
			</div>
			<ScheduleNavBar />
		</div>
	);
};

export default Menu;
