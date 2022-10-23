import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Schedule.module.scss';

export const SchedulePairs = () => {
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
		{
			day: 'Понедельник 1 сентября',
			timeStart: '13:50',
			timeFinish: '15:20',
			type: 'Лекция',
			name: 'Безопасность жизнедеятельности',
			classRoom: 'Ауд. 2-210, пр. Мира, д. 11, корп. 2',
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '13:50',
			timeFinish: '15:20',
			type: 'Лекция',
			name: 'Безопасность жизнедеятельности',
			classRoom: 'Ауд. 2-210, пр. Мира, д. 11, корп. 2',
		},
		{
			day: 'Понедельник 1 сентября',
			timeStart: '13:50',
			timeFinish: '15:20',
			type: 'Лекция',
			name: 'Безопасность жизнедеятельности',
			classRoom: 'Ауд. 2-210, пр. Мира, д. 11, корп. 2',
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

	const [showSchedule, setShowSchedule] = useState(true);
	const [showInfo, setShowInfo] = useState(false);

	return (
		<div className={styles.mainContentContainer}>
			<h2 className={styles.headline}>Понедельник 14 Мая</h2>
			{pairs.map((pair, index) => (
				<div key={index} className={styles.pairsContainer}>
					<Link to={'/scheduleInfo:id' + index}>
						<div
							onClick={() => {
								setShowSchedule(false);
								setShowInfo(true);
							}}
							className={styles.pair}>
							<div className={styles.time}>
								<span className={styles.start}>{pair.timeStart}</span>
								<span className={styles.finish}>{pair.timeFinish}</span>
							</div>
							<div className={styles.infoPair}>
								<div className={styles.typePair}>{pair.type}</div>
								<div className={styles.namePair}>{pair.name}</div>
								<div className={styles.classRoomPair}>
									{pair.classRoom}
								</div>
							</div>
						</div>
					</Link>
				</div>
			))}
			<Link to={'/'}>
				<button className={styles.btn}>Выйти</button>
			</Link>
		</div>
	);
};
