import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './ScheduleInfo.module.scss';

import backIcon from '../../assets/backIcon.svg';
import plus from '../../assets/plus.svg';
import deleteBtn from '../../assets/delete-btn.svg';
import AppContext from '../../Context';
import AddNote from '../AddNote/AddNote';

const ScheduleInfo = () => {
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

	const [show, setShow] = useState(false);
	const [showNotes, setShowNotes] = useState(true);
	const [showDelete, setShowDelete] = useState(false);

	const showingNotes = () => {
		if (note) {
			setShowNotes(true);
		} else {
			setShowNotes(false);
		}
	};

	//apply the save and get functions using useEffect
	//get the saved notes and add them to the array
	// useEffect(() => {
	// 	const data = JSON.parse(localStorage.getItem('Notes'));
	// 	if (data) {
	// 		setNotes(data);
	// 	}
	// 	console.log(notes);
	// }, []);

	//saving data to local storage
	// useEffect(() => {
	// 	localStorage.setItem('Notes', JSON.stringify(notes));
	// 	console.log(notes);
	// }, [notes]);

	return (
		<div className={styles.infoContainer}>
			{show && (
				<AddNote
					show={show}
					setShow={setShow}
					showNotes={showNotes}
					setShowNotes={setShowNotes}
				/>
			)}
			{showNotes && (
				<>
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
								<span className={styles.info}>
									{pairActive.pair.teacher}
								</span>
								<div className={styles.downLine}></div>
							</div>
						</div>
						<div className={styles.notesContainer}>
							<div className={styles.notesTitle}>
								<span className={styles.noteTitle}>Заметки</span>
								<img
									onClick={() => {
										setShow(!show);
										setShowNotes(!showNotes);
									}}
									className={styles.plus}
									src={plus}
									alt='plus'
								/>
							</div>

							{showingNotes && (
								<div className={styles.infContainerLast}>
									{notes.map((note) => (
										<div className={styles.inf}>
											<div className={styles.infoContainerNotes}>
												<span className={styles.info}>
													{note.note}
												</span>
												<div
													onClick={() => {
														if (
															window.confirm(
																'Ты хочешь удалить заметку',
															)
														) {
															handleDelete(note);
														}
													}}
													className={styles.deleteCon}>
													<img src={deleteBtn} alt='delete' />
												</div>
											</div>
											<div className={styles.downLine}></div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ScheduleInfo;
