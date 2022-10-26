import styles from './Search.module.scss';
import React, { useState } from 'react';
import { groups } from '../../utils/Groups';
import SearchCard from './SearchCard';
import search from '../../assets/search.svg';
import deleteBtn from '../../assets/delete-btn.svg';
const Search = () => {
	const [searchValue, setSearchValue] = useState('');

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};
	return (
		<div className='search'>
			<div className='searchBlock'>
				<h2>Поиск</h2>
				<div className={styles.searchBlock}>
					<img src={search} alt='Search' />
					{searchValue && (
						<img
							onClick={() => setSearchValue('')}
							className='deleteSearchValue'
							src={deleteBtn}
							alt='Clear'
						/>
					)}
					<input
						onChange={onChangeSearchInput}
						value={searchValue}
						placeholder='Поиск'
					/>
					<div className='infoAboutSearch'>
						Находите информацию о расписаниях преподавателей, группах и
						аудиториях
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
