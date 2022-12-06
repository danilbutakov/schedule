import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Avatar from './Avatar';

const ContactItem = ({ type, description, user, time, room, image }) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('Chat', { user, room, image })}
			style={{
				paddingVertical: 10,
				borderRadius: 20,
				marginBottom: 20
			}}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					<Avatar user={user} size={type === 'contacts' ? 80 : 60} />
					<View>
						<Text
							style={{
								fontFamily: 'Montserrat-Bold',
								fontSize: 15,
								marginBottom: 5
							}}>
							{user.profileName || user.displayName}
						</Text>
						{description && (
							<View style={{ marginTop: -5 }}>
								<Text
									style={{
										fontFamily: 'Montserrat-Medium',
										color: '#8E8E93',
										fontSize: 17
									}}>
									{description}
								</Text>
							</View>
						)}
					</View>
				</View>
				{time && (
					<View>
						<Text
							style={{
								color: '#8E8E93',
								fontSize: 13,
								fontFamily: 'Montserrat-Medium'
							}}>
							{new Date(time.seconds * 1000).toLocaleDateString()}
						</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default ContactItem;
