import { View, Text, Dimensions, StyleSheet, Linking } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

import Vk from '../../../assets/images/vk.svg';
import Telega from '../../../assets/images/telega.svg';
import Site from '../../../assets/images/site.svg';
import Moodle from '../../../assets/images/Moodle.svg';
import Bibl from '../../../assets/images/bibl.svg';

const { height } = Dimensions.get('screen');

const LinksScreen = () => {
	return (
		<View
			style={{
				paddingHorizontal: 20,
				paddingTop: 12,
				height,
				backgroundColor: '#F7F7F7'
			}}>
			<Text style={styles.mainTitle}>Социальные сети</Text>
			<TouchableOpacity
				style={styles.timeCon}
				onPress={() => {
					Linking.openURL('https://vk.com/irgups');
				}}>
				<View style={styles.mainCon}>
					<Vk style={{ width: 30, height: 30 }} />
					<Text style={styles.timeText}>Вконтакте</Text>
				</View>
				<Feather name='chevron-right' size={25} color='#AEAEB2' />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.timeCon}
				onPress={() => {
					Linking.openURL('https://t.me/irgups_official');
				}}>
				<View style={styles.mainCon}>
					<Telega style={{ width: 30, height: 30 }} />
					<Text style={styles.timeText}>Telegram</Text>
				</View>
				<Feather name='chevron-right' size={25} color='#AEAEB2' />
			</TouchableOpacity>
			<Text style={styles.secondTitle}>Сервисы университета</Text>
			<TouchableOpacity
				style={styles.timeCon}
				onPress={() => {
					Linking.openURL('https://www.irgups.ru/');
				}}>
				<View style={styles.mainCon}>
					<Site style={{ width: 30, height: 30 }} />
					<Text style={styles.timeText}>Сайт ИрГУПС</Text>
				</View>
				<Feather name='chevron-right' size={25} color='#AEAEB2' />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.timeCon}
				onPress={() => {
					Linking.openURL('https://sdo.irgups.ru/');
				}}>
				<View style={styles.mainCon}>
					<Moodle style={{ width: 30, height: 30 }} />
					<Text style={styles.timeText}>Moodle ИрГУПС</Text>
				</View>
				<Feather name='chevron-right' size={25} color='#AEAEB2' />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.timeCon}
				onPress={() => {
					Linking.openURL('https://www.irgups.ru/jirbis2/');
				}}>
				<View style={styles.mainCon}>
					<Bibl style={{ width: 30, height: 30 }} />
					<Text style={styles.timeText}>Библиотека ИрГУПС</Text>
				</View>
				<Feather name='chevron-right' size={25} color='#AEAEB2' />
			</TouchableOpacity>
		</View>
	);
};

export default LinksScreen;

const styles = StyleSheet.create({
	mainTitle: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93',
		marginBottom: 12,
		fontSize: 15,
		lineHeight: 19
	},
	secondTitle: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93',
		marginBottom: 10,
		fontSize: 15,
		lineHeight: 19,
		marginTop: 10
	},
	timeCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7,
		justifyContent: 'space-between'
	},
	btnCon: {
		marginRight: 15,
		backgroundColor: '#8E8E93',
		padding: 7,
		borderRadius: 7
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
		color: '#1E1E1F',
		marginLeft: 15
	},
	mainCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
});
