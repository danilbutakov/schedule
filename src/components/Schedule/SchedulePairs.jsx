import React, { useState, useEffect, useRef, useContext } from 'react';

import styles from './Schedule.module.scss';
import { pairs } from '../../utils/Pairs';
import AppContext from '../../utils/Context';
import AnimationLayout from '../../animations/AnimationLayout';
import { AnimatePresence } from 'framer-motion';

const SchedulePairs = ({ showPairs, setShowPairs, setShowInfo, showInfo }) => {
	const { setPair } = useContext(AppContext);

	/**
	 * @param {string} start
	 * @param {string} end
	 */

	// function checkDate(start, end) {
	// 	const now = new Date();
	// 	const h = now.getHours();
	// 	const m = now.getMinutes();
	// 	const startTime = start.split(':').map((i) => Number(i));
	// 	if (startTime[0] > h) return styles.inactive;
	// 	if (startTime[1] > h) return styles.inactive;
	// 	if (startTime[2] > h) return styles.inactive;
	// 	if (startTime[3] > h) return styles.inactive;
	// 	if (startTime[4] > h) return styles.inactive;
	// 	if (startTime[5] > h) return styles.inactive;
	// 	if (startTime[6] > h) return styles.inactive;
	// 	const endTime = end.split(':').map((i) => Number(i));
	// 	if (endTime[0] <= h) {
	// 		if (startTime[1] < m) return styles.inactive;
	// 		if (startTime[1] >= m && endTime[1] <= m) return styles.active;
	// 	}
	// 	if (endTime[1] <= h) {
	// 		if (startTime[2] < m) return styles.inactive;
	// 		if (startTime[2] >= m && endTime[2] <= m) return styles.active;
	// 	}
	// 	if (endTime[2] <= h) {
	// 		if (startTime[3] < m) return styles.inactive;
	// 		if (startTime[3] >= m && endTime[3] <= m) return styles.active;
	// 	}
	// 	if (endTime[3] <= h) {
	// 		if (startTime[4] < m) return styles.inactive;
	// 		if (startTime[4] >= m && endTime[4] <= m) return styles.active;
	// 	}
	// 	if (endTime[4] <= h) {
	// 		if (startTime[5] < m) return styles.inactive;
	// 		if (startTime[5] >= m && endTime[5] <= m) return styles.active;
	// 	}
	// 	if (endTime[5] <= h) {
	// 		if (startTime[6] < m) return styles.inactive;
	// 		if (startTime[6] >= m && endTime[6] <= m) return styles.active;
	// 	}

	// 	return styles.active;
	// }

	let sch = useRef(null);

	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.scrollY;
		sch = window.scrollY;
		if (showInfo) {
			if (sch > 0) {
				sch = window.scrollTo(0, 0);
			}
		}

		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<AnimatePresence>
			{showPairs && (
				<AnimationLayout>
					<div className={styles.mainContentContainer}>
						{pairs.map((pair, index) => (
							<div
								onClick={() => {
									handleScroll();
									setShowPairs(false);
									setTimeout(() => {
										setShowInfo(true);
									}, 300);
									setPair({ index, pair });
								}}
								key={index}
								className={styles.pairsContainer}>
								<div className={styles.pair}>
									<div className={styles.headPair}>
										<div className={styles.headLeft}>
											<div key={index} className={styles.inactive}>
												{index + 1}
											</div>
											<h3 className={styles.type}>{pair.type}</h3>
										</div>
										<span className={styles.time}>
											{pair.timeStart} - {pair.timeEnd}
										</span>
									</div>
									<div className={styles.infoPair}>
										<div className={styles.namePair}>{pair.name}</div>
										<div className={styles.teachPair}>
											{pair.teacher}
										</div>
										<div className={styles.classRoomPair}>
											{pair.classRoom}
										</div>
										<div className={styles.groupPair}>
											{pair.group} подгруппа
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</AnimationLayout>
			)}
		</AnimatePresence>
	);
};

export default SchedulePairs;
