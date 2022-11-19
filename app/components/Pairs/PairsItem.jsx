import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { pairs } from '../../utils/Pairs';
import AppContext from '../../utils/Context';

const PairsItem = () => {
	const navigation = useNavigation();
	const { setHandleClickPair } = useContext(AppContext);
	return (
		<>
			{pairs.map((pair, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => {
						navigation.navigate('Info');
						setHandleClickPair({ index, pair });
					}}>
					<View style={styles.pairCon}>
						<View style={styles.headPair}>
							<View style={styles.headLeft}>
								<View style={styles.indexPair}>
									<Text style={styles.indexText}>{index + 1}</Text>
									<Text style={styles.typeText}>{pair.type}</Text>
								</View>
							</View>
							<View style={styles.headRight}>
								<Text style={styles.rightText}>
									{pair.timeStart} - {pair.timeEnd}
								</Text>
							</View>
						</View>
						<View style={styles.infoPair}>
							<View style={styles.namePair}>
								<Text style={styles.nameText}>{pair.name}</Text>
							</View>
							<View style={styles.teachPair}>
								<Text style={styles.teacherText}>{pair.teacher}</Text>
							</View>
							<View style={styles.classRoomPair}>
								<Text style={styles.classRoomText}>{pair.classRoom}</Text>
							</View>
							<View style={styles.groupPair}>
								<Text style={styles.groupText}>{pair.group} подгруппа</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			))}
		</>
	);
};

export default PairsItem;

const styles = StyleSheet.create({
	pairCon: {
		backgroundColor: '#FFFFFF',
		marginBottom: 5,
		paddingBottom: 5,
		borderRadius: 16
	},
	headPair: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 5,
		marginTop: 18
	},
	headLeft: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	indexPair: {
		backgroundColor: '#1E1E1F',
		paddingRight: 16,
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
		fontFamily: 'Montserrat-Regular',
		fontSize: 13,
		lineHeight: 27,
		paddingLeft: 10,
		color: '#FFFFFF'
	},
	headRight: {
		paddingRight: 12,
		alignSelf: 'center'
	},
	rightText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 16,
		lineHeight: 32,
		color: '#1E1E1F'
	},
	infoPair: {
		paddingHorizontal: 20
	},
	nameText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 14,
		lineHeight: 32,
		color: '#1E1E1F'
	},
	teacherText: {
		fontFamily: 'Montserrat-Light',
		fontSize: 14,
		lineHeight: 20,
		color: '#1E1E1F'
	},
	classRoomText: {
		fontFamily: 'Montserrat-Light',
		fontSize: 14,
		lineHeight: 20,
		color: '#1E1E1F'
	},
	groupText: {
		fontFamily: 'Montserrat-Light',
		fontSize: 14,
		lineHeight: 20,
		color: '#1E1E1F'
	}
});
