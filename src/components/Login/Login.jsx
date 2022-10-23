import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	EmailShareButton,
	FacebookShareButton,
	HatenaShareButton,
	InstapaperShareButton,
	LineShareButton,
	LinkedinShareButton,
	LivejournalShareButton,
	MailruShareButton,
	OKShareButton,
	PinterestShareButton,
	PocketShareButton,
	RedditShareButton,
	TelegramShareButton,
	TumblrShareButton,
	TwitterShareButton,
	ViberShareButton,
	VKShareButton,
	WhatsappShareButton,
	WorkplaceShareButton,
} from 'react-share';

import styles from './Login.module.scss';

const Login = ({ setShowSwiper, setShowLogin }) => {
	return (
		<div className={styles.loginContainer}>
			<div className={styles.header}>
				<h2
					onClick={() => {
						setShowSwiper(true);
						setShowLogin(false);
					}}
					className={styles.headerCancel}>
					Отменить
				</h2>
				<div className={styles.headerTitle}>Вход</div>
			</div>
			<div className={styles.upLine}></div>
			<div className={styles.main}>
				<div className={styles.mainContent}>
					<h1 className={styles.title}>Введите номер зачетки</h1>
					<h2 className={styles.subTitle}>
						Номер зачетной книжки находится на первой странице.
					</h2>
					<input
						className={styles.input}
						type='text'
						placeholder='Номер зачетки'
					/>
				</div>
				<Link to='/schedule'>
					<button
						onClick={() => {
							setShowSwiper(true);
							setShowLogin(false);
						}}
						className={styles.btn}>
						Войти
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;
