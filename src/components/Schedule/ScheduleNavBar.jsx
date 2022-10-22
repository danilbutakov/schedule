import React from 'react';
import { Link } from 'react-router-dom';

import portfel from '../../assets/portfel.svg';
import lupa from '../../assets/lupa.svg';
import profile from '../../assets/profile.svg';

import styles from './ScheduleNavBar.module.scss';

const ScheduleNavBar = () => {
	return (
		<div>
			<div className={styles.navBar}>
				<div className={styles.navItems}>
					<Link to={'/schedule'}>
						<div className={styles.navItem}>
							<img
								className={styles.navBarImg}
								width={30}
								height={30}
								src={portfel}
								alt=''
							/>
							<span className={styles.navBarActive}>Расписание</span>
						</div>
					</Link>
					<div className={styles.navItem}>
						<img
							className={styles.navBarImg}
							width={30}
							height={30}
							src={lupa}
							alt=''
						/>
						<span className={styles.navBarSpan}>Поиск</span>
					</div>
					<div className={styles.navItem}>
						<img
							className={styles.navBarImg}
							width={30}
							height={30}
							src={profile}
							alt=''
						/>
						<span className={styles.navBarSpan}>Профиль</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScheduleNavBar;
