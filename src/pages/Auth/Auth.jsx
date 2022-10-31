import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from '../../components/Login/Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Auth = () => {
	const [user, loading] = useAuthState(auth);
	// const [mynumber, setnumber] = useState('');
	// const [otp, setotp] = useState('');
	// const [show, setshow] = useState(false);
	// const [final, setfinal] = useState('');

	// // Sent OTP
	// const signin = () => {
	// 	if (mynumber === '' || mynumber.length < 10) return;

	// 	let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
	// 	auth
	// 		.signInWithPhoneNumber(mynumber, verify)
	// 		.then((result) => {
	// 			setfinal(result);
	// 			alert('code sent');
	// 			setshow(true);
	// 		})
	// 		.catch((err) => {
	// 			alert(err);
	// 			window.location.reload();
	// 		});
	// };

	// // Validate OTP
	// const ValidateOtp = () => {
	// 	if (otp === null || final === null) return;
	// 	final
	// 		.confirm(otp)
	// 		.then((result) => {
	// 			// success
	// 		})
	// 		.catch((err) => {
	// 			alert('Wrong code');
	// 		});
	// };
	const navigate = useNavigate();

	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log(result.user);
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	if (user) {
	// 		navigate('/home');
	// 	} else {
	// 		navigate('/onBoard');
	// 	}
	// 	if (!user) {
	// 		navigate('/auth');
	// 	} else {
	// 		navigate('/home');
	// 	}
	// }, [user]);

	return (
		<div>
			<div>
				<h1>Введите название ВУЗа</h1>
				{/* <button onClick={GoogleLogin}>Google</button> */}
			</div>
		</div>
	);
};

export default Auth;
