import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './OnBoard.module.scss';
import Login from '../Login/Login.jsx';
import SwiperComponent from '../Swiper/SwiperComponent';

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
				timeout={300}
				unmountOnExit>
				<div className={styles.con}>
					{!showLogin && (
						<>
							<div className={styles.swiper}>
								<SwiperComponent />
							</div>
							<button
								onClick={() => {
									setShowLogin(!showLogin);
									setShowSwiper(false);
								}}
								className={styles.btn}>
								Войти
							</button>
						</>
					)}
				</div>
			</CSSTransition>

			<CSSTransition
				classNames={{
					enter: styles.enter,
					enterDone: styles.enterActive,
					exit: styles.exit,
					exitActive: styles.exitActive,
				}}
				in={showLogin}
				timeout={300}
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
