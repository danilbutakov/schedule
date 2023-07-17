import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';

import Avatar from './AvatarChat';
import { deleteChat } from '../../store/slices/deletechatSlice';
// @ts-ignore
import Arrow from '../../../assets/svgUtils/Arrow.svg';

const ChatHeader = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const dispatch = useDispatch();
	const [selectEdit, setSelectEdit] = useState(false);

	const handleDeleteChat = async () => {
		try {
			// @ts-ignore
			dispatch(deleteChat(route));
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View
			style={{
				backgroundColor: '#1E1E1F',
				borderBottomColor: '#F7F7F7',
				borderBottomWidth: 1,
				paddingTop: 10,
				paddingBottom: 10,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingHorizontal: 15
			}}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Arrow
						style={{
							width: 25,
							height: 25,
							color: '#F7F7F7',
							transform: [{ rotateY: '180deg' }]
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						// @ts-ignore
						navigation.navigate('ContactInfo', {
							user: route.params['userB']
						})
					}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginLeft: 20,
							alignItems: 'center'
						}}>
						<Avatar
							size={40}
							image={String(route.params['userB'].photoURL)}
						/>
						<Text
							style={{
								fontFamily: 'Montserrat-SemiBold',
								fontSize: 19,
								lineHeight: 25,
								color: '#F7F7F7'
							}}>
							{route.params['userB']?.profileName ||
								route.params['userB']?.displayName}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={{
					backgroundColor: '#d1d1d1b2',
					padding: 7,
					borderRadius: 50,
					position: 'absolute',
					right: 15,
					top: 14
				}}
				onPress={() => setSelectEdit(!selectEdit)}>
				<Entypo name='dots-three-vertical' size={20} />
			</TouchableOpacity>
			{selectEdit && (
				<Animatable.View
					animation='fadeIn'
					duration={400}
					useNativeDriver>
					<TouchableOpacity
						style={{
							position: 'absolute',
							right: 0,
							left: -250,
							top: 35,
							backgroundColor: '#d1d1d1',
							borderRadius: 10,
							paddingHorizontal: 10,
							paddingVertical: 10,
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center'
						}}
						onPress={() => {
							handleDeleteChat().then(() => {
								// @ts-ignore
								navigation.navigate('chats');
								Alert.alert('Вы успешно удалили чат');
							});
							setSelectEdit(false);
						}}>
						<MaterialCommunityIcons
							size={25}
							name='delete-forever'
							style={{ marginRight: 10 }}
							color={'#3eb59f'}
						/>
						<Text
							style={{
								fontFamily: 'Montserrat-Medium',
								color: '#1E1E1F',
								fontSize: 16
							}}>
							Удалить чат
						</Text>
					</TouchableOpacity>
				</Animatable.View>
			)}
		</View>
	);
};

export default ChatHeader;
