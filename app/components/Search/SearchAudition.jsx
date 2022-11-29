import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Exit from '../../../assets/svgUtils/Exit.svg';
import Computer from '../../../assets/svgUtils/computer.svg';

const { height } = Dimensions.get('screen');

const SearchAudition = ({ setShowSearch, setShowSearchAudition }) => {
	return (
		<View style={styles.searchContainer}>
			<View style={styles.searchTitle}>
				<TouchableOpacity
					onPress={() => {
						setShowSearch(true);
						setShowSearchAudition(false);
					}}>
					<Exit width={11.42} height={19.88} />
				</TouchableOpacity>
			</View>
			<View style={styles.searchGroupInfo}>
				<View style={styles.searchText}>
					<Text style={{paddingBottom: 8, fontFamily: 'Montserrat-Bold'}}>АУДИТОРИЯ</Text>
					<Text style={{paddingBottom: 4, fontFamily: 'Montserrat-SemiBold'}}>Д-301</Text>
					<Text style={{color: '#8E8E93', fontFamily: 'Montserrat-Medium'}}>Корпус Д, 3 этаж, ауд. 301</Text>
				</View>
				<View style={styles.searchImg}>
					<Computer width={60} height={60} />
				</View>
			</View>
			<View style={styles.searchDate}>
				<Text style={{color: '#8E8E93', fontFamily: 'Montserrat-SemiBold'}}>ЧЕТВЕРГ, 27 ОКТЯБРЯ</Text>
			</View>
			<View style={styles.pairsContainer}>
				<View style={styles.pair}>
					<View style={styles.headPair}>
						<View style={styles.headLeft}>
							<Text style={{fontFamily: 'Montserrat-Medium'}}>Лабораторная</Text>
						</View>
						<Text style={{fontFamily: 'Montserrat-Regular'}}>13:50 - 15:20</Text>
					</View>
					<View style={styles.infoPair}>
						<View style={styles.namePair}>
							<Text style={{fontFamily: 'Montserrat-SemiBold'}}>ООП</Text>
						</View>
						<View style={styles.teachPair}>
							<Text style={{fontFamily: 'Montserrat-Regular'}}>Молчанова Е.И.</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text style={{fontFamily: 'Montserrat-Regular'}}>ПИ.1-21-1</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		width: '100%',
		height,
		backgroundColor: '#F8F8F8',
		padding: 5
		
	},
	searchTitle: {},

	searchGroupInfo: {
		backgroundColor: '#FFFFFF',
		height: 120,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 16
	},
	searchText: {},
	searchImg: {},
	searchDate: {
		paddingBottom: 12,
		paddingTop: 12,
		paddingLeft: 20,
		paddingRight: 20,
		
	},
	pairsContainer: {
		borderRadius: 16,
		backgroundColor: '#FFFFFF',
		height: 115,
		width: '100%',
		
	},
	pair: {
		paddingTop: 18,
		paddingLeft: 22,
		paddingRight: 22,
		paddingBottom: 11
	},
	headPair: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 6
	},
	headLeft: {
		
	},
	infoPair: {},
	namePair: {
		paddingBottom: 3
	},
	teachPair: {
		paddingBottom: 5
	},
	classRoomPair: {
		paddingBottom: 11
	}
});

export default SearchAudition;
