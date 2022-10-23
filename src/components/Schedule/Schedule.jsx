import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Schedule.module.scss';
import calendar from '../../assets/calendar.svg';

import ScheduleNavBar from './ScheduleNavBar';
import ScheduleInfo from '../ScheduleInfo/ScheduleInfo';
import { SchedulePairs } from './SchedulePairs';

const Schedule = () => {
	const [showSchedule, setShowSchedule] = useState(true);
	const [showInfo, setShowInfo] = useState(false);

	return (
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
			<CSSTransition
				classNames={{
					enter: styles.enter,
					enterDone: styles.enterActive,
					exit: styles.exit,
					exitActive: styles.exitActive,
				}}
				in={showSchedule}
				timeout={100}>
				<div className={styles.mainContent}>
					{showSchedule && <SchedulePairs />}
					{showInfo && <ScheduleInfo />}
				</div>
			</CSSTransition>
			<ScheduleNavBar />
		</div>
	);
};

export default Schedule;
