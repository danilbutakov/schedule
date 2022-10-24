import React from 'react';

import styles from './Login.module.scss';

import Login from './Login';

export const LoginContainer = () => {
	return (
		<div>
			<div className={styles.loginShape}>
				<div className={styles.loginMain}>
					<Login />
				</div>
			</div>
		</div>
	);
};
