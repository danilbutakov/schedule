import React from 'react';

import portfel from '../../assets/portfel.svg';
import lupa from '../../assets/lupa.svg';
import profile from '../../assets/profile.svg';

import styles from './ScheduleNavBar.module.scss';

const ScheduleNavBar = () => {
	return (
		<div>
			<div className={styles.navBar}>
				<div className={styles.navItems}>
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
