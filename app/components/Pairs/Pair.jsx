import {
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../../utils/Context';
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const Pair = ({ pair, index, pairs }) => {
	const navigation = useNavigation();
	const { setHandleClickPair } = useContext(AppContext);

	return (
		<TouchableOpacity
			key={index}
			onPress={() => {
				navigation.navigate('Info');
				setHandleClickPair({ index, pair });
			}}>
			<View
				style={
					index === pairs.length - 1
						? styles.pairConLast
						: styles.pairCon
				}>
				<View style={styles.headPair}>
					<View style={styles.headLeft}>
						<View style={styles.indexPair}>
							<Text style={styles.indexText}>{index + 1}</Text>
						</View>
						<Text style={styles.typeText}>{pair.type}</Text>
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
						<Text style={styles.classRoomText}>
							{pair.classRoom}
						</Text>
					</View>
					{pair.group && (
						<View style={styles.groupPair}>
							<Text style={styles.groupText}>
								{pair.group} подгруппа
							</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

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
		marginBottom: 100
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
	}
});
