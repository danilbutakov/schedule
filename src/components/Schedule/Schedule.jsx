import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import ScheduleInfo from '../ScheduleInfo/ScheduleInfo';

import styles from './Schedule.module.scss';
import '../../index.css';
import error from '../../assets/error.svg';
import errorKrest from '../../assets/errorKrest.svg';

import ScheduleNavBar from './ScheduleNavBar';
import SchedulePairs from './SchedulePairs';
import AppContext from '../../Context';

const Schedule = () => {
	const { showInfo, showSchedule } = useContext(AppContext);

	return (
		<div className={styles.con}>
			<div className={styles.header}>
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>SCHEDULE</h1>
				</div>
			</div>
			<div className={styles.upLine}></div>

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

					{/* {showError ? (
						<div className={styles.error}>
							<div className={styles.errorLeft}>
								<img src={error} alt='error' />
								<span className={styles.errorSpan}>
									Ошибка в расписании? <br />
									Напишите нам{' '}
								</span>
							</div>
							<div className={styles.errorRight}>
								<img
									onClick={() => setShowError(!showError)}
									className={styles.errorKrest}
									src={errorKrest}
									alt='errorKrest'
								/>
							</div>
						</div>
					) : (
						''
					)} */}
				</div>
			</div>
			<ScheduleNavBar />
		</div>
	);
};

export default Schedule;
