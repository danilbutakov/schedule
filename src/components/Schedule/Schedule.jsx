import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import ScheduleInfo from '../ScheduleInfo/ScheduleInfo';

import styles from './Schedule.module.scss';
import '../../index.css';
import error from '../../assets/error.svg';
import errorKrest from '../../assets/errorKrest.svg';
import titleHeader from '../../assets/titleHeader.svg';

import ScheduleNavBar from './ScheduleNavBar';
import SchedulePairs from './SchedulePairs';
import AppContext from '../../Context';

const Schedule = () => {
	const { showInfo, showSchedule } = useContext(AppContext);

	return (
		<div className={styles.con}>
			<div className={styles.header}>
				<div className={styles.titleContainer}>
					<img src={titleHeader} alt='title' />
				</div>
			</div>
			<div className={styles.mainContentContainer}>
				<CSSTransition
					classNames='info'
					timeout={500}
					in={showInfo}
					mountOnEnter
					unmountOnExit>
					<div className={styles.info}>
						{showInfo ? <ScheduleInfo /> : ''}
					</div>
				</CSSTransition>
				<div className={styles.mainContent}>
					{showSchedule && <SchedulePairs />}
				</div>
			</div>
			<ScheduleNavBar />
		</div>
	);
};

export default Schedule;
