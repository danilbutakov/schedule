import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

import One from '../../assets/images/1.svg';
import Two from '../../assets/images/2.svg';
import Three from '../../assets/images/3.svg';
import Four from '../../assets/images/4.svg';
import Five from '../../assets/images/5.svg';
import Six from '../../assets/images/6.svg';
import Seven from '../../assets/images/7.svg';
import Eight from '../../assets/images/8.svg';

const { height } = Dimensions.get('screen');

const SchedScreen = () => {
	return (
		<View
			style={{
				paddingHorizontal: 20,
				paddingTop: 12,
				height,
				backgroundColor: '#F7F7F7'
			}}>
			<Text style={styles.mainTitle}>Расписание звонков</Text>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<One />
				</View>
				<Text style={styles.timeText}>08:30 - 10:00</Text>
			</View>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<Two />
				</View>
				<Text style={styles.timeText}>10:10 - 11:40</Text>
			</View>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<Three />
				</View>
				<Text style={styles.timeText}>12:10 - 13:40</Text>
			</View>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<Four />
				</View>
				<Text style={styles.timeText}>13:50 - 15:20</Text>
			</View>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<Five />
				</View>
				<Text style={styles.timeText}>15:30 - 17:00</Text>
			</View>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<Six />
				</View>
				<Text style={styles.timeText}>17:10 - 18:40</Text>
			</View>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<Seven />
				</View>
				<Text style={styles.timeText}>18:45 - 20:15</Text>
			</View>
			<View style={styles.timeCon}>
				<View style={styles.btnCon}>
					<Eight />
				</View>
				<Text style={styles.timeText}>20:20 - 21:50</Text>
			</View>
		</View>
	);
};

export default SchedScreen;

const styles = StyleSheet.create({
	mainTitle: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93',
		marginBottom: 12,
		fontSize: 15,
		lineHeight: 19
	},
	timeCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7
	},
	btnCon: {
		marginRight: 15
	},
	btnText: {
		color: '#8E8E93',
		backgroundColor: '#FFFFFF',
		borderRadius: 50,
		fontFamily: 'Montserrat-Bold',
		fontSize: 8,
		paddingHorizontal: 5,
		paddingVertical: 2
	},
	timeText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 20,
		color: '#1E1E1F'
	}
});
