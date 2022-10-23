import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ScheduleInfo.module.scss';
import ScheduleNavBar from '../Schedule/ScheduleNavBar';

import backIcon from '../../assets/backIcon.svg';

const ScheduleInfo = () => {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.header}>
				<Link to={'/schedule'}>
					<div className={styles.headContainer}>
						<div className={styles.title}>
							<img
								width={18}
								height={24}
								src={backIcon}
								alt='backIcon'
							/>
						</div>
						<h2>Расписание</h2>
					</div>
				</Link>
			</div>

			<div className={styles.upLine}></div>

			<div className={styles.mainContent}>
				<h3 className={styles.type}>Лекция</h3>
				<h1 className={styles.name}>
					Информационные технологии в PreMedia
				</h1>
				<div className={styles.infoPair}>
					<span className={styles.day}>Понедельник,</span>
					<span className={styles.date}>18 мая,</span>
					<span className={styles.time}>08:30-10:00</span>
				</div>
				<div className={styles.node}>
					<span className={styles.nodeTitle}>Заметки</span>
					<div className={styles.nodeInfo}>
						Сдать до 1 июня ЛР-1, ЛР-2, ЛР-5
					</div>
					<div className={styles.addNode}>
						<span>Добавить заметку</span>
						<img width={18} height={18} src={backIcon} alt='backIcon' />
					</div>
				</div>
			</div>
			<ScheduleNavBar />
		</div>
	);
};

export default ScheduleInfo;
