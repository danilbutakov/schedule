import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { setClickedPair } from '../../store/slices/pairSlice';
import { PreferencesContext } from '../../utils/PreferencesContext';
import { RootStackParamList } from '../../../@types/navigation';

// @ts-ignore
const Pair = React.memo(({ pair }) => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList, 'Info'>>();
	const dispatch = useDispatch();

	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	return (
		<>
			{pair.map((p, key) => (
				<View key={key}>
					{p.day ? (
						<View style={styles.day}>
							<Text style={[styles.dayText, { color: theme.colors.tertiary }]}>
								{p.day.toUpperCase()}
							</Text>
						</View>
					) : (
						<TouchableOpacity
							onPress={() => {
								// @ts-ignore
								navigation.navigate('Info');
								dispatch(setClickedPair({ key, p }));
							}}>
							<View
								style={[
									styles.pairCon,
									{
										backgroundColor: isThemeDark
											? theme.colors.gray800
											: theme.colors.fullWhite
									}
								]}>
								<View style={styles.headPair}>
									<View style={styles.headLeft}>
										<View style={styles.indexPair}>
											<Text
												style={[
													styles.indexText,
													{
														color: theme.colors.green
													}
												]}>
												{key}
											</Text>
										</View>
										<Text
											style={[
												styles.typeText,
												{ color: theme.colors.tertiary }
											]}>
											{p.type}
										</Text>
									</View>
									<View style={styles.headRight}>
										<Text
											style={[
												styles.rightText,
												{ color: theme.colors.tertiary }
											]}>
											{p.timeStart} - {p.timeEnd}
										</Text>
									</View>
								</View>
								<View style={styles.infoPair}>
									<View>
										<Text
											style={[styles.nameText, { color: theme.colors.green }]}>
											{p.name}
										</Text>
									</View>
									<View>
										<Text
											style={[
												styles.teacherText,
												{ color: theme.colors.tertiary }
											]}>
											{p.teacher}
										</Text>
									</View>
									<View>
										<Text
											style={[
												styles.classRoomText,
												{ color: theme.colors.tertiary }
											]}>
											{p.classRoom}
										</Text>
									</View>
									{p.group && (
										<View style={styles.groupPair}>
											<Text
												style={[
													styles.groupText,
													{
														color: theme.colors.tertiary
													}
												]}>
												{p.group} подгруппа
											</Text>
										</View>
									)}
								</View>
							</View>
						</TouchableOpacity>
					)}
				</View>
			))}
		</>
	);
});

export default Pair;

const styles = StyleSheet.create({
	pairCon: {
		marginBottom: 5,
		paddingBottom: 17,
		borderRadius: 16,
		elevation: 0.5,
		marginHorizontal: 2
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
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14
	},
	typeText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		lineHeight: 32,
		marginLeft: 12
	},
	headRight: {
		paddingRight: 12,
		alignSelf: 'center'
	},
	rightText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 16,
		lineHeight: 32
	},
	infoPair: {
		paddingHorizontal: 20
	},
	nameText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		marginBottom: 8
	},
	teacherText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		marginBottom: 8
	},
	classRoomText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14
	},
	groupText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 14
	},
	groupPair: {
		marginTop: 10
	},
	day: {
		marginBottom: 15,
		justifyContent: 'center'
	},
	dayText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 32,
		marginLeft: 12
	}
});
