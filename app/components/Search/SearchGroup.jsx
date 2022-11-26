import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Exit from '../../../assets/svgUtils/Exit.svg';
import Avatar from '../../../assets/svgUtils/Avatar.svg';

const SearchGroup = ({ setShowSearch, setShowSearchGroup }) => {
	return (
		<View style={styles.searchContainer}>
			<View style={styles.searchTitle}>
				<TouchableOpacity
					onPress={() => {
						setShowSearch(true);
						setShowSearchGroup(false);
					}}>
					<Exit width={11.42} height={19.88} />
					<Text>Поиск</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.searchGroupInfo}>
				<View style={styles.searchText}>
					<Text>ГРУППА</Text>
					<Text>ПИ.1-21-1</Text>
					<Text>Бакалавриат, 2 курс, очная форма</Text>
				</View>
				<View style={styles.searchImg}>
					<Avatar width={45} height={45} />
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
							<Text>Д-418</Text>
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

export default SearchGroup;
