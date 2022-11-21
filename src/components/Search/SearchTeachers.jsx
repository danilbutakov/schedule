import React from 'react'
import styles from './SearchGroup.module.scss';
import Exit from '../../assets/Exit.svg';
import Teacher from '../../assets/Teacher.svg';

const SearchTeachers = ({setShowSearch, setShowSearchTeacher}) => {
  return (
    <div className={styles.SearchContainer}>
      <div className={styles.SearchTitle}>
        <button onClick={() => {setShowSearch(true); setShowSearchTeacher(false)}}> <img src={Exit} alt='exit'/> <h1>Поиск</h1></button>
      </div>
      <div className={styles.SearchGroupInfo}>
        <div className={styles.SearchText}>
          <h1>ПРЕПОДАВАТЕЛЬ</h1>
          <h2>Попова Наталья Сергеевна </h2>
          <span>Кафедра: «Математика», ауд. Г-203</span>
        </div>
        <div className={styles.SearchImg}>
          <img src={Teacher} alt='Teacher'/>
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
              ПИ.1-20-1
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

export default SearchTeachers;