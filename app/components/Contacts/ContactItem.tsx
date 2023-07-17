import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
	StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import Avatar from './Avatar';
import { BlurView } from '@react-native-community/blur';
import { handleSelect } from '../../../assets/Functions';

const ContactItem = ({ user }) => {
	const navigation = useNavigation();
	const date = new Date();
	const currentUser = auth().currentUser;
	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			<Animatable.View
				style={{
					paddingVertical: 10,
					borderRadius: 20,
					marginBottom: 20,
					flex: 1
				}}
				animation='fadeIn'
				duration={1000}
				useNativeDriver>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						flex: 1
					}}>
					<TouchableOpacity
						onPress={() =>
							// @ts-ignore
							navigation.navigate('ContactInfo', { user })
						}
						style={{
							display: 'flex',
							flexDirection: 'row',
							flex: 1
						}}>
						<Avatar user={user} size={50} />
						<View style={{ flex: 1 }}>
							<Text
								style={{
									fontFamily: 'Montserrat-Bold',
									fontSize: 14,
									marginBottom: 5,
									color: '#F7F7F7'
								}}>
								{user.profileName || user.displayName}
							</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									flex: 1
								}}>
								<Text
									ellipsizeMode='tail'
									numberOfLines={1}
									style={{
										fontFamily: 'Montserrat-Regular',
										color: '#8E8E93',
										fontSize: 14,
										flex: 3.5,
										paddingRight: 10
									}}>
									{user.univ}, {user.group}
								</Text>
								<Text
									style={{
										fontFamily: 'Montserrat-Regular',
										color: '#b3b3b3',
										fontSize: 13,
										marginBottom: 5,
										flex: 1
									}}>
									{date.getHours()}:{date.getMinutes()}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							handleSelect(
								user,
								setIsLoading,
								currentUser,
								navigation
							)
						}>
						<Ionicons
							size={35}
							name='md-chatbubbles-sharp'
							color={'#3eb59f'}
						/>
					</TouchableOpacity>
				</View>
			</Animatable.View>
			{isLoading ? (
				<>
					<BlurView
						style={styles.absolute}
						blurType='dark'
						blurAmount={3}
					/>
					<ActivityIndicator
						size='large'
						color='#1E1E1F'
						style={{ backgroundColor: '#4B4B4B' }}
					/>
				</>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});

export default ContactItem;
