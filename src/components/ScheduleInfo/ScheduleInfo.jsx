import React, { useState, useEffect } from 'react';

import styles from './ScheduleInfo.module.scss';

import backIcon from '../../assets/backIcon.svg';
import plus from '../../assets/plus.svg';

const ScheduleInfo = ({
	setShowInfo,
	showInfo,
	pairActive,
	setShowSchedule,
	notes,
	setNotes,
	addNote,
	onChangeSearchInput,
	searchValue,
	charLeft,
}) => {
	const [show, setShow] = useState(false);
	const [showNotes, setShowNotes] = useState(false);

	const showingNotes = () => {
		if (notes) {
			setShowNotes(true);
		} else {
			setShowNotes(false);
		}
	};

	//apply the save and get functions using useEffect
	//get the saved notes and add them to the array
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('Notes'));
		if (data) {
			setNotes(data);
		}
		console.log(notes);
	}, []);

	//saving data to local storage
	useEffect(() => {
		localStorage.setItem('Notes', JSON.stringify(notes));
		console.log(notes);
	}, [notes]);

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
						<img
							onClick={() => setShow(!show)}
							className={styles.plus}
							src={plus}
							alt='plus'
						/>
					</div>
					{showingNotes && (
						<div className={styles.infContainerLast}>
							{notes.map((note) => (
								<div key={note.id} id={note.id} className={styles.inf}>
									<span className={styles.info}>{note.text}</span>
									<div className={styles.downLine}></div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			{show && (
				<div className={styles.note}>
					<div className={styles.header}>
						<span
							className={styles.headerTitle}
							onClick={() => {
								setShow(!show);
							}}>
							Отменить
						</span>
						<span className={styles.headerTitleNon}>Заметка</span>
						<span
							className={styles.headerTitle}
							onClick={() => {
								setShow(!show);
								addNote();
								setShowNotes(true);
							}}>
							Готово
						</span>
					</div>
					<div className={styles.underLine}></div>
					<div className={styles.noteInput}>
						<span className={styles.label}>{charLeft} left</span>
						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							className={styles.input}
							type='text'
							placeholder='Введите текст'
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ScheduleInfo;
