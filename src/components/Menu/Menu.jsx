import React from 'react';
import { Link } from 'react-router-dom';
import AnimationLayout from '../../animations/AnimationLayout';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../Schedule/Schedule.module.scss';

const Menu = () => {
	const [user, loading] = useAuthState(auth);

	return (
		<AnimationLayout>
			<div className={styles.con}>
				<div className={styles.header}>
					<div className={styles.titleContainer}>
						<div className={styles.title}></div>
						<h2>Меню</h2>
					</div>
				</div>
				<div className={styles.upLine}></div>
				<div className={styles.info}>
					<span>Профиль, {user.email}</span>
				</div>
				<Link to={'/loadingPage'}>
					<span onClick={() => auth.signOut()}>Выйти</span>
				</Link>
			</div>
		</AnimationLayout>
	);
};

export default Menu;
