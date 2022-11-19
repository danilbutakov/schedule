import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	TouchableOpacity,
	SafeAreaView,
	TextInput
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../utils/Context';

import useAuth from '../../app/hooks/useAuth';
import { ref, set, remove, update, onValue } from 'firebase/database';
import { db } from '../../firebase';

import { images } from '../../assets/globalImages';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('screen');

const PairInfo = () => {
	const { handleClickPair } = useContext(AppContext);
	const [showNotes, setShowNotes] = useState(false);

	const { user } = useAuth();

	const [notes, setNotes] = useState([]);
	const [note, setNote] = useState();
	//for Notes
	//read from database
	useEffect(() => {
		if (user) {
			onValue(
				ref(db, 'users/' + user.uid + '/' + user.displayName + '/' + 'notes'),
				snapshot => {
					setNotes([]);
					const data = snapshot.val();
					console.log(data);
					if (data !== null) {
						Object.values(data).map(note => {
							setNotes(oldArray => [...oldArray, note]);
						});
					}
				}
			);
		}
	}, []);

	console.log(notes);

	//write to database
	const writeToDataBase = () => {
		set(ref(db, 'users/' + user.uid + '/' + user.displayName + '/' + 'notes'), {
			note: note
		});
		//clear the input
		setNote('');
	};

	// delete from note from database
	const handleDelete = uid => {
		remove(ref(db, 'users/' + user.uid));
	};

	return (
		<View style={styles.infoCon}>
			<View style={styles.titles}>
				<Text style={styles.typeText}>{handleClickPair.pair.type}</Text>
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
				<View style={styles.inf}>
					<Text style={styles.infText}>{handleClickPair.pair.classRoom}</Text>
					<View style={styles.downLine}></View>
				</View>
				<View style={styles.inf}>
					<Text style={styles.infText}>{handleClickPair.pair.teacher}</Text>
					<View style={styles.downLine}></View>
				</View>
			</View>
			<View style={styles.notesContainer}>
				<View style={styles.notesTitle}>
					<Text style={styles.noteTitle}>Заметки</Text>
					<TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
						<Image style={{ width: 15, height: 15 }} source={images.plusNote} />
					</TouchableOpacity>
					{showNotes && (
						<>
							<TextInput
								placeholder='Заметка'
								value={note}
								onChangeText={note => setNote(note)}
							/>
							<TouchableOpacity onPress={() => writeToDataBase()}>
								<Text>Добавить</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
				<View style={styles.downLine}></View>
			</View>
			<ScrollView>
				{notes.map(note => (
					<View style={styles.addInfoConNotes}>
						<View style={styles.inf}>
							<Text style={styles.infText}>{note}</Text>
							<View style={styles.downLine}></View>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default PairInfo;

const styles = StyleSheet.create({
	infoCon: {
		backgroundColor: '#F7F7F7',
		height
	},
	titles: {
		marginBottom: 20,
		paddingLeft: 20
	},
	typeText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		marginBottom: 8,
		lineHeight: 25
	},
	nameText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 18,
		marginBottom: 8,
		lineHeight: 25
	},
	addInfoCon: {
		backgroundColor: '#FFFFFF'
	},
	addInfoConNotes: {
		backgroundColor: '#FFFFFF'
	},
	infText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		lineHeight: 19,
		color: '#1E1E1E',
		paddingVertical: 12,
		paddingHorizontal: 20
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
		fontSize: 17,
		lineHeight: 24,
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93'
	},
	noteCon: {
		backgroundColor: ''
	}
});
