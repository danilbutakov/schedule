import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import notes from '../../assets/notes.svg';
import notesActive from '../../assets/notesActive.svg';
import schedule from '../../assets/schedule.svg';
import scheduleActive from '../../assets/scheduleActive.svg';
import lupa from '../../assets/lupa.svg';
import lupaActive from '../../assets/lupaActive.svg';
import menu from '../../assets/menu.svg';
import menuActive from '../../assets/menuActive.svg';

import styles from './ScheduleNavBar.module.scss';

const ScheduleNavBar = () => {
	const [active, setActive] = useState(styles.navBarActive);
	const [hidden, setHidden] = useState(styles.navBarSpan);

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
					<span
						className={location.pathname === '/notes' ? active : hidden}>
						Заметки
					</span>
				</div>

				<Link to={'/home'}>
					<div className={styles.navItem}>
						<img
							width={25}
							height={25}
							src={
								location.pathname === '/schedule'
									? scheduleActive
									: schedule
							}
							alt=''
						/>
						<span
							className={
								location.pathname === '/home' ? active : hidden
							}>
							Расписание
						</span>
					</div>
				</Link>
				<Link to={'/search'}>
					<div className={styles.navItem}>
						<img
							width={25}
							height={25}
							src={location.pathname === '/search' ? lupaActive : lupa}
							alt=''
						/>
						<span
							className={
								location.pathname === '/search' ? active : hidden
							}>
							Поиск
						</span>
					</div>
				</Link>
				<Link to={'/menu'}>
					<div className={styles.navItem}>
						<img
							width={25}
							height={25}
							src={location.pathname === '/menu' ? menuActive : menu}
							alt=''
						/>
						<span
							className={
								location.pathname === '/menu' ? active : hidden
							}>
							Меню
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ScheduleNavBar;
