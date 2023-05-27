import {
	ActivityIndicator,
	Alert,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import { pickImage, uploadImage } from '../../utils/Functions';
import useAuth from '../../hooks/useAuth';
import { fs } from '../../../firebase';
import { BlurView } from '@react-native-community/blur';
import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';

const { height } = Dimensions.get('screen');

const UserInfoScreen = () => {
	// @ts-ignore
	const { user } = useAuth();
	const auth = getAuth();

	const [group, setGroup] = useState('');
	const [univ, setUniv] = useState('');
	const [userName, setUserName] = useState('');
	const [newImage, setNewImage] = useState(null);
	const [existsParams, setExistsParams] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [userProvider, setUserProvider] = useState('');

	const userRef = doc(fs, 'users', user.uid);

	useEffect(() => {
		setUserProvider(user.providerData.map(d => String(d.providerId)));
	}, [user]);

	const { profileItems, image, setImage } = useFetchUserDataItems();

	const handleUpdatePassword = async email => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				Alert.alert('Письмо со сменой пароля успешно отправлено');
			})
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log(errorCode);
				Alert.alert(errorMessage);
			});
	};

	const handleUpdateImage = async newImage => {
		await updateDoc(userRef, {
			photoURL: newImage
		});
	};

	const handleProfilePicture = async () => {
		const result = await pickImage();
		if (!result.canceled) {
			setNewImage(result.assets[0].uri);
			setImage(profileItems);
		}
	};

	const handleUpdateProfile = async (
		group: string,
		univ: string,
		userName: string,
		newImage: string
	) => {
		try {
			setIsLoading(true);

			if (group !== '' && group !== ' ') {
				await updateDoc(userRef, {
					group: group
				});
			}

			if (univ !== '' && univ !== ' ') {
				await updateDoc(userRef, {
					univ: univ
				});
			}

			if (userName !== '' && userName !== ' ') {
				await updateDoc(userRef, {
					profileName: userName
				});
			}

			if (newImage) {
				let photoUrl;
				const { url } = await uploadImage(
					newImage,
					`images/${user.uid}`,
					'profilePicture'
				);
				photoUrl = url;
				if (photoUrl) {
					setImage(photoUrl);
					await user.updateProfile({ photoURL: photoUrl });
					newImage ? await handleUpdateImage(newImage) : null;
				}
			}
		} catch (e) {
			console.log(e);
			setIsLoading(false);
		} finally {
			Alert.alert('Вы успешно обновили профиль');
			setIsLoading(false);
			setUserName('');
			setUniv('');
			setGroup('');
			setNewImage(null);

			useFetchUserDataItems();
		}
	};

	useEffect(() => {
		if (
			(group !== '' && group !== ' ') ||
			(univ !== '' && univ !== ' ') ||
			(userName !== '' && userName !== ' ') ||
			newImage !== null
		) {
			setExistsParams(true);
		} else {
			setExistsParams(false);
		}
	}, [group, univ, userName, newImage]);

	return (
		<View
			style={{
				height,
				backgroundColor: '#F7F7F7',
				display: 'flex',
				flexDirection: 'column',
				width: '100%'
			}}>
			<View
				style={{
					paddingHorizontal: 20,
					display: 'flex',
					backgroundColor: '#ffffff',
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					paddingVertical: 20
				}}>
				{profileItems.map((item, key) => {
					if (item.role || item.group || item.univ) {
						return (
							<View
								key={key}
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between'
								}}>
								<View
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row'
									}}>
									<Image
										source={{
											uri: item.photoURL || user.photoURL
										}}
										style={{
											width: 80,
											height: 80,
											borderRadius: 80
										}}
									/>
									<View
										style={{
											display: 'flex',
											flexDirection: 'column',
											marginLeft: 15
										}}>
										<Text
											style={{
												fontFamily: 'Montserrat-Bold',
												fontSize: 15,
												lineHeight: 20,
												maxWidth: 200
											}}>
											{item.profileName}
										</Text>
										<Text
											style={{
												fontSize: 14,
												lineHeight: 20,
												color: 'rgba(60, 60, 67, 0.6)',
												fontFamily: 'Montserrat-Medium',
												maxWidth: 200
											}}>
											{item.email}
										</Text>
									</View>
								</View>
								{existsParams ? (
									<TouchableOpacity
										style={{
											display: 'flex',
											paddingLeft: 10
										}}
										onPress={() => {
											handleUpdateProfile(
												group,
												univ,
												userName,
												newImage
											);
										}}>
										<AntDesign
											name='checkcircle'
											size={30}
											color={'#3eb59f'}
										/>
									</TouchableOpacity>
								) : (
									<View
										style={{
											display: 'flex',
											paddingLeft: 10
										}}>
										<AntDesign
											name='checkcircle'
											size={30}
											color={'rgba(62, 181, 159, 0.56)'}
										/>
									</View>
								)}
							</View>
						);
					}
				})}
			</View>
			<View
				style={{
					display: 'flex',
					flex: 1,
					backgroundColor: '#ffffff',
					marginTop: 30,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20
				}}>
				<FlatList
					style={{ marginBottom: 10 }}
					data={profileItems}
					renderItem={({ item }) => (
						<Animatable.View
							style={styles.infoCon}
							animation='fadeIn'
							duration={1000}
							useNativeDriver>
							<View style={styles.infoMain}>
								<View style={styles.infoUser}>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between'
										}}>
										<Text
											style={{
												fontFamily:
													'Montserrat-SemiBold',
												fontSize: 17,
												lineHeight: 23
											}}>
											Группа
										</Text>
									</View>
									<TextInput
										style={styles.input}
										placeholder={item.group}
										value={group}
										onChangeText={text => setGroup(text)}
									/>
									<Text
										style={{
											fontFamily: 'Montserrat-SemiBold',
											fontSize: 17,
											lineHeight: 23
										}}>
										ВУЗ
									</Text>
									<TextInput
										style={styles.input}
										placeholder={item.univ}
										value={univ}
										onChangeText={text => setUniv(text)}
									/>
									<Text
										style={{
											fontFamily: 'Montserrat-SemiBold',
											fontSize: 17,
											lineHeight: 23
										}}>
										Ваше имя
									</Text>
									<TextInput
										style={styles.input}
										placeholder={item.profileName}
										value={userName}
										onChangeText={text => setUserName(text)}
									/>
									{userProvider.includes('password') && (
										<TouchableOpacity
											onPress={() => {
												handleUpdatePassword(
													user.email
												);
											}}>
											<View
												style={{
													padding: 17,
													alignItems: 'center',
													borderRadius: 16,
													backgroundColor: '#1E1E1F',
													marginBottom: 30
												}}>
												<Text
													style={{
														fontSize: 17,
														lineHeight: 20,
														color: '#FFFFFF',
														fontFamily:
															'Montserrat-SemiBold'
													}}>
													Изменить пароль
												</Text>
											</View>
										</TouchableOpacity>
									)}
									<Text
										style={{
											fontFamily: 'Montserrat-SemiBold',
											fontSize: 17,
											lineHeight: 23
										}}>
										Ваше фото профиля
									</Text>
									<TouchableOpacity
										onPress={handleProfilePicture}
										style={{
											alignSelf: 'center',
											marginTop: 30
										}}>
										{image ? (
											<Image
												source={{ uri: image }}
												style={{
													width: 150,
													height: 150,
													borderRadius: 100
												}}
											/>
										) : (
											<Image
												source={{ uri: newImage }}
												style={{
													width: 150,
													height: 150,
													borderRadius: 100
												}}
											/>
										)}
									</TouchableOpacity>
								</View>
							</View>
						</Animatable.View>
					)}
				/>
			</View>
			{isLoading ? (
				<>
					<BlurView
						style={styles.absolute}
						blurType='light'
						blurAmount={1}>
						<ActivityIndicator
							size='large'
							color='#1E1E1F'
							style={{ backgroundColor: '#F7F7F710' }}
						/>
					</BlurView>
				</>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	infoCon: {
		marginTop: 10,
		marginBottom: 130,
		paddingHorizontal: 20
	},
	infoMain: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	infoUser: {
		width: '100%'
	},
	btnCon: {
		paddingBottom: 20
	},
	input: {
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		backgroundColor: '#eeeeee',
		padding: 10,
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium',
		marginVertical: 15
	},
	change: {
		marginTop: 20
	},
	changeCon: {
		padding: 15,
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: '#1E1E1F',
		width: '100%'
	},
	changeText: {
		fontSize: 17,
		lineHeight: 20,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-SemiBold'
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});
export default UserInfoScreen;
