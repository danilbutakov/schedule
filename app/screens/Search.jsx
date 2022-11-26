import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';

import { groups } from '../utils/Groups';
import { audition } from '../utils/Audition';
import { teachers } from '../utils/Teachers';
import SearchGroup from '../components/Search/SearchGroup';
import SearchAudition from '../components/Search/SearchAudition';
import SearchTeachers from '../components/Search/SearchTeachers';
import Arrow from '../../assets/svgUtils/Arrow.svg';
import SearchImg from '../../assets/svgUtils/search.svg';
import Delete from '../../assets/svgUtils/delete.svg';

const { height } = Dimensions.get('screen');

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

	return (
		<View style={styles.containerSearch}>
			{showSearch && (
				<>
					<View style={styles.searchCont}>
						<View style={styles.searchBlock}>
							<View style={styles.inputBlock}>
								<View style={styles.leftBlock}>
									<SearchImg
										width={12}
										height={12}
										style={{ marginRight: 13 }}
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
									<TouchableOpacity onPress={() => setSearchValue('')}>
										<Delete width={17} height={17} />
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
					{showGroups ? (
						groups
							.filter(group =>
								group.name.toLowerCase().includes(searchValue.toLowerCase())
							)
							.map((group, index) => (
								<TouchableOpacity
									onPress={() => {
										setShowSearch(false);
										setShowSearchGroup(true);
									}}
									key={index}
									style={styles.searchBlockInfo}>
									<View style={styles.searchCard}>
										<View style={styles.searchCardText}>
											<Text>{group.name}</Text>
											<Text>
												{group.qualification}, {group.course},{' '}
												{group.typeOfEducation}
											</Text>
										</View>
										<View style={styles.arrow}>
											<Arrow width={11.14} height={6.41} />
										</View>
									</View>
								</TouchableOpacity>
							))
					) : (
						<View style={styles.infoAboutSearchCont}>
							<View style={styles.infoAboutSearch}>
								<Text
									style={{
										color: 'rgba(60, 60, 67, 0.6)',
										textAlign: 'center',
										alignItems: 'center',
										display: 'flex',
										justifyContent: 'center'
									}}>
									Находите информацию о расписании преподавателей, группах и
									аудиториях
								</Text>
							</View>
						</View>
					)}
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
										setShowSearch(false);
										setShowSearchAudition(true);
									}}
									key={index}
									style={styles.searchBlockInfo}>
									<View style={styles.searchCard}>
										<View style={styles.searchCardText}>
											<Text>{auditionItem.name}</Text>
											<Text>
												Корпус {auditionItem.qualification}, этаж{' '}
												{auditionItem.course}, ауд.{' '}
												{auditionItem.typeOfEducation}
											</Text>
										</View>
										<View style={styles.arrow}>
											<Arrow width={11.14} height={6.41} />
										</View>
									</View>
								</TouchableOpacity>
							))}
					{showTeachers &&
						teachers
							.filter(teacher =>
								teacher.name.toLowerCase().includes(searchValue.toLowerCase())
							)
							.map((teacher, index) => (
								<TouchableOpacity
									onPress={() => {
										setShowSearch(false);
										setShowSearchTeacher(true);
									}}
									key={index}
									style={styles.searchBlockInfo}>
									<View style={styles.searchCard}>
										<View style={styles.searchCardText}>
											<Text>{teacher.name}</Text>
											<Text>
												Кафедра «{teacher.qualification}», ауд. {teacher.aud}
											</Text>
										</View>
										<View style={styles.arrow}>
											<Arrow width={11.14} height={6.41} />
										</View>
									</View>
								</TouchableOpacity>
							))}
				</>
			)}
			{showSearchGroup && (
				<SearchGroup
					setShowSearch={setShowSearch}
					setShowSearchGroup={setShowSearchGroup}
				/>
			)}
			{showSearchAudition && (
				<SearchAudition
					setShowSearch={setShowSearch}
					setShowSearchAudition={setShowSearchAudition}
				/>
			)}
			{showSearchTeacher && (
				<SearchTeachers
					setShowSearch={setShowSearch}
					setShowSearchTeacher={setShowSearchTeacher}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	containerSearch: {
		backgroundColor: '#F7F7F7',
		alignItems: 'center',
		paddingHorizontal: 12,
		height,
		flex: 1
	},
	searchCont: {
		marginTop: 10,
		width: '100%'
	},
	searchBlock: {
		borderRadius: 16,
		backgroundColor: '#e5e5ea',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		paddingVertical: 5,
		paddingHorizontal: 12
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
		width: '80%'
	},
	searchBlockInfo: {},
	searchCard: {},
	searchCardText: {},
	arrow: {},
	infoAboutSearchCont: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center'
	},
	infoAboutSearch: {}
});

export default Search;
