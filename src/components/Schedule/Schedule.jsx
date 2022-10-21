import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Schedule.module.scss';
import calendar from '../../assets/calendar.svg';
import portfel from '../../assets/portfel.svg';
import lupa from '../../assets/lupa.svg';
import profile from '../../assets/profile.svg';
import { Link } from 'react-router-dom';

const Schedule = () => {
	const [showSchedule, setShowSchedule] = useState(true);
	const pairs = [
		{
			day: 'Понедельник 1 сентября',
			timeStart: '08:30',
			timeFinish: '10:00',
			type: 'Лекция',
			name: 'Информационные технологии в PreMedia',
			classRoom: 'Ауд. 2-210, пр. Мира, д. 11, корп. 2',
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '10:10',
			timeFinish: '11:40',
			type: 'Лабораторные работы',
			name: 'Безопасность жизнедеятельности',
			classRoom: 'Ауд. 6-420, пр. Мира, д. 11, корп. 6',
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '12:10',
			timeFinish: '13:40',
			type: 'Лабораторные работы',
			name: 'Информационные технологии в PreMedia',
			classRoom: 'Ауд. 2-214, пр. Мира, д. 11, корп. 2',
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '13:50',
			timeFinish: '15:20',
			type: 'Лекция',
			name: 'Безопасность жизнедеятельности',
			classRoom: 'Ауд. 2-210, пр. Мира, д. 11, корп. 2',
		},
	];

	return (
		<>
			<CSSTransition
				classNames={{
					enter: styles.enter,
					enterDone: styles.enterActive,
					exit: styles.exit,
					exitActive: styles.exitActive,
				}}
				in={showSchedule}
				timeout={300}
				unmountOnExit>
				<div className={styles.con}>
					<div className={styles.header}>
						<div className={styles.titleContainer}>
							<h1 className={styles.title}>Расписание</h1>
						</div>
						<div className={styles.calendarSchedule}>
							<img src={calendar} alt='calendar' />
						</div>
					</div>
					<div className={styles.upLine}></div>
					<div className={styles.mainContent}>
						<h2 className={styles.headline}>Понедельник 14 Мая</h2>
						{pairs.map((pair, index) => (
							<div key={index} className={styles.pairsContainer}>
								<div className={styles.pair}>
									<div className={styles.time}>
										<span className={styles.start}>
											{pair.timeStart}
										</span>
										<span className={styles.finish}>
											{pair.timeFinish}
										</span>
									</div>
									<div className={styles.infoPair}>
										<div className={styles.typePair}>{pair.type}</div>
										<div className={styles.namePair}>{pair.name}</div>
										<div className={styles.classRoomPair}>
											{pair.classRoom}
										</div>
									</div>
								</div>
							</div>
						))}
						<Link to={'/'}>
							<button className={styles.btn}>Выйти</button>
						</Link>
					</div>
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
			</CSSTransition>
		</>
	);
};

export default Schedule;
