import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import notes from '../../assets/notes.svg';
import notesActive from '../../assets/notesActive.svg';
import schedule from '../../assets/schedule.svg';
import scheduleActive from '../../assets/scheduleActive.svg';
import lupa from '../../assets/lupa.svg';
import lupaActive from '../../assets/lupaActive.svg';
import menu from '../../assets/menu.svg';
import menuActive from '../../assets/menuActive.svg';

import styles from './ScheduleNavBar.module.scss';

const ScheduleNavBar = ({
	setShowSchedule,
	setShowMenu,
	showMenu,
	showSchedule,
}) => {
	const location = useLocation();

	return (
		<div className={styles.navBar}>
			<div className={styles.navItems}>
				<div className={styles.navItem}>
					<img
						width={25}
						height={25}
						src={location.pathname === '/notes' ? notesActive : notes}
						alt=''
					/>
				</div>

				<div
					onClick={() => {
						setShowSchedule(true);
						setShowMenu(false);
					}}
					className={styles.navItem}>
					<img
						width={25}
						height={25}
						src={showSchedule ? scheduleActive : schedule}
						alt=''
					/>
				</div>

				<div className={styles.navItem}>
					<img
						width={25}
						height={25}
						src={location.pathname === '/search' ? lupaActive : lupa}
						alt=''
					/>
				</div>

				<div
					className={styles.navItem}
					onClick={() => {
						setShowMenu(true);
						setShowSchedule(false);
					}}>
					<img
						width={25}
						height={25}
						src={showMenu ? menuActive : menu}
						alt='menu'
					/>
				</div>
			</div>
		</div>
	);
};

export default ScheduleNavBar;
