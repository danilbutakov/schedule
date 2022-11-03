import React from 'react';

// import Swiper core and required modules
import { Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from '../OnBoard/OnBoard.module.scss';
import logo from '../../assets/logo.svg';

const SwiperComponent = () => {
	const slides = [
		{
			img: logo,
			title: 'Расписание занятий в твоем кармане',
			subTitle: 'Просматривайте расписание занятий',
		},
		{
			img: logo,
			title: 'Быстрый поиск по университету',
			subTitle:
				'Узнавайте информацию о группах, преподавателях и аудиториях',
		},
	];

	return (
		<div>
			<Swiper
				modules={[Pagination, A11y]}
				slidesPerView={1}
				pagination={{ clickable: true }}
				className={styles.innerSwiper}>
				{slides.map((slide, index) => (
					<SwiperSlide key={index} className={styles.slide}>
						<div className={styles.conImg}>
							<div className={styles.LogoShape}>
								<img
									width={142}
									height={142}
									src={slide.img}
									alt='Logo'
									className={styles.shapeImg}
								/>
							</div>
						</div>
						<div className={styles.conText}>
							<h1 className={styles.title}>{slide.title}</h1>
							<h2 className={styles.subTitle}>{slide.subTitle}</h2>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SwiperComponent;
