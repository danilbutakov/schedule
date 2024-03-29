import {
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @ts-ignore
import Plus from '../../../assets/images/plus.svg';
// @ts-ignore
import Minus from '../../../assets/images/minus.svg';
import useAuth from '../../hooks/useAuth';

import {
	addNote,
	getNotes,
	writeToDatabase
} from '../../store/slices/notesSlice';
import { nanoid } from 'nanoid';
import { FlashList } from '@shopify/flash-list';
import Note from '../../components/Notes/Note';
import { useTheme } from '@react-navigation/native';
import { PreferencesContext } from '../../utils/PreferencesContext';

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

	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	// @ts-ignore
	const { notes, status, error } = useSelector(state => state.notes);
	// @ts-ignore
	const clickedPair = useSelector(state => state.pair.clickedPair);

	const [showNotes, setShowNotes] = useState(false);
	const [note, setNote] = useState('');
	const createdAt = Date.now();
	const noteId = nanoid();

	//read from database
	useEffect(() => {
		// @ts-ignore
		dispatch(getNotes(clickedPair));
	}, [dispatch]);

	//write to database
	const handleAddNote = async note => {
		try {
			dispatch(
				addNote({
					createdAt: createdAt,
					note: note,
					noteId: noteId,
					// @ts-ignore
					userUid: user.user.uid,
					clickedPair: clickedPair
				})
			);
			dispatch(
				// @ts-ignore
				writeToDatabase({
					createdAt,
					note,
					noteId,
					// @ts-ignore
					userUid: user.user.uid,
					clickedPair
				})
			);
		} catch (e) {
			console.error(e);
		} finally {
			setNote('');
			setShowNotes(false);
		}
	};

	const renderItem = useCallback(
		({ item, index }) => <Note {...item} index={index} />,
		[notes]
	);

	return (
		<DismissKeyboardView
			style={[styles.infoCon, { backgroundColor: theme.colors.first }]}>
			<View style={styles.titles}>
				<Text
					style={[styles.typeText, { color: theme.colors.tertiary }]}>
					{clickedPair.p.type.toUpperCase()}
				</Text>
				<Text
					style={[styles.nameText, { color: theme.colors.tertiary }]}>
					{clickedPair.p.name}
				</Text>
			</View>
			<View style={{ backgroundColor: theme.colors.first }}>
				<View style={styles.inf}>
					<Text
						style={[
							styles.infText,
							{ color: theme.colors.tertiary }
						]}>
						{clickedPair.p.dayOfWeek}, {clickedPair.p.date},{' '}
						{clickedPair.p.timeStart}
						{' - '}
						{clickedPair.p.timeEnd}
					</Text>
					<View
						style={[
							styles.downLine,
							{ borderBottomColor: theme.colors.secondary }
						]}
					/>
				</View>
				<View
					style={[
						styles.downLine,
						{ borderBottomColor: theme.colors.secondary }
					]}
				/>
				<View style={styles.inf}>
					<Text
						style={[
							styles.infText,
							{ color: theme.colors.tertiary }
						]}>
						{clickedPair.p.classRoom}
					</Text>
					<View
						style={[
							styles.downLine,
							{ borderBottomColor: theme.colors.secondary }
						]}
					/>
				</View>
				<View
					style={[
						styles.downLine,
						{ borderBottomColor: theme.colors.secondary }
					]}
				/>
				<View style={styles.inf}>
					<Text
						style={[
							styles.infText,
							{ color: theme.colors.tertiary }
						]}>
						{clickedPair.p.teacher}
					</Text>
				</View>
				<View
					style={[
						styles.downLine,
						{ borderBottomColor: theme.colors.secondary }
					]}
				/>
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
							style={[
								styles.addNoteInput,
								{
									backgroundColor: isThemeDark
										? theme.colors.gray800
										: theme.colors.bg,
									color: theme.colors.tertiary
								}
							]}
							maxLength={100}
							multiline={true}
							numberOfLines={2}
							placeholderTextColor={
								isThemeDark
									? theme.colors.tertiary
									: theme.colors.gray500
							}
						/>
						<TouchableOpacity
							onPress={() => {
								if (note !== '' && note !== ' ') {
									handleAddNote(note);
								}
							}}>
							<View style={styles.noteBtn}>
								<Text style={styles.noteBtnText}>Добавить</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			</View>
			{status === 'resolved' && (
				<FlashList
					data={notes}
					renderItem={renderItem}
					estimatedItemSize={200}
				/>
			)}
			{status === 'rejected' && (
				<View>
					<Text>{error}</Text>
				</View>
			)}
		</DismissKeyboardView>
	);
};

export default PairInfo;

const styles = StyleSheet.create({
	infoCon: {
		flexDirection: 'column',
		paddingTop: 12,
		flex: 1
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
	addInfoConNotes: {
		backgroundColor: '#1E1E1F'
	},
	inf: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	infText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 14,
		lineHeight: 18,
		paddingVertical: 12,
		flex: 1
	},
	downLine: {
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
		paddingVertical: 13,
		paddingHorizontal: 18,
		fontSize: 13,
		lineHeight: 18,
		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowOffset: { width: 0, height: 4 },
		elevation: 6,
		fontFamily: 'Montserrat-Regular',
		width: '100%'
	},
	noteBtn: {
		marginTop: 22
	},
	noteBtnText: {
		backgroundColor: '#4B4B4B',
		borderRadius: 16,
		padding: 15,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
		color: '#FFFFFF',
		fontFamily: 'Montserrat-SemiBold'
	}
});
