import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ref, set, remove, onValue } from 'firebase/database';

import Plus from '../../../assets/images/plus.svg';
import Minus from '../../../assets/images/minus.svg';
import Delete from '../../../assets/images/delete.svg';
import AppContext from '../../utils/Context';
import useAuth from '../../hooks/useAuth';
import { db } from '../../../firebase';

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
	const { handleClickPair, notes, setNotes, setNotesDataScreen } =
		useContext(AppContext);

	const [showNotes, setShowNotes] = useState(false);
	const [showInfo, setShowInfo] = useState(true);

	const { user } = useAuth();

	const [note, setNote] = useState('');

	//for Notes

	//read from database
	useEffect(() => {
		if (user) {
			onValue(
				ref(
					db,
					'users/' +
						user.uid +
						'/' +
						'notes/' +
						handleClickPair.pair.date +
						'/' +
						handleClickPair.pair.dayOfWeek +
						'/' +
						handleClickPair.pair.type +
						'/' +
						handleClickPair.pair.name +
						'/' +
						handleClickPair.pair.group +
						` group/`
				),
				snapshot => {
					setNotes([]);
					setNotesDataScreen([]);
					const data = snapshot.val();
					if (data !== null) {
						Object.values(data).map(note => {
							setNotes(oldArray => [...oldArray, note]);
							setNotesDataScreen(oldArray => [...oldArray, note]);
						});
					}
				}
			);
		}
	}, []);

	const createdAt = Date.now();

	//write to database
	const writeToDataBase = () => {
		set(
			ref(
				db,
				'users/' +
					user.uid +
					'/' +
					'notes/' +
					handleClickPair.pair.date +
					'/' +
					handleClickPair.pair.dayOfWeek +
					'/' +
					handleClickPair.pair.type +
					'/' +
					handleClickPair.pair.name +
					'/' +
					handleClickPair.pair.group +
					` group/${createdAt}`
			),
			{
				date: handleClickPair.pair.date,
				createdAt: createdAt,
				noteData: {
					type: handleClickPair.pair.type,
					name: handleClickPair.pair.name,
					noteData1: {
						dayOfWeek: handleClickPair.pair.dayOfWeek,
						note,
						group: handleClickPair.pair.group
					}
				}
			}
		);

		//clear the input
		setNote('');
	};

	// delete from note from database
	const handleDelete = createdAt => {
		remove(
			ref(
				db,
				'users/' +
					user.uid +
					'/' +
					'notes/' +
					handleClickPair.pair.date +
					'/' +
					handleClickPair.pair.dayOfWeek +
					'/' +
					handleClickPair.pair.type +
					'/' +
					handleClickPair.pair.name +
					'/' +
					handleClickPair.pair.group +
					` group/${createdAt}`
			)
		);
	};

	//Обработчик появления и исчезания клавиатуры
	const [isOpenedKeyboard, setIsOpenKeyboard] = useState(false);

	const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
		setIsOpenKeyboard(true);
	});
	const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
		setIsOpenKeyboard(false);
	});

	return (
		<DismissKeyboardView style={styles.containerKeyboard}>
			<View style={styles.infoCon}>
				<View style={styles.titles}>
					<Text style={styles.typeText}>
						{handleClickPair.pair.type.toUpperCase()}
					</Text>
					<Text style={styles.nameText}>{handleClickPair.pair.name}</Text>
				</View>
				<View style={styles.addInfoCon}>
					<View style={styles.inf}>
						<Text style={styles.infText}>
							{handleClickPair.pair.dayOfWeek}, {handleClickPair.pair.date},{' '}
							{handleClickPair.pair.timeStart}
							{' - '}
							{handleClickPair.pair.timeEnd}
						</Text>
						<View style={styles.downLine}></View>
					</View>
					<View style={styles.downLine}></View>
					<View style={styles.inf}>
						<Text style={styles.infText}>{handleClickPair.pair.classRoom}</Text>
						<View style={styles.downLine}></View>
					</View>
					<View style={styles.downLine}></View>
					<View style={styles.inf}>
						<Text style={styles.infText}>{handleClickPair.pair.teacher}</Text>
					</View>
					<View style={styles.downLine}></View>
				</View>
				<View style={styles.notesContainer}>
					<View style={styles.notesTitle}>
						<Text style={styles.noteTitle}>ЗАМЕТКИ</Text>
						<TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
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
										writeToDataBase();
									}
								}}>
								<View style={styles.noteBtn}>
									<Text style={styles.noteBtnText}>Добавить</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
					<View style={styles.downLine}></View>
				</View>
				{showInfo && (
					<ScrollView style={{ flex: 1, marginBottom: 110 }}>
						{notes.map((note, key) => (
							<View style={styles.addInfoConNotes} key={key}>
								<View style={styles.inf}>
									<Text style={styles.infText}>
										{note.noteData.noteData1.note}
									</Text>
									<TouchableOpacity
										onPress={() => {
											Alert.alert('Удаление заметки', 'Удалить заметку?', [
												{
													text: 'Отменить',
													onPress: () => console.log('Cancel Pressed'),
													style: 'cancel'
												},
												{
													text: 'Удалить',
													onPress: () => {
														handleDelete(note.createdAt);
													}
												}
											]);
										}}>
										<Delete width={20} height={20} />
									</TouchableOpacity>
								</View>
								<View style={styles.downLine}></View>
							</View>
						))}
					</ScrollView>
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
