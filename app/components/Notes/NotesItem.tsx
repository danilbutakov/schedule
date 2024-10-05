import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { useTheme } from '@react-navigation/native';

import { PreferencesContext } from '../../utils/PreferencesContext';
import AlertNotes from '../AlertNotes';
import { useDispatch } from 'react-redux';
import { deleteNote, deleteFromDatabase } from '../../store/slices/notesSlice';
import { handleUpdateNote } from '../../utils/Functions';

const NotesItem = ({ item, index, getNotes }) => {
	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);
	const [isClickedNote, setIsClickedNote] = useState(false);
	const [isClickedEditNote, setIsClickedEditNote] = useState(false);
	const [bodyNote, setBodyNote] = useState('');

	const dispatch = useDispatch();

	const handleDelete = async (noteId) => {
		try {
			dispatch(deleteNote(noteId));
			// @ts-ignore
			dispatch(deleteFromDatabase(noteId));
			getNotes();
		} catch (e) {
			console.log(e.message);
		}
	};

	const pairInfo = item.clickedPair.p;

	return (
		<TouchableOpacity
			onPress={() => setIsClickedNote(!isClickedNote)}
			key={index}
			style={[
				styles.pairCon,
				{
					backgroundColor: isThemeDark
						? theme.colors.gray800
						: theme.colors.fullWhite
				}
			]}>
			<View style={styles.headPair}>
				<View style={styles.headLeft}>
					<View style={styles.indexPair}>
						<Text
							style={[
								styles.indexText,
								{
									color: theme.colors.green
								}
							]}>
							{item.clickedPair.key}
						</Text>
					</View>
					<Text style={[styles.typeText, { color: theme.colors.tertiary }]}>
						{pairInfo.type}
					</Text>
				</View>
				<View style={styles.headRight}>
					<Text style={[styles.rightText, { color: theme.colors.tertiary }]}>
						{pairInfo.timeStart} - {pairInfo.timeEnd}
					</Text>
				</View>
			</View>
			<View style={styles.infoPair}>
				<View>
					<Text style={[styles.nameText, { color: theme.colors.green }]}>
						{pairInfo.name}
					</Text>
				</View>
				<View style={styles.groupPair}>
					<Text
						style={[
							styles.groupText,
							{
								color: theme.colors.tertiary
							}
						]}>
						{pairInfo.dayOfWeek} | {pairInfo.typeWeek}
					</Text>
				</View>
				<View
					style={{
						marginVertical: 10,
						borderBottomColor: '#F7F7F7',
						borderBottomWidth: 0.5
					}}
				/>
				<View>
					<Text
						style={[styles.classRoomText, { color: theme.colors.tertiary }]}>
						{item.note}
					</Text>
				</View>
			</View>
			{isClickedNote && (
				<AlertNotes
					header={'Изменение или удаление'}
					btnText={'Удалить'}
					anotherBtnText={'Изменить'}
					isOpen={isClickedNote}
					setIsOpen={setIsClickedNote}
					mainFunc={() => handleDelete(item.noteId)}
					anotherFunc={() => {
						handleUpdateNote(item.noteId, bodyNote, getNotes);
					}}
					body={item.note}
					bodyNote={bodyNote}
					setBodyNote={setBodyNote}
					isClickedEditNote={isClickedEditNote}
					setIsClickedEditNote={setIsClickedEditNote}
					getNotes={() => getNotes()}
				/>
			)}
		</TouchableOpacity>
	);
};

export default NotesItem;

const styles = StyleSheet.create({
	pairCon: {
		marginBottom: 15,
		borderRadius: 16,
		elevation: 0.5
	},
	headPair: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 5,
		marginTop: 17
	},
	headLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	indexPair: {
		backgroundColor: '#1E1E1F',
		paddingRight: 10,
		paddingLeft: 18,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	indexText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14
	},
	typeText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		lineHeight: 32,
		marginLeft: 12
	},
	headRight: {
		paddingRight: 12,
		alignSelf: 'center'
	},
	rightText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 16,
		lineHeight: 32
	},
	infoPair: {
		paddingHorizontal: 15
	},
	nameText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14
	},
	classRoomText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 16
	},
	groupText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15
	},
	groupPair: {
		marginTop: 5
	}
});
