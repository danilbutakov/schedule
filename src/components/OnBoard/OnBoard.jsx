import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';

import styles from './OnBoard.module.scss';
import Login from '../Login/Login.jsx';
import SwiperComponent from '../Swiper/SwiperComponent';
import { Link } from 'react-router-dom';

const OnBoard = () => {
	const [showLogin, setShowLogin] = useState(false);
	const [showSwiper, setShowSwiper] = useState(true);

	return (
		<>
			<CSSTransition
				classNames={{
					enter: styles.enterSwiper,
					enterDone: styles.enterActiveSwiper,
					exit: styles.exitSwiper,
					exitActive: styles.exitActiveSwiper,
				}}
				in={showSwiper}
				timeout={0}
				unmountOnExit>
				<div className={styles.con}>
					{!showLogin && (
						<>
							<div className={styles.swiper}>
								<SwiperComponent />
							</div>
							<Link to={'/onBoardLogin'}>
								<button
									onClick={() => {
										setShowLogin(!showLogin);
										setShowSwiper(false);
									}}
									className={styles.btn}>
									Войти
								</button>
							</Link>
						</>
					)}
				</div>
			</CSSTransition>

			<CSSTransition
				classNames={{
					enter: styles.enterLogin,
					enterDone: styles.enterActiveLogin,
					exit: styles.exitLogin,
					exitActive: styles.exitActiveLogin,
				}}
				in={showLogin}
				timeout={100}
				unmountOnExit>
				<div className={styles.loginShape}>
					<div className={styles.loginMain}>
						<Login
							setShowLogin={setShowLogin}
							setShowSwiper={setShowSwiper}
						/>
					</div>
				</div>
			</CSSTransition>
		</>
	);
};

export default OnBoard;
