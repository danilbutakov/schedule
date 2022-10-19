import React from 'react';
import { Link } from 'react-router-dom';
// import Swiper core and required modules
import { Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from './OnBoard.module.scss';
import logo1 from '../../assets/LogoOnboarding.svg';
import logo2 from '../../assets/LogoOnboarding2.svg';

const OnBoard = () => {
	// const slides = [
	// 	{
	// 		img: logo1,
	// 		title: 'Привет! Это новое приложение Schedule',
	// 		subTitle: 'Просматривайте расписание занятий без ошибок Вуза',
	// 	},
	// 	{
	// 		img: logo2,
	// 		title: 'Быстрый поиск по университету',
	// 		subTitle:
	// 			'Узнавайте информацию о группах, преподавателях и свободных аудиториях',
	// 	},
	// ];

	return (
		<div className={styles.con}>
			<div className={styles.swiper}>
				<Swiper
					modules={[Pagination, A11y]}
					slidesPerView={1}
					pagination={{ clickable: true }}
					className={styles.innerSwiper}>
					<SwiperSlide className={styles.slide}>
						<div className={styles.conImg}>
							<img src={logo1} alt='LogoOnboarding' />
						</div>
						<div className={styles.conText}>
							<h1 className={styles.title}>
								Привет! Это новое приложение Schedule
							</h1>
							<h2 className={styles.subTitle}>
								Просматривайте расписание занятий без ошибок Вуза
							</h2>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.slide}>
						<div className={styles.conImg}>
							<img src={logo2} alt='LogoOnboarding' />
						</div>
						<div className={styles.conText}>
							<h1 className={styles.title}>
								Быстрый поиск по университету
							</h1>
							<h2 className={styles.subTitle}>
								Узнавайте информацию о группах, преподавателях и
								свободных аудиториях
							</h2>
						</div>
					</SwiperSlide>
					{/* {slides.map((slide, index) => (
						<SwiperSlide key={index} className={styles.slide}>
							<div className={styles.conImg}>
								<img src={slide.img} alt='LogoOnboarding' />
							</div>
							<div className={styles.conText}>
								<h1 className={styles.title}>{slide.title}</h1>
								<h2 className={styles.subTitle}>{slide.subTitle}</h2>
							</div>
						</SwiperSlide>
					))} */}
				</Swiper>
			</div>
			<Link to='/'>
				<button className={styles.btn}>Войти</button>
			</Link>
		</div>
	);
};

export default OnBoard;
