import React, { useRef } from 'react';

import styles from './ScheduleInfo.module.scss';

import backIcon from '../../assets/backIcon.svg';

const ScheduleInfo = ({
	setShowInfo,
	showInfo,
	pairActive,
	setShowSchedule,
}) => {
	return (
		<div className={styles.infoContainer}>
			<img
				className={styles.icon}
				onClick={() => {
					setShowInfo(!showInfo);
					setShowSchedule(true);
				}}
				width={16}
				height={30}
				src={backIcon}
				alt='backIcon'
			/>
			<div className={styles.mainContent}>
				<div className={styles.titles}>
					<span className={styles.type}>{pairActive.pair.type}</span>
					<span className={styles.name}>{pairActive.pair.name}</span>
				</div>
				<div className={styles.infContainer}>
					<div className={styles.inf}>
						<span className={styles.info}>
							{pairActive.pair.day}, {pairActive.pair.time}
						</span>
						<div className={styles.downLine}></div>
					</div>
					<div className={styles.inf}>
						<span className={styles.info}>
							{pairActive.pair.classRoom}
						</span>
						<div className={styles.downLine}></div>
					</div>
					<div className={styles.inf}>
						<span className={styles.info}>{pairActive.pair.teacher}</span>
						<div className={styles.downLine}></div>
					</div>
				</div>
				<div className={styles.notesContainer}>
					<div className={styles.notesTitle}>
						<span className={styles.noteTitle}>Заметки</span>
					</div>
					<div className={styles.infContainerLast}>
						<div className={styles.inf}>
							<span className={styles.info}>
								Разработать алгоритм для решения задачи №2
							</span>
							<div className={styles.downLine}></div>
						</div>
						<div className={styles.inf}>
							<span className={styles.info}>Дописать конспект</span>
							<div className={styles.downLine}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScheduleInfo;
