import {
	ActivityIndicator,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';
import { pickImage, uploadImage } from '../../utils/Functions';
import { doc, setDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { DismissKeyboardView } from '../../hooks/HideKeyBoard';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

const ProfileLogoInfo = ({
	univ,
	group,
	role,
	profileName,
	setProfileName,
	image,
	setImage
}) => {
	const { user } = useAuth();
	const [changeButton, setChangeButton] = useState(styles.conBtn);
	const [changeBtnText, setChangeBtnText] = useState(styles.btnText);
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		if (profileName !== '' && image) {
			setChangeButton(styles.conBtnActive);
			setChangeBtnText(styles.btnTextActive);
		} else {
			setChangeButton(styles.conBtn);
			setChangeBtnText(styles.btnText);
		}
	}, [profileName, image]);

	const handleProfilePicture = async () => {
		const result = await pickImage();
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const createProfile = async () => {
		if (profileName !== '' && image !== null) {
			setIsLoading(true);
			let photoURL;
			if (image) {
				const { url } = await uploadImage(
					image,
					`images/${user.uid}`,
					'profilePicture'
				);
				photoURL = url;
			}
			const userData = {
				profileName: profileName,
				email: user.email,
				univ: univ,
				group: group,
				role: role,
				weekType: ''
			};
			if (photoURL) {
				userData.photoURL = photoURL;
			}
			await Promise.all([
				auth().currentUser.updateProfile(userData),
				setDoc(doc(fs, 'users', user.uid), {
					...userData,
					uid: user.uid
				})
			])
				.then(() => {
					console.log('good authorized');
					setIsLoading(false);
					navigation.navigate('Home');
					setProfileName('');
				})
				.catch(error => {
					setIsLoading(false);
					console.log(error);

					setProfileName('');
				})
				.finally(() => {
					setIsLoading(false);

					setProfileName('');
				});
		}
	};

	return (
		<DismissKeyboardView style={styles.containerKeyboard}>
			<View style={styles.con}>
				<View style={styles.content}>
					<Text style={styles.title}>
						{user.displayName === null
							? 'Введите ваши данные'
							: 'Выберите фотографию'}
					</Text>
					{isLoading ? (
						<ActivityIndicator
							size='large'
							color='#1E1E1F'
							style={{
								marginTop: 20
							}}
						/>
					) : null}
					<TextInput
						value={profileName}
						onChangeText={profileName =>
							setProfileName(profileName)
						}
						placeholder='Например Иван'
						style={styles.inputVuz}
					/>
					<TouchableOpacity
						onPress={handleProfilePicture}
						style={{ alignSelf: 'center', marginTop: 30 }}>
						<View style={{}}>
							{!image && (
								<MaterialIcons
									name='add-a-photo'
									size={60}
									color={'gray'}
									style={{
										backgroundColor: '#EEEDE5',
										padding: 25,
										borderRadius: 50
									}}
								/>
							)}
							{image && (
								<Image
									source={{ uri: image }}
									style={{
										width: 150,
										height: 150,
										borderRadius: 100
									}}
								/>
							)}
						</View>
					</TouchableOpacity>
					{}
				</View>
				<TouchableOpacity
					style={styles.container}
					onPress={createProfile}>
					<View style={changeButton}>
						<Text style={changeBtnText}>Продолжить</Text>
					</View>
				</TouchableOpacity>
			</View>
		</DismissKeyboardView>
	);
};

export default ProfileLogoInfo;

const styles = StyleSheet.create({
	containerKeyboard: {
		height,
		flex: 1
	},
	con: {
		backgroundColor: 'white',
		paddingVertical: 20,
		paddingHorizontal: 20,
		flex: 1
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	content: {
		flex: 1
	},
	title: {
		color: '#1E1E1F',
		fontSize: 24,
		lineHeight: 32,
		fontFamily: 'Montserrat-SemiBold'
	},
	inputVuz: {
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		backgroundColor: '#FFFFFF',
		padding: 10,
		marginTop: 50,
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium'
	},
	container: {
		alignItems: 'center'
	},
	conBtn: {
		backgroundColor: '#F2F2F7',
		padding: 17,
		alignItems: 'center',
		borderRadius: 16,
		width: '100%'
	},
	conBtnActive: {
		padding: 17,
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: '#1E1E1F',
		width: '100%'
	},
	btnText: {
		fontSize: 17,
		lineHeight: 20,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-SemiBold'
	},
	btnTextActive: {
		fontSize: 17,
		lineHeight: 20,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-SemiBold'
	}
});
