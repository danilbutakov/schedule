import { TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputChat = () => {
	const [msgValue, setMsgValue] = useState('');
	return (
		<View
			style={{
				padding: 10,
				backgroundColor: '#1E1E1F',
				alignSelf: 'center',
				width: '100%',
				flex: 0,
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'row'
			}}>
			<View style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
				<TouchableOpacity style={{ marginRight: 20 }}>
					<Entypo name='attachment' size={25} color={'#e5e5ea'} />
				</TouchableOpacity>
				<TextInput
					placeholder='Введите сообщение...'
					style={{
						fontSize: 14,
						fontFamily: 'Montserrat-Medium',
						lineHeight: 20,
						paddingRight: 10,
						flex: 1,
						color: '#e5e5ea'
					}}
					value={msgValue}
					onChangeText={text => setMsgValue(text)}
					placeholderTextColor={'#e5e5ea'}
					multiline={true}
				/>
			</View>
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				{msgValue !== '' ? (
					<TouchableOpacity
						onPress={() => setMsgValue('')}
						style={{ marginLeft: 15 }}>
						<Ionicons name='ios-send' size={25} color={'#e5e5ea'} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={{ marginLeft: 15 }}>
						<Feather name='camera' size={25} color={'#e5e5ea'} />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default InputChat;
