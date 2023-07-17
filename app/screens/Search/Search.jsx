import React, { useEffect, useState } from 'react';
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
import Arrow from '../../../assets/svgUtils/Arrow.svg';
import SearchImg from '../../../assets/svgUtils/search.svg';
import Delete from '../../../assets/svgUtils/delete.svg';
import { useNavigation } from '@react-navigation/native';
import { DismissKeyboardView } from '../../hooks/HideKeyBoard';

const Search = () => {
	const [searchValue, setSearchValue] = useState('');
	const [showGroups, setShowGroups] = useState(false);
	const [showAudition, setShowAudition] = useState(false);
	const [showTeachers, setShowTeachers] = useState(false);

	const [showSearch, setShowSearch] = useState(true);
	const [showSearchGroup, setShowSearchGroup] = useState(false);
	const [showSearchTeacher, setShowSearchTeacher] = useState(false);
	const [showSearchAudition, setShowSearchAudition] = useState(false);

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

	const navigation = useNavigation();

	return (
		<DismissKeyboardView style={styles.containerSearch}>
			{showSearch && (
				<>
					<View style={styles.searchCont}>
						<View style={styles.searchBlock}>
							<View style={styles.inputBlock}>
								<View style={styles.leftBlock}>
									<SearchImg
										width={12}
										height={12}
										style={{
											marginRight: 13
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
						<View style={styles.infoAboutSearchCont}>
							<View style={styles.infoAboutSearch}>
								<Text
									style={{
										color: '#F7F7F7',
										textAlign: 'center',
										alignItems: 'center',
										display: 'flex',
										justifyContent: 'center'
									}}>
									Находите информацию о расписании
									преподавателей, группах и аудиториях
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
													'SearchGroup'
												);
											}}
											key={index}
											style={styles.searchBlockInfo}>
											<View style={styles.searchCard}>
												<View
													style={
														styles.searchCardText
													}>
													<Text style={styles.name}>
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
													<Arrow
														width={20}
														height={20}
													/>
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
													'SearchAudition'
												);
											}}
											key={index}
											style={styles.searchBlockInfo}>
											<View style={styles.searchCard}>
												<View
													style={
														styles.searchCardText
													}>
													<Text style={styles.name}>
														{auditionItem.name}
													</Text>
													<Text
														style={{
															color: '#8E8E93',
															fontFamily:
																'Montserrat-Medium'
														}}>
														Корпус{' '}
														{
															auditionItem.qualification
														}
														, этаж{' '}
														{auditionItem.course},
														ауд.{' '}
														{
															auditionItem.typeOfEducation
														}
													</Text>
												</View>
												<View style={styles.arrow}>
													<Arrow
														width={20}
														height={20}
													/>
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
													'SearchTeachers'
												);
											}}
											key={index}
											style={styles.searchBlockInfo}>
											<View style={styles.searchCard}>
												<View
													style={
														styles.searchCardText
													}>
													<Text style={styles.name}>
														{teacher.name}
													</Text>
													<Text
														style={{
															color: '#8E8E93',
															fontFamily:
																'Montserrat-Medium'
														}}>
														Кафедра «
														{teacher.qualification}
														», ауд. {teacher.aud}
													</Text>
												</View>
												<View style={styles.arrow}>
													<Arrow
														width={20}
														height={20}
													/>
												</View>
											</View>
										</TouchableOpacity>
									))}
							<View style={styles.downLine}></View>
						</ScrollView>
					)}
				</>
			)}
		</DismissKeyboardView>
	);
};

export default Search;

const styles = StyleSheet.create({
	containerSearch: {
		backgroundColor: '#1E1E1F',
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
		backgroundColor: '#4B4B4B',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: 5
	},
	leftBlock: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputBlock: {
		display: 'flex',
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
		color: '#F7F7F7'
	},
	searchBlockInfo: {
		width: '100%',
		borderTopColor: 'rgba(60, 60, 67, 0.13)',
		borderTopWidth: 1,
		backgroundColor: '#1E1E1F'
	},
	searchCard: {
		alignItems: 'center',
		justifyContent: 'space-between',
		display: 'flex',
		flexDirection: 'row',
		padding: 20
	},
	searchCardText: {},
	arrow: {},
	infoAboutSearchCont: {
		display: 'flex',
		justifyContent: 'center',
		paddingHorizontal: 20,
		backgroundColor: '#1E1E1F',
		marginTop: '60%'
	},
	name: {
		color: '#F7F7F7',
		fontFamily: 'Montserrat-SemiBold',
		paddingBottom: 4
	},
	infoAboutSearch: {}
});
