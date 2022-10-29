import styles from './Search.module.scss';
import React, { useState, useEffect } from 'react';

import { groups } from '../../utils/Groups';
import { audition } from '../../utils/Audition';
import { teachers } from '../../utils/Teachers';
import search from '../../assets/search.svg';
import deleteBtn from '../../assets/delete-btn.svg';
import arrow from '../../assets/Arrow.svg';
const Search = () => {
	const [searchValue, setSearchValue] = useState('');
	const [showGroups, setShowGroups] = useState(false);
	const [showAudition, setShowAudition] = useState(false);
	const [showTeachers, setShowTeachers] = useState(false);

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
		setShowGroups(!showGroups);
		setShowAudition(!showAudition);
	};

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
		<div className={styles.containerSearch}>
			<div className={styles.titleCont}>
				<h1 className={styles.titleSearch}>Поиск</h1>
			</div>
			<div className={styles.searchCont}>
				<div className={styles.searchBlock}>
					<img src={search} alt='Search' />
					<div className={styles.inputBlock}>
						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							placeholder='Поиск'
						/>
						{searchValue && (
							<img
								onClick={() => setSearchValue('')}
								className={styles.clear}
								src={deleteBtn}
								alt='Clear'
							/>
						)}
					</div>
				</div>
			</div>
			{showGroups ? (
				groups
					.filter((group) =>
						group.name.toLowerCase().includes(searchValue.toLowerCase()),
					)
					.map((group, index) => (
						<div key={index} className={styles.searchBlockInfo}>
							<div className={styles.searchCard}>
								<div className={styles.searchCardText}>
									<h2>{group.name}</h2>
									<span>
										{group.qualification}, {group.course},{' '}
										{group.typeOfEducation}
									</span>
								</div>
								<div className={styles.arrow}>
									<img src={arrow} alt='Arrow' />
								</div>
							</div>
						</div>
					))
			) : (
				<div className={styles.infoAboutSearchCont}>
					<div className={styles.infoAboutSearch}>
						<p>
							Находите информацию о расписаниях преподавателей, группах и
							аудиториях
						</p>
					</div>
				</div>
			)}
			{showAudition &&
				audition
					.filter((auditionItem) =>
						auditionItem.name
							.toLowerCase()
							.includes(searchValue.toLowerCase()),
					)
					.map((auditionItem, index) => (
						<div key={index} className={styles.searchBlockInfo}>
							<div className={styles.searchCard}>
								<div className={styles.searchCardText}>
									<h2>{auditionItem.name}</h2>
									<span>
										Корпус {auditionItem.qualification}, этаж{' '}
										{auditionItem.course}, ауд.{' '}
										{auditionItem.typeOfEducation}
									</span>
								</div>
								<div className={styles.arrow}>
									<img src={arrow} alt='Arrow' />
								</div>
							</div>
						</div>
					))}
			{showAudition &&
				teachers
					.filter((teacher) =>
						teacher.name
							.toLowerCase()
							.includes(searchValue.toLowerCase()),
					)
					.map((teacher, index) => (
						<div key={index} className={styles.searchBlockInfo}>
							<div className={styles.searchCard}>
								<div className={styles.searchCardText}>
									<h2>{teacher.name}</h2>
									<span>
										Кафедра «{teacher.qualification}», ауд.{' '}
										{teacher.aud}
									</span>
								</div>
								<div className={styles.arrow}>
									<img src={arrow} alt='Arrow' />
								</div>
							</div>
						</div>
					))}
		</div>
	);
};

export default Search;
