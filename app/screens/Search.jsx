import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TextInput
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
					<View style={styles.titleCont}>
						<Text style={styles.titleSearch}>Поиск</Text>
					</View>
					<View style={styles.searchCont}>
						<View style={styles.searchBlock}>
							<SearchImg width={12} height={12} />
							<View style={styles.inputBlock}>
								<TextInput
									onChangeText={text => {
										setSearchValue(text);
										setShowGroups(!showGroups);
										setShowAudition(!showAudition);
										setShowTeachers(!showTeachers);
									}}
									value={searchValue}
									placeholder='Поиск'
								/>
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
								<Text>
									Находите информацию о расписаниях преподавателей, группах и
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
	containerSearch: {},
	titleCont: {},
	titleSearch: {},
	searchCont: {},
	searchBlock: {},
	inputBlock: {},
	searchBlockInfo: {},
	searchCard: {},
	searchCardText: {},
	arrow: {},
	infoAboutSearchCont: {},
	infoAboutSearch: {}
});

export default Search;
