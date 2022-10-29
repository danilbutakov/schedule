import React, { useContext, useState } from 'react';

import styles from '../ScheduleInfo/ScheduleInfo.module.scss';

import AppContext from '../../Context';
import ProgressBarComponent from '../ProgressBar/ProgressBarComponent';

const AddNote = ({ show, setShow, showNotes, setShowNotes }) => {
	const {
		note,
		// setNote,
		showInfo,
		setShowInfo,
		setShowSchedule,
		pairActive,
		// addNote,
		// deleteNote,
		charLeft,
		handleNoteChange,
		writeToDataBase,
		notes,
		handleDelete,
		// onChangeSearchInput,
		searchValue,
	} = useContext(AppContext);

	return (
		<div className={styles.note}>
			<div className={styles.header}>
				<span
					className={styles.headerTitle}
					onClick={() => {
						setShow(!show);
						setShowNotes(!showNotes);
					}}>
					Отменить
				</span>
				<span className={styles.headerTitleNon}>Заметка</span>
				<span
					className={styles.headerTitle}
					onClick={() => {
						setShow(!show);
						writeToDataBase();
						setShowNotes(true);
					}}>
					Готово
				</span>
			</div>
			<div className={styles.underLine}></div>
			<div className={styles.noteInput}>
				<span className={styles.label}>{charLeft} left</span>
				<input
					onChange={handleNoteChange}
					value={note}
					className={styles.input}
					type='text'
					maxLength={100}
					placeholder='Введите текст'
				/>
				<ProgressBarComponent />
			</div>
		</div>
	);
};

export default AddNote;
