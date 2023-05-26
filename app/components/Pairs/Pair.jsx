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
						<View style={[styles.day, styles.shadowDay]}>
							<Text style={styles.dayText}>{p.day}</Text>
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
		backgroundColor: '#FFFFFF',
		marginBottom: 5,
		paddingBottom: 17,
		borderRadius: 16
	},
	pairConLast: {
		backgroundColor: '#FFFFFF',
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
		color: '#81F2DE',
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14
	},
	typeText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		lineHeight: 32,
		marginLeft: 12,
		color: '#1E1E1F'
	},
	headRight: {
		paddingRight: 12,
		alignSelf: 'center'
	},
	rightText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 16,
		lineHeight: 32,
		color: '#1E1E1F'
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
		color: '#1E1E1F',
		marginBottom: 8
	},
	classRoomText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		color: '#1E1E1F'
	},
	groupText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		color: '#1E1E1F'
	},
	groupPair: {
		marginTop: 10
	},
	day: {
		marginBottom: 30,
		backgroundColor: '#FFFFFF',
		borderRadius: 18,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginHorizontal: 5,
		marginTop: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	shadowDay: {
		shadowColor: '#3eb59f',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.4,
		shadowRadius: 7,
		elevation: 12
	},
	dayText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 32,
		marginLeft: 12,
		color: '#1E1E1F'
	}
});
