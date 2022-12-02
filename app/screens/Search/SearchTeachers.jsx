import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Teachers from '../../../assets/svgUtils/Teachers.svg';

const { height } = Dimensions.get('screen');

const SearchTeachers = () => {
	return (
		<View style={styles.searchContainer}>
			<View style={styles.searchGroupInfo}>
				<View style={styles.searchText}>
					<Text
						style={{
							paddingBottom: 8,
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 14,
							lineHeight: 15,
							color: '#1E1E1F'
						}}>
						ПРЕПОДАВАТЕЛЬ
					</Text>
					<Text
						style={{
							paddingBottom: 4,
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 14,
							lineHeight: 18,
							color: '#000000'
						}}>
						Попова Наталья Сергеевна
					</Text>
					<Text
						style={{
							color: '#8E8E93',
							fontFamily: 'Montserrat-Medium',
							fontSize: 14,
							lineHeight: 18
						}}>
						Кафедра: «Математика», ауд. Г-203
					</Text>
				</View>
				<View style={styles.searchImg}>
					<Teachers width={60} height={60} />
				</View>
			</View>
			<View style={styles.searchDate}>
				<Text
					style={{
						color: '#8E8E93',
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 14,
						lineHeight: 16
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
									fontSize: 14,
									lineHeight: 20
								}}>
								Лабораторная
							</Text>
						</View>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: 14,
								lineHeight: 20
							}}>
							13:50 - 15:20
						</Text>
					</View>
					<View style={styles.infoPair}>
						<View style={styles.namePair}>
							<Text
								style={{
									fontFamily: 'Montserrat-SemiBold',
									fontSize: 14,
									lineHeight: 20
								}}>
								ООП
							</Text>
						</View>
						<View style={styles.teachPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20
								}}>
								ПИ.1-20-1
							</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20
								}}>
								Д-418
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.pair}>
					<View style={styles.headPair}>
						<View style={styles.headLeft}>
							<Text
								style={{
									fontFamily: 'Montserrat-Medium',
									fontSize: 14,
									lineHeight: 20
								}}>
								Лабораторная
							</Text>
						</View>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: 14,
								lineHeight: 20
							}}>
							15:20 - 16:50
						</Text>
					</View>
					<View style={styles.infoPair}>
						<View style={styles.namePair}>
							<Text
								style={{
									fontFamily: 'Montserrat-SemiBold',
									fontSize: 14,
									lineHeight: 20
								}}>
								Дискретная математика
							</Text>
						</View>
						<View style={styles.teachPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20
								}}>
								ПИ.1-20-1
							</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20
								}}>
								Г-218
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
		backgroundColor: '#F8F8F8',
		paddingHorizontal: 12,
		marginTop: 5
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
		paddingRight: 20
	},
	pairsContainer: {
		borderRadius: 16,
		height: 115,
		width: '100%'
	},
	pair: {
		paddingLeft: 22,
		paddingVertical: 13,
		paddingRight: 10,
		backgroundColor: '#FFFFFF',
		marginBottom: 5,
		borderRadius: 16
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

export default SearchTeachers;
