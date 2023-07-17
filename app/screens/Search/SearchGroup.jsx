import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Avatar from '../../../assets/svgUtils/Avatar.svg';

const { height } = Dimensions.get('screen');

const SearchGroup = () => {
	return (
		<View style={styles.searchContainer}>
			<View style={styles.searchGroupInfo}>
				<View style={styles.searchText}>
					<Text
						style={{
							paddingBottom: 8,
							fontFamily: 'Montserrat-Bold',
							color: '#F7F7F7'
						}}>
						ГРУППА
					</Text>
					<Text
						style={{
							paddingBottom: 4,
							fontFamily: 'Montserrat-SemiBold',
							color: '#F7F7F7'
						}}>
						ПИ.1-21-1
					</Text>
					<Text
						style={{
							color: '#8E8E93',
							fontFamily: 'Montserrat-Medium'
						}}>
						Бакалавриат, 2 курс, очная форма
					</Text>
				</View>
				<View style={styles.searchImg}>
					<Avatar width={60} height={60} />
				</View>
			</View>
			<View style={styles.searchDate}>
				<Text
					style={{
						color: '#8E8E93',
						fontFamily: 'Montserrat-SemiBold'
					}}>
					ЧЕТВЕРГ, 27 ОКТЯБРЯ
				</Text>
			</View>
			<View style={styles.pairsContainer}>
				<View style={styles.pair}>
					<View style={styles.headPair}>
						<View style={styles.headLeft}>
							<Text
								style={{
									fontFamily: 'Montserrat-Medium',
									color: '#F7F7F7'
								}}>
								Лабораторная
							</Text>
						</View>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								color: '#F7F7F7'
							}}>
							13:50 - 15:20
						</Text>
					</View>
					<View style={styles.infoPair}>
						<View style={styles.namePair}>
							<Text
								style={{
									fontFamily: 'Montserrat-SemiBold',
									color: '#F7F7F7'
								}}>
								ООП
							</Text>
						</View>
						<View style={styles.teachPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									color: '#F7F7F7'
								}}>
								Молчанова Е.И.
							</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									color: '#F7F7F7'
								}}>
								Д-418
							</Text>
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
		backgroundColor: '#1E1E1F',
		padding: 5
	},
	searchGroupInfo: {
		backgroundColor: '#4B4B4B',
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
		paddingRight: 20
	},
	pairsContainer: {
		borderRadius: 16,
		backgroundColor: '#4B4B4B',
		width: '100%'
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
	headLeft: {},
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

export default SearchGroup;
