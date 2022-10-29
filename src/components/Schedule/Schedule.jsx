import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import ScheduleInfo from '../ScheduleInfo/ScheduleInfo';

import styles from './Schedule.module.scss';
import '../../index.css';
import error from '../../assets/error.svg';
import errorKrest from '../../assets/errorKrest.svg';
import titleHeader from '../../assets/titleHeader.svg';

import ScheduleNavBar from '../NavBar/ScheduleNavBar';
import SchedulePairs from './SchedulePairs';
import AppContext from '../../utils/Context';
import AnimationLayout from '../../animations/AnimationLayout';
import { AnimatePresence } from 'framer-motion';

const Schedule = () => {
	const [showInfo, setShowInfo] = useState(false);
	const [showSchedule, setShowSchedule] = useState(true);
	const [showSch, setShowSch] = useState(true);
	const [showPairs, setShowPairs] = useState(true);

	return (
		<AnimatePresence>
			{showSch && (
				<div className={styles.con}>
					<div className={styles.header}>
						<div className={styles.titleContainer}>
							<img src={titleHeader} alt='title' />
						</div>
					</div>
					<div className={styles.mainContentContainer}>
						<div className={styles.info}>
							{showInfo ? (
								<ScheduleInfo
									setShowPairs={setShowPairs}
									showPairs={showPairs}
									showInfo={showInfo}
									setShowInfo={setShowInfo}
								/>
							) : (
								<ScheduleInfo
									setShowPairs={setShowPairs}
									showPairs={showPairs}
									showInfo={showInfo}
									setShowInfo={setShowInfo}
								/>
							)}
						</div>
						<div className={styles.mainContent}>
							{showSchedule && (
								<SchedulePairs
									setShowPairs={setShowPairs}
									showPairs={showPairs}
									showInfo={showInfo}
									setShowInfo={setShowInfo}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Schedule;
