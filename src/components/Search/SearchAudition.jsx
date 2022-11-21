import React from 'react'
import styles from './SearchGroup.module.scss';
import Exit from '../../assets/Exit.svg';
import Computer from '../../assets/Computer.svg';

const SearchAudition = ({setShowSearch, setShowSearchAudition}) => {
  return (
    <div className={styles.SearchContainer}>
      <div className={styles.SearchTitle}>
        <button onClick={() => {setShowSearch(true); setShowSearchAudition(false)}}> <img src={Exit} alt='exit'/> <h1>Поиск</h1></button>
      </div>
      <div className={styles.SearchGroupInfo}>
        <div className={styles.SearchText}>
          <h1>АУДИТОРИЯ</h1>
          <h2>Д-301</h2>
          <span>Корпус Д, 3 этаж, ауд. 301</span>
        </div>
        <div className={styles.SearchImg}>
          <img src={Computer} alt='Computer'/>
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
                ПИ.1-21-1
						  </div>
					  </div>
				  </div>
        </div>
      </div>
  )
}

export default SearchAudition;