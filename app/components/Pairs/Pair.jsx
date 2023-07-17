import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { setClickedPair } from '../../store/slices/pairSlice';

const Pair = React.memo(({ pair }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	return (
		<>
			{pair.map((p, key) => (
				<View key={key}>
					{p.day ? (
						<View style={styles.day}>
							<Text style={styles.dayText}>
								{p.day.toUpperCase()}
							</Text>
						</View>
					) : (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Info');
								dispatch(setClickedPair({ key, p }));
							}}>
							<View style={styles.pairCon}>
								<View style={styles.headPair}>
									<View style={styles.headLeft}>
										<View style={styles.indexPair}>
											<Text style={styles.indexText}>
												{key}
											</Text>
										</View>
										<Text style={styles.typeText}>
											{p.type}
										</Text>
									</View>
									<View style={styles.headRight}>
										<Text style={styles.rightText}>
											{p.timeStart} - {p.timeEnd}
										</Text>
									</View>
								</View>
								<View style={styles.infoPair}>
									<View style={styles.namePair}>
										<Text style={styles.nameText}>
											{p.name}
										</Text>
									</View>
									<View style={styles.teachPair}>
										<Text style={styles.teacherText}>
											{p.teacher}
										</Text>
									</View>
									<View style={styles.classRoomPair}>
										<Text style={styles.classRoomText}>
											{p.classRoom}
										</Text>
									</View>
									{p.group && (
										<View style={styles.groupPair}>
											<Text style={styles.groupText}>
												{p.group} подгруппа
											</Text>
										</View>
									)}
								</View>
							</View>
						</TouchableOpacity>
					)}
				</View>
			))}
		</>
	);
});

export default Pair;

const styles = StyleSheet.create({
	pairCon: {
		backgroundColor: '#4B4B4B',
		marginBottom: 5,
		paddingBottom: 17,
		borderRadius: 16,
		elevation: 0.5,
		marginHorizontal: 2
	},
	pairConLast: {
		backgroundColor: '#1E1E1F',
		paddingBottom: 17,
		borderRadius: 16,
		marginBottom: 40
	},
	headPair: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 5,
		marginTop: 17
	},
	headLeft: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	indexPair: {
		backgroundColor: '#1E1E1F',
		paddingRight: 10,
		paddingLeft: 18,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	indexText: {
		color: '#3eb59f',
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14
	},
	typeText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		lineHeight: 32,
		marginLeft: 12,
		color: '#F7F7F7'
	},
	headRight: {
		paddingRight: 12,
		alignSelf: 'center'
	},
	rightText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 16,
		lineHeight: 32,
		color: '#F7F7F7'
	},
	infoPair: {
		paddingHorizontal: 20
	},
	nameText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		color: '#3eb59f',
		marginBottom: 8
	},
	teacherText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		color: '#F7F7F7',
		marginBottom: 8
	},
	classRoomText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		color: '#F7F7F7'
	},
	groupText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		color: '#F7F7F7'
	},
	groupPair: {
		marginTop: 10
	},
	day: {
		marginBottom: 15,
		justifyContent: 'center'
	},
	dayText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 32,
		marginLeft: 12,
		color: '#F7F7F7'
	}
});
