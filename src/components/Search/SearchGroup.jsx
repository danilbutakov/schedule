import React from 'react'
import styles from './SearchGroup.module.scss';
import Exit from '../../assets/Exit.svg';
import Users from '../../assets/Users.svg';

const SearchGroup = ({setShowSearch, setShowSearchGroup}) => {
  return (
    <div className={styles.SearchContainer}>
      <div className={styles.SearchTitle}>
        <button onClick={() => {setShowSearch(true); setShowSearchGroup(false)}}> <img src={Exit} alt='exit'/> <h1>Поиск</h1></button>
      </div>
      <div className={styles.SearchGroupInfo}>
        <div className={styles.SearchText}>
          <h1>ГРУППА</h1>
          <h2>ПИ.1-21-1</h2>
          <span>Бакалавриат, 2 курс, очная форма</span>
        </div>
        <div className={styles.SearchImg}>
          <img src={Users} alt='users'/>
        </div>
      </div>
      <div className={styles.SearchDate}>
        <h1>ЧЕТВЕРГ, 27 ОКТЯБРЯ</h1>
      </div>
      <div className={styles.pairsContainer}>
        <div className={styles.pair}>
					<div className={styles.headPair}>
					  <div className={styles.headLeft}>
						  <h3 className={styles.type}>Лабораторная</h3>
					  </div>
					  <span className={styles.time}>
						  13:50 - 15:20
					  </span>
				  </div>
				  <div className={styles.infoPair}>
					  <div className={styles.namePair}>ООП</div>
						  <div className={styles.teachPair}>
                Молчанова Е.И.
						  </div>
						  <div className={styles.classRoomPair}>
                Д-418
						  </div>
					  </div>
				  </div>
        </div>
      </div>
  )
}

export default SearchGroup;