import {
	Dimensions,
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ScrollView,
	Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';

import Plus from '../../../assets/images/plus.svg';
import Minus from '../../../assets/images/minus.svg';
import Delete from '../../../assets/images/delete.svg';
import useAuth from '../../hooks/useAuth';

import { useDispatch, useSelector } from 'react-redux';

import {
	addNote,
	deleteFromDatabase,
	deleteNote,
	getNotes,
	writeToDatabase
} from '../../features/notes/notesSlice';
import { nanoid } from 'nanoid';

const { height } = Dimensions.get('screen');

const DismissKeyboardHOC = Comp => {
	return ({ children, ...props }) => (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<Comp {...props}>{children}</Comp>
		</TouchableWithoutFeedback>
	);
};
const DismissKeyboardView = DismissKeyboardHOC(View);

const PairInfo = () => {
	const user = useAuth();
	const dispatch = useDispatch();
	const { notes, status, error } = useSelector(state => state.notes);
	const clickedPair = useSelector(state => state.pair.clickedPair);

	const [showNotes, setShowNotes] = useState(false);
	const [note, setNote] = useState('');
	const createdAt = Date.now();
	const noteId = nanoid();

	//read from database
	useEffect(() => {
		dispatch(getNotes(clickedPair));
	}, [dispatch]);

	//write to database
	const handleAddNote = () => {
		try {
			dispatch(
				addNote({
					createdAt: createdAt,
					note: note,
					noteId: noteId,
					userUid: user.user.uid,
					clickedPair: clickedPair
				})
			);
			dispatch(
				writeToDatabase({
					createdAt,
					note,
					noteId,
					userUid: user.user.uid,
					clickedPair
				})
			);
		} catch (e) {
			console.error(e);
		} finally {
			setNote('');
			setShowNotes(false);
			dispatch(getNotes(clickedPair));
		}
	};

	console.log(notes);

	// delete note
	const handleDelete = async noteId => {
		try {
			dispatch(deleteNote(noteId));
			dispatch(deleteFromDatabase(noteId));
		} catch (e) {
			console.log(e.message);
		} finally {
			dispatch(getNotes(clickedPair));
		}
	};

	return (
		<DismissKeyboardView style={styles.containerKeyboard}>
			<View style={styles.infoCon}>
				<View style={styles.titles}>
					<Text style={styles.typeText}>
						{clickedPair.pair.type.toUpperCase()}
					</Text>
					<Text style={styles.nameText}>{clickedPair.pair.name}</Text>
				</View>
				<View style={styles.addInfoCon}>
					<View style={styles.inf}>
						<Text style={styles.infText}>
							{clickedPair.pair.dayOfWeek},{' '}
							{clickedPair.pair.date},{' '}
							{clickedPair.pair.timeStart}
							{' - '}
							{clickedPair.pair.timeEnd}
						</Text>
						<View style={styles.downLine}></View>
					</View>
					<View style={styles.downLine}></View>
					<View style={styles.inf}>
						<Text style={styles.infText}>
							{clickedPair.pair.classRoom}
						</Text>
						<View style={styles.downLine}></View>
					</View>
					<View style={styles.downLine}></View>
					<View style={styles.inf}>
						<Text style={styles.infText}>
							{clickedPair.pair.teacher}
						</Text>
					</View>
					<View style={styles.downLine}></View>
				</View>
				<View style={styles.notesContainer}>
					<View style={styles.notesTitle}>
						<Text style={styles.noteTitle}>ЗАМЕТКИ</Text>
						<TouchableOpacity
							onPress={() => setShowNotes(!showNotes)}>
							{!showNotes ? (
								<Plus width={20} height={20} />
							) : (
								<Minus width={20} height={20} />
							)}
						</TouchableOpacity>
					</View>
					{showNotes && (
						<View style={styles.addNote}>
							<TextInput
								placeholder='Введите текст'
								value={note}
								onChangeText={newNote => setNote(newNote)}
								style={styles.addNoteInput}
								maxLength={50}
								multiline={true}
								numberOfLines={2}
								keyboardType='text'
							/>
							<TouchableOpacity
								onPress={() => {
									if (note !== '' && note !== ' ') {
										handleAddNote();
									}
								}}>
								<View style={styles.noteBtn}>
									<Text style={styles.noteBtnText}>
										Добавить
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
					<View style={styles.downLine}></View>
				</View>
				{status !== 'rejected' && (
					<ScrollView style={{ flex: 1, marginBottom: 110 }}>
						{notes?.map((note, key) => (
							<View style={styles.addInfoConNotes} key={key}>
								<View style={styles.inf}>
									<Text style={styles.infText}>
										{note?.note}
									</Text>
									<TouchableOpacity
										onPress={() => {
											Alert.alert(
												'Удаление заметки',
												'Удалить заметку?',
												[
													{
														text: 'Отменить',
														onPress: () =>
															console.log(
																'Cancel Pressed'
															),
														style: 'cancel'
													},
													{
														text: 'Удалить',
														onPress: () => {
															handleDelete(
																note.noteId
															);
														}
													}
												]
											);
										}}>
										<Delete width={20} height={20} />
									</TouchableOpacity>
								</View>
								<View style={styles.downLine}></View>
							</View>
						))}
					</ScrollView>
				)}
				{status === 'rejected' && (
					<View>
						<Text>{error}</Text>
					</View>
				)}
			</View>
		</DismissKeyboardView>
	);
};

export default PairInfo;

const styles = StyleSheet.create({
	infoCon: {
		backgroundColor: '#F7F7F7',
		height,
		paddingTop: 15
	},
	titles: {
		marginBottom: 10,
		paddingLeft: 20
	},
	typeText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		marginBottom: 8
	},
	nameText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 24
	},
	addInfoCon: {
		backgroundColor: '#FFFFFF'
	},
	addInfoConNotes: {
		backgroundColor: '#FFFFFF'
	},
	inf: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	infText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 14,
		lineHeight: 18,
		color: '#1E1E1E',
		paddingVertical: 12,
		flex: 1
	},
	downLine: {
		borderBottomColor: 'rgba(60, 60, 67, 0.13)',
		borderBottomWidth: 1
	},
	notesContainer: {
		paddingTop: 10
	},
	notesTitle: {
		paddingLeft: 20,
		paddingRight: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: 12
	},
	noteTitle: {
		fontSize: 14,
		lineHeight: 16,
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93'
	},
	noteCon: {
		backgroundColor: ''
	},
	addNote: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		alignItems: 'center'
	},
	addNoteInput: {
		borderRadius: 16,
		backgroundColor: '#ffffff',
		paddingVertical: 13,
		paddingHorizontal: 18,
		fontSize: 13,
		lineHeight: 18,
		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowOffset: { width: 0, height: 4 },
		elevation: 6,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Regular',
		width: '100%'
	},
	noteBtn: {
		marginTop: 22
	},
	noteBtnText: {
		backgroundColor: '#1E1E1F',
		borderRadius: 16,
		padding: 15,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
		color: '#FFFFFF',
		fontFamily: 'Montserrat-SemiBold'
	}
});
