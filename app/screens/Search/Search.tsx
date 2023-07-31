import React, { useContext, useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { groups } from '../../utils/Groups';
import { audition } from '../../utils/Audition';
import { teachers } from '../../utils/Teachers';
// @ts-ignore
import Arrow from '../../../assets/svgUtils/Arrow.svg';
// @ts-ignore
import SearchImg from '../../../assets/svgUtils/search.svg';
// @ts-ignore
import Delete from '../../../assets/svgUtils/delete.svg';
import { useNavigation, useTheme } from '@react-navigation/native';
import { DismissKeyboardView } from '../../hooks/HideKeyBoard';
import { PreferencesContext } from '../../utils/PreferencesContext';

const Search = () => {
	const [searchValue, setSearchValue] = useState('');
	const [showGroups, setShowGroups] = useState(false);
	const [showAudition, setShowAudition] = useState(false);
	const [showTeachers, setShowTeachers] = useState(false);

	const navigation = useNavigation();

	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	useEffect(() => {
		if (searchValue !== '') {
			setShowGroups(true);
			setShowAudition(true);
			setShowTeachers(true);
		} else {
			setShowGroups(false);
			setShowAudition(false);
			setShowTeachers(false);
		}
	}, [searchValue]);

	return (
		<DismissKeyboardView
			style={[
				styles.containerSearch,
				{ backgroundColor: theme.colors.first }
			]}>
			<View style={styles.searchCont}>
				<View
					style={[
						styles.searchBlock,
						{
							backgroundColor: isThemeDark
								? theme.colors.gray800
								: theme.colors.bg
						}
					]}>
					<View style={styles.inputBlock}>
						<View style={styles.leftBlock}>
							<SearchImg
								width={15}
								height={15}
								style={{
									marginRight: 13,
									color: theme.colors.gray600
								}}
							/>
							<TextInput
								style={styles.inputText}
								onChangeText={text => {
									setSearchValue(text);
									setShowGroups(!showGroups);
									setShowAudition(!showAudition);
									setShowTeachers(!showTeachers);
								}}
								value={searchValue}
								placeholder='Поиск'
								placeholderTextColor={theme.colors.gray600}
							/>
						</View>
						{searchValue && (
							<TouchableOpacity
								style={{}}
								onPress={() => setSearchValue('')}>
								<Delete width={20} height={20} />
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
			{(!showGroups || !showAudition || !showTeachers) && (
				<View
					style={[
						styles.infoAboutSearchCont,
						{ backgroundColor: theme.colors.first }
					]}>
					<View style={styles.infoAboutSearch}>
						<Text
							style={[
								{
									textAlign: 'center',
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center'
								},
								{ color: theme.colors.tertiary }
							]}>
							Находите информацию о расписании преподавателей,
							группах и аудиториях
						</Text>
					</View>
				</View>
			)}
			{(showGroups || showAudition || showTeachers) && (
				<ScrollView style={{ width: '100%' }}>
					{showGroups &&
						groups
							.filter(group =>
								group.name
									.toLowerCase()
									.includes(searchValue.toLowerCase())
							)
							.map((group, index) => (
								<TouchableOpacity
									onPress={() => {
										navigation.navigate(
											// @ts-ignore
											'SearchGroup'
										);
									}}
									key={index}
									style={[
										styles.searchBlockInfo,
										{
											backgroundColor: isThemeDark
												? theme.colors.first
												: theme.colors.fullWhite,
											borderTopColor: isThemeDark
												? theme.colors.tertiary
												: 'rgba(60, 60, 67, 0.13)'
										}
									]}>
									<View style={styles.searchCard}>
										<View style={styles.searchCardText}>
											<Text
												style={[
													styles.name,
													{
														color: theme.colors
															.tertiary
													}
												]}>
												{group.name}
											</Text>
											<Text
												style={{
													color: '#8E8E93',
													fontFamily:
														'Montserrat-Medium'
												}}>
												{group.qualification},{' '}
												{group.course},{' '}
												{group.typeOfEducation}
											</Text>
										</View>
										<View style={styles.arrow}>
											<Arrow width={20} height={20} />
										</View>
									</View>
								</TouchableOpacity>
							))}
					{showAudition &&
						audition
							.filter(auditionItem =>
								auditionItem.name
									.toLowerCase()
									.includes(searchValue.toLowerCase())
							)
							.map((auditionItem, index) => (
								<TouchableOpacity
									onPress={() => {
										navigation.navigate(
											// @ts-ignore
											'SearchAudition'
										);
									}}
									key={index}
									style={[
										styles.searchBlockInfo,
										{
											backgroundColor: isThemeDark
												? theme.colors.first
												: theme.colors.fullWhite,
											borderTopColor: isThemeDark
												? theme.colors.tertiary
												: 'rgba(60, 60, 67, 0.13)'
										}
									]}>
									<View style={styles.searchCard}>
										<View style={styles.searchCardText}>
											<Text
												style={[
													styles.name,
													{
														color: theme.colors
															.tertiary
													}
												]}>
												{auditionItem.name}
											</Text>
											<Text
												style={{
													color: '#8E8E93',
													fontFamily:
														'Montserrat-Medium'
												}}>
												Корпус{' '}
												{auditionItem.qualification},
												этаж {auditionItem.course}, ауд.{' '}
												{auditionItem.typeOfEducation}
											</Text>
										</View>
										<View style={styles.arrow}>
											<Arrow width={20} height={20} />
										</View>
									</View>
								</TouchableOpacity>
							))}
					{showTeachers &&
						teachers
							.filter(teacher =>
								teacher.name
									.toLowerCase()
									.includes(searchValue.toLowerCase())
							)
							.map((teacher, index) => (
								<TouchableOpacity
									onPress={() => {
										navigation.navigate(
											// @ts-ignore
											'SearchTeachers'
										);
									}}
									key={index}
									style={[
										styles.searchBlockInfo,
										{
											backgroundColor: isThemeDark
												? theme.colors.first
												: theme.colors.fullWhite,
											borderTopColor: isThemeDark
												? theme.colors.tertiary
												: 'rgba(60, 60, 67, 0.13)'
										}
									]}>
									<View style={styles.searchCard}>
										<View style={styles.searchCardText}>
											<Text
												style={[
													styles.name,
													{
														color: theme.colors
															.tertiary
													}
												]}>
												{teacher.name}
											</Text>
											<Text
												style={{
													color: '#8E8E93',
													fontFamily:
														'Montserrat-Medium'
												}}>
												Кафедра «{teacher.qualification}
												», ауд. {teacher.aud}
											</Text>
										</View>
										<View style={styles.arrow}>
											<Arrow width={20} height={20} />
										</View>
									</View>
								</TouchableOpacity>
							))}
					<View style={styles.downLine} />
				</ScrollView>
			)}
		</DismissKeyboardView>
	);
};

export default Search;

const styles = StyleSheet.create({
	containerSearch: {
		alignItems: 'center',
		flex: 1
	},
	searchCont: {
		paddingHorizontal: 12,
		marginVertical: 10,
		width: '100%'
	},
	downLine: {
		borderBottomColor: 'rgba(60, 60, 67, 0.13)',
		borderBottomWidth: 1,
		width: '100%'
	},
	searchBlock: {
		borderRadius: 16,
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: 5
	},
	leftBlock: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputBlock: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},
	inputText: {
		fontSize: 16,
		fontFamily: 'Montserrat-Medium',
		lineHeight: 20,
		width: '85%',
		color: '#979797'
	},
	searchBlockInfo: {
		width: '100%',
		borderTopWidth: 1
	},
	searchCard: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 20
	},
	searchCardText: {},
	arrow: {},
	infoAboutSearchCont: {
		justifyContent: 'center',
		paddingHorizontal: 20,
		marginTop: '60%'
	},
	name: {
		fontFamily: 'Montserrat-SemiBold',
		paddingBottom: 4
	},
	infoAboutSearch: {}
});
