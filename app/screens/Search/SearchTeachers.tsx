import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import Teachers from '../../../assets/svgUtils/Teachers.svg';
import { useTheme } from '@react-navigation/native';
import { PreferencesContext } from '../../utils/PreferencesContext';

const { height } = Dimensions.get('screen');

const SearchTeachers = () => {
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
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 14,
							lineHeight: 15,
							color: theme.colors.tertiary
						}}>
						ПРЕПОДАВАТЕЛЬ
					</Text>
					<Text
						style={{
							paddingBottom: 4,
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 14,
							lineHeight: 18,
							color: theme.colors.tertiary
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
			<View
				style={[
					styles.pairsContainer,
					{
						backgroundColor: isThemeDark
							? theme.colors.gray800
							: theme.colors.fullWhite
					}
				]}>
				<View
					style={[
						styles.pair,
						{
							backgroundColor: isThemeDark
								? theme.colors.gray800
								: theme.colors.fullWhite
						}
					]}>
					<View style={styles.headPair}>
						<View style={styles.headLeft}>
							<Text
								style={{
									fontFamily: 'Montserrat-Medium',
									fontSize: 14,
									lineHeight: 20,
									color: theme.colors.tertiary
								}}>
								Лабораторная
							</Text>
						</View>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: 14,
								lineHeight: 20,
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
									fontSize: 14,
									lineHeight: 20,
									color: theme.colors.tertiary
								}}>
								ООП
							</Text>
						</View>
						<View style={styles.teachPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20,
									color: theme.colors.tertiary
								}}>
								ПИ.1-20-1
							</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20,
									color: theme.colors.tertiary
								}}>
								Д-418
							</Text>
						</View>
					</View>
				</View>
				<View
					style={[
						styles.pair,
						{
							backgroundColor: isThemeDark
								? theme.colors.gray800
								: theme.colors.fullWhite
						}
					]}>
					<View style={styles.headPair}>
						<View style={styles.headLeft}>
							<Text
								style={{
									fontFamily: 'Montserrat-Medium',
									fontSize: 14,
									lineHeight: 20,
									color: theme.colors.tertiary
								}}>
								Лабораторная
							</Text>
						</View>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: 14,
								lineHeight: 20,
								color: theme.colors.tertiary
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
									lineHeight: 20,
									color: theme.colors.tertiary
								}}>
								Дискретная математика
							</Text>
						</View>
						<View style={styles.teachPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20,
									color: theme.colors.tertiary
								}}>
								ПИ.1-20-1
							</Text>
						</View>
						<View style={styles.classRoomPair}>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: 14,
									lineHeight: 20,
									color: theme.colors.tertiary
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
		paddingHorizontal: 12
	},
	searchGroupInfo: {
		height: 120,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16
	},
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
		marginBottom: 5,
		borderRadius: 16
	},
	headPair: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 6
	},
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
