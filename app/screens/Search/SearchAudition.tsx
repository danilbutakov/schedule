import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { PreferencesContext } from '../../utils/PreferencesContext';
// @ts-ignore
import Comp from '../../../assets/images/Comp';

const { height } = Dimensions.get('screen');

const SearchAudition = () => {
	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);
	return (
		<View
			style={[
				styles.searchContainer,
				{ backgroundColor: theme.colors.first }
			]}>
			<View
				style={[
					styles.searchGroupInfo,
					{
						backgroundColor: isThemeDark
							? theme.colors.gray800
							: theme.colors.fullWhite
					}
				]}>
				<View>
					<Text
						style={{
							paddingBottom: 8,
							fontFamily: 'Montserrat-Bold',
							color: theme.colors.tertiary
						}}>
						АУДИТОРИЯ
					</Text>
					<Text
						style={{
							paddingBottom: 4,
							fontFamily: 'Montserrat-SemiBold',
							color: theme.colors.tertiary
						}}>
						Д-301
					</Text>
					<Text
						style={{
							paddingBottom: 4,
							fontFamily: 'Montserrat-SemiBold',
							color: '#8E8E93'
						}}>
						Корпус Д, 3 этаж, ауд. 301
					</Text>
				</View>
				<View>
					<Comp width={60} height={60} />
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
			<View
				style={[
					styles.pairsContainer,
					{
						backgroundColor: isThemeDark
							? theme.colors.gray800
							: theme.colors.fullWhite
					}
				]}>
				<View style={styles.pair}>
					<View style={styles.headPair}>
						<View style={styles.headLeft}>
							<Text
								style={{
									fontFamily: 'Montserrat-Medium',
									color: theme.colors.tertiary
								}}>
								Лабораторная
							</Text>
						</View>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								color: theme.colors.tertiary
							}}>
							13:50 - 15:20
						</Text>
					</View>
					<View style={styles.infoPair}>
						<View style={styles.namePair}>
							<Text
								style={{
									fontFamily: 'Montserrat-SemiBold',
									color: theme.colors.tertiary
								}}>
								ООП
							</Text>
						</View>
						<View style={styles.teachPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									color: theme.colors.tertiary
								}}>
								Молчанова Е.И.
							</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									color: theme.colors.tertiary
								}}>
								ПИ.1-21-1
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
		paddingHorizontal: 5
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
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16
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

export default SearchAudition;
