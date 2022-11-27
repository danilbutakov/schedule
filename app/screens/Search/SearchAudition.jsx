import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Computer from '../../assets/svgUtils/computer.svg';

const SearchAudition = () => {
	return (
		<View style={styles.searchContainer}>
			<View style={styles.searchGroupInfo}>
				<View style={styles.searchText}>
					<Text>АУДИТОРИЯ</Text>
					<Text>Д-301</Text>
					<Text>Корпус Д, 3 этаж, ауд. 301</Text>
				</View>
				<View style={styles.searchImg}>
					<Computer width={45} height={45} />
				</View>
			</View>
			<View style={styles.searchDate}>
				<Text>ЧЕТВЕРГ, 27 ОКТЯБРЯ</Text>
			</View>
			<View style={styles.pairsContainer}>
				<View style={styles.pair}>
					<View style={styles.headPair}>
						<View style={styles.headLeft}>
							<Text>Лабораторная</Text>
						</View>
						<Text>13:50 - 15:20</Text>
					</View>
					<View style={styles.infoPair}>
						<View style={styles.namePair}>
							<Text>ООП</Text>
						</View>
						<View style={styles.teachPair}>
							<Text>Молчанова Е.И.</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text>ПИ.1-21-1</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	searchContainer: {},
	searchTitle: {},
	searchGroupInfo: {},
	searchText: {},
	searchImg: {},
	searchDate: {},
	pairsContainer: {},
	pair: {},
	headPair: {},
	headLeft: {},
	infoPair: {},
	namePair: {},
	teachPair: {},
	classRoomPair: {}
});

export default SearchAudition;
