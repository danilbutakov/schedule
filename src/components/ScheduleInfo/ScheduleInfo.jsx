import React, { useState, useEffect, useContext } from 'react';

import styles from './ScheduleInfo.module.scss';

import backIcon from '../../assets/backIcon.svg';
import plus from '../../assets/plus.svg';
import deleteBtn from '../../assets/delete-btn.svg';
import AppContext from '../../utils/Context';
import AddNote from '../AddNote/AddNote';
import AnimationSwipeUp from '../../animations/AnimationSwipeUp';
import { AnimatePresence } from 'framer-motion';

const ScheduleInfo = ({ setShowPairs, setShowInfo, showInfo }) => {
	const { pairActive, notes, handleDelete, setNotes } = useContext(AppContext);

	const [show, setShow] = useState(false);
	const [showNotes, setShowNotes] = useState(false);
	const [showNotesCon, setNotesShowCon] = useState(true);

	useEffect(() => {
		if (notes !== []) {
			setShowNotes(true);
		} else {
			setShowNotes(false);
		}
	}, [notes]);

	return (
		<AnimatePresence>
			{showInfo && (
				<AnimationSwipeUp>
					<div className={styles.infoContainer}>
						{show && (
							<AddNote
								show={show}
								setShow={setShow}
								showNotes={showNotes}
								setNotesShowCon={setNotesShowCon}
								setShowNotes={setShowNotes}
							/>
						)}

						{showNotesCon && (
							<AnimationSwipeUp>
								<div className={styles.iconCon}>
									<img
										className={styles.icon}
										onClick={() => {
											setShowInfo(false);
											setTimeout(() => {
												setShowPairs(true);
											}, 300);
										}}
										width={16}
										height={30}
										src={backIcon}
										alt='backIcon'
									/>
								</div>
								<div className={styles.mainContent}>
									<div className={styles.titles}>
										<span className={styles.type}>
											{pairActive.pair.type}
										</span>
										<span className={styles.name}>
											{pairActive.pair.name}
										</span>
									</div>
									<div className={styles.infContainer}>
										<div className={styles.inf}>
											<span className={styles.info}>
												{pairActive.pair.day},{' '}
												{pairActive.pair.time}
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
											<span className={styles.noteTitle}>
												Заметки
											</span>
											<img
												onClick={() => {
													setNotesShowCon(!showNotesCon);
													setTimeout(() => {
														setShow(!show);
													}, 50);
												}}
												className={styles.plus}
												src={plus}
												alt='plus'
											/>
										</div>
										{showNotes && (
											<div className={styles.infContainerLast}>
												{notes.map((note) =>
													note.univ || note.group ? null : (
														<div className={styles.inf}>
															<div
																className={
																	styles.infoContainerNotes
																}>
																<span className={styles.info}>
																	{note.note}
																</span>
																<div
																	onClick={() => {
																		if (
																			window.confirm(
																				'Удалить заметку ?',
																			)
																		) {
																			handleDelete(
																				note.uuid,
																			);
																		}
																	}}
																	className={styles.deleteCon}>
																	<img
																		src={deleteBtn}
																		alt='delete'
																	/>
																</div>
															</div>
															<div
																className={
																	styles.downLine
																}></div>
														</div>
													),
												)}
											</div>
										)}
									</div>
								</div>
							</AnimationSwipeUp>
						)}
					</div>
				</AnimationSwipeUp>
			)}
		</AnimatePresence>
	);
};

export default ScheduleInfo;
