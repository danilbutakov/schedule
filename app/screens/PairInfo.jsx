import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	RefreshControl
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../utils/Context';

import useAuth from '../../app/hooks/useAuth';
import { ref, set, remove, update, onValue } from 'firebase/database';
import { db } from '../../firebase';

import { images } from '../../assets/globalImages';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('screen');

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const PairInfo = () => {
	const { handleClickPair } = useContext(AppContext);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setShowInfo(false);
		wait(2000).then(() => {
			setRefreshing(false);
			setShowInfo(true);
		});
	}, []);

	const [showNotes, setShowNotes] = useState(false);
	const [showInfo, setShowInfo] = useState(true);

	const { user } = useAuth();

	const [notes, setNotes] = useState([]);
	const [note, setNote] = useState();
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
						handleClickPair.pair.date +
						'/' +
						handleClickPair.pair.dayOfWeek +
						'/' +
						handleClickPair.pair.type +
						'/' +
						handleClickPair.pair.name +
						'/' +
						handleClickPair.pair.group +
						' group' +
						'/' +
						'notes'
				),
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
		set(
			ref(
				db,
				'users/' +
					user.uid +
					'/' +
					handleClickPair.pair.date +
					'/' +
					handleClickPair.pair.dayOfWeek +
					'/' +
					handleClickPair.pair.type +
					'/' +
					handleClickPair.pair.name +
					'/' +
					handleClickPair.pair.group +
					' group' +
					'/' +
					'notes'
			),
			{
				note
			}
		);
		//clear the input
		setNote('');
	};

	// delete from note from database
	const handleDelete = note => {
		remove(
			ref(
				db,
				'users/' +
					user.uid +
					'/' +
					handleClickPair.pair.date +
					'/' +
					handleClickPair.pair.dayOfWeek +
					'/' +
					handleClickPair.pair.type +
					'/' +
					handleClickPair.pair.name +
					'/' +
					handleClickPair.pair.group +
					' group' +
					'/' +
					'notes'
			)
		);
	};

	return (
		<SafeAreaView>
			<ScrollView
				contentContainerStyle={styles.scrollView}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
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
							<Text style={styles.infText}>
								{handleClickPair.pair.classRoom}
							</Text>
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
								<Image
									style={{ width: 15, height: 15 }}
									source={images.plusNote}
								/>
							</TouchableOpacity>
							{showNotes && (
								<>
									<TextInput
										placeholder='Заметка'
										value={note}
										onChangeText={note => setNote(note)}
									/>
									<TouchableOpacity
										onPress={() => {
											if (note !== '') {
												writeToDataBase();
											}
										}}>
										<Text>Добавить</Text>
									</TouchableOpacity>
								</>
							)}
						</View>
						<View style={styles.downLine}></View>
					</View>
					{showInfo && (
						<ScrollView>
							{notes.map((note, key) => (
								<View style={styles.addInfoConNotes} key={key}>
									<View style={styles.inf}>
										<Text style={styles.infText}>{note}</Text>
										<TouchableOpacity onPress={() => handleDelete()}>
											<Image
												source={images.deleteNote}
												style={{ width: 20, height: 20 }}
											/>
										</TouchableOpacity>
										<View style={styles.downLine}></View>
									</View>
								</View>
							))}
						</ScrollView>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
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
