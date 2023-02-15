import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';

import { images } from '../../../assets/globalImages';
import Avatar from './Avatar';

const ContactProfileHeader = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const user = route.params.user;
	const currentUser = auth().currentUser;
	const [selectEdit, setSelectEdit] = useState(false);

	return (
		<View
			style={{
				backgroundColor: '#F7F7F7',
				borderBottomColor: 'rgba(60, 60, 67, 0.13)',
				borderBottomWidth: 1,
				paddingHorizontal: 20,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
			<TouchableOpacity
				style={{
					backgroundColor: '#F7F7F7',
					marginTop: 10,
					paddingBottom: 10,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
				onPress={() => navigation.goBack()}>
				<View
					style={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row'
					}}>
					<Image
						source={images.arrowLeft}
						style={{
							width: 10,
							height: 20
						}}
					/>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginLeft: 20,
							alignItems: 'center'
						}}>
						<Text
							style={{
								fontFamily: 'Montserrat-SemiBold',
								fontSize: 19,
								lineHeight: 25,
								color: '1E1E1F'
							}}>
							{user.profileName || user.displayName}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-end',
					position: 'relative'
				}}>
				{user.uid === currentUser.uid && (
					<TouchableOpacity
						style={{
							backgroundColor: '#d1d1d1b2',
							padding: 7,
							borderRadius: 50
						}}
						onPress={() => setSelectEdit(!selectEdit)}>
						<Entypo name='dots-three-vertical' size={20} />
					</TouchableOpacity>
				)}
				{selectEdit && (
					<Animatable.View
						animation='fadeIn'
						duration={400}
						useNativeDriver
						style={{ minWidth: 40 }}>
						<TouchableOpacity
							style={{
								position: 'absolute',
								right: 0,
								left: -250,
								top: 20,
								backgroundColor: '#d1d1d1',
								minWidth: 100,
								borderRadius: 10,
								paddingHorizontal: 20,
								paddingVertical: 20,
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}
							onPress={() => {
								navigation.navigate('MenuStack', {
									screen: 'UserInfo',
									initial: false
								});
								setSelectEdit(false);
							}}>
							<FontAwesome5
								size={30}
								name='user-circle'
								style={{ marginRight: 10 }}
								color={'#3eb59f'}
							/>
							<Text
								style={{
									fontFamily: 'Montserrat-Medium',
									color: '#1E1E1F',
									fontSize: 16
								}}>
								Редактировать профиль
							</Text>
						</TouchableOpacity>
					</Animatable.View>
				)}
			</View>
		</View>
	);
};

export default ContactProfileHeader;
