import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Schedule.module.scss';

export const SchedulePairs = () => {
	const pairs = [
		{
			day: 'Понедельник 1 сентября',
			timeStart: '08:30',
			timeEnd: '10:00',
			time: '08:30-10:00',
			type: 'Лабораторная',
			name: 'Программирование',
			teacher: 'Замятин В.М.',
			classRoom: 'Д-508',
			group: 1,
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '10:10',
			timeEnd: '11:40',
			type: 'Лекция',
			name: 'Программирование',
			teacher: 'Димов А.В.',
			classRoom: 'Д-521',
			group: 1,
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '12:10',
			timeEnd: '13:40',
			type: 'Практика',
			name: 'ООП',
			teacher: 'Молчанова Е.И.',
			classRoom: 'Д-518',
			group: 1,
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '13:50',
			timeEnd: '15:20',
			type: 'Лабораторная',
			name: 'ООП',
			teacher: 'Молчанова Е.И.',
			classRoom: 'Д-501',
			group: 2,
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '15:30',
			timeEnd: '17:00',
			type: 'Лабораторная',
			name: 'Программирование',
			classRoom: 'Д-508',
			teacher: 'Замятин В.М.',
			group: 2,
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '17:10',
			timeEnd: '18:40',
			type: 'Практика',
			name: 'ООП',
			teacher: 'Молчанова Е.И.',
			classRoom: 'Д-501',
			group: 2,
		},
	];

	const [showSchedule, setShowSchedule] = useState(true);
	const [showInfo, setShowInfo] = useState(false);
	const [currentPair, setCurrentPair] = useState(false);

	// const Data = new Date();
	// const Hour = Data.getHours();
	// const Minutes = Data.getMinutes();
	// const currentData = Hour * 60 + Minutes;

	/**
	 * @param {string} start
	 * @param {string} end
	 */
	function checkDate(start, end) {
		const now = new Date();
		const h = now.getHours();
		const m = now.getMinutes();
		const startTime = start.split(':').map((i) => Number(i));
		if (startTime[0] > h) return styles.inactive;
		if (startTime[1] > h) return styles.inactive;
		if (startTime[2] > h) return styles.inactive;
		if (startTime[3] > h) return styles.inactive;
		if (startTime[4] > h) return styles.inactive;
		if (startTime[5] > h) return styles.inactive;
		if (startTime[6] > h) return styles.inactive;
		const endTime = end.split(':').map((i) => Number(i));
		if (endTime[0] <= h) {
			if (startTime[1] < m) return styles.inactive;
			if (startTime[1] >= m && endTime[1] <= m) return styles.active;
		}
		if (endTime[1] <= h) {
			if (startTime[2] < m) return styles.inactive;
			if (startTime[2] >= m && endTime[2] <= m) return styles.active;
		}
		if (endTime[2] <= h) {
			if (startTime[3] < m) return styles.inactive;
			if (startTime[3] >= m && endTime[3] <= m) return styles.active;
		}
		if (endTime[3] <= h) {
			if (startTime[4] < m) return styles.inactive;
			if (startTime[4] >= m && endTime[4] <= m) return styles.active;
		}
		if (endTime[4] <= h) {
			if (startTime[5] < m) return styles.inactive;
			if (startTime[5] >= m && endTime[5] <= m) return styles.active;
		}
		if (endTime[5] <= h) {
			if (startTime[6] < m) return styles.inactive;
			if (startTime[6] >= m && endTime[6] <= m) return styles.active;
		}

		return styles.active;
	}

	// useEffect(() => {
	// 	pairs.forEach((pair) => {
	// 		const pairStartHour = pair.timeStart[0] + pair.timeStart[1];
	// 		const pairStartMinutes = pair.timeStart[3] + pair.timeStart[4];

	// 		const pairEndHour = pair.timeEnd[0] + pair.timeEnd[1];
	// 		const pairEndMinutes = pair.timeEnd[3] + pair.timeEnd[4];

	// 		const pairTimeStart =
	// 			Number(pairStartHour) * 60 + Number(pairStartMinutes);

	// 		const pairTimeEnd = Number(pairEndHour) * 60 + Number(pairEndMinutes);

	// 		console.log(pairTimeStart);
	// 		console.log(pairTimeEnd);
	// 		console.log(currentData);

	// 		if (pairTimeStart <= currentData) {
	// 			setCurrentPair(true);
	// 		} else {
	// 			setCurrentPair(false);
	// 		}
	// 	});
	// }, []);

	return (
		<div className={styles.mainContentContainer}>
			{pairs.map((pair, index) => (
				<div key={index} className={styles.pairsContainer}>
					<Link to={'/scheduleInfo:id' + index}>
						<div
							onClick={() => {
								setShowSchedule(false);
								setShowInfo(true);
							}}
							className={styles.pair}>
							<div className={styles.headPair}>
								<div className={styles.headLeft}>
									<div
										key={index}
										className={checkDate(
											pair.timeStart,
											pair.timeEnd,
										)}>
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
								<div className={styles.teachPair}>{pair.teacher}</div>
								<div className={styles.classRoomPair}>
									{pair.classRoom}
								</div>
								<div className={styles.groupPair}>
									{pair.group} подгруппа
								</div>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
};
