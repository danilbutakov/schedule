import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

import styles from '../ScheduleInfo/ScheduleInfo.module.scss';

import AppContext from '../../utils/Context';
import ProgressBarComponent from '../ProgressBar/ProgressBarComponent';
import { AnimatePresence } from 'framer-motion';
import AnimationSwipeUp from '../../animations/AnimationSwipeUp';

const AddNote = ({ setShow, showNotes, setShowNotes, setNotesShowCon }) => {
	const { note, charLeft, handleNoteChange, writeToDataBase } =
		useContext(AppContext);
	const [showAdd, setShowAdd] = useState(true);
	const [user, loading] = useAuthState(auth);

	return (
		<AnimatePresence>
			{showAdd && (
				<AnimationSwipeUp>
					<div className={styles.note}>
						<div className={styles.header}>
							<span
								className={styles.headerTitle}
								onClick={() => {
									setShowAdd(false);
									setTimeout(() => {
										setNotesShowCon(true);
										setShow(false);
									}, 300);
									setShowNotes(showNotes);
								}}>
								Отменить
							</span>
							<span className={styles.headerTitleNon}>Заметка</span>
							<span
								className={styles.headerTitle}
								onClick={() => {
									setShowAdd(false);
									writeToDataBase();
									setTimeout(() => {
										setNotesShowCon(true);
										setShowNotes(true);
										setShow(false);
									}, 300);
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
				</AnimationSwipeUp>
			)}
		</AnimatePresence>
	);
};

export default AddNote;
