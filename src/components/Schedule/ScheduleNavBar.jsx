import React from 'react';
import { Link } from 'react-router-dom';

import notes from '../../assets/notes.svg';
import schedule from '../../assets/schedule.svg';
import lupa from '../../assets/lupa.svg';
import menu from '../../assets/menu.svg';

import styles from './ScheduleNavBar.module.scss';

const ScheduleNavBar = () => {
	return (
		<div className={styles.navBar}>
			<div className={styles.navItems}>
				<div className={styles.navItem}>
					<img
						className={styles.navBarImg}
						width={28}
						height={28}
						src={notes}
						alt=''
					/>
					<span className={styles.navBarSpan}>Заметки</span>
				</div>

				<Link to={'/schedule'}>
					<div className={styles.navItem}>
						<img
							className={styles.navBarImgActive}
							width={28}
							height={28}
							src={schedule}
							alt=''
						/>
						<span className={styles.navBarActive}>Расписание</span>
					</div>
				</Link>
				<div className={styles.navItem}>
					<img
						className={styles.navBarImg}
						width={28}
						height={28}
						src={lupa}
						alt=''
					/>
					<span className={styles.navBarSpan}>Поиск</span>
				</div>
				<Link to={'/menu'}>
					<div className={styles.navItem}>
						<img
							className={styles.navBarImg}
							width={28}
							height={28}
							src={menu}
							alt=''
						/>
						<span className={styles.navBarSpan}>Меню</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ScheduleNavBar;
