import { View, TouchableOpacity, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	where
} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../../firebase';
import Avatar from '../../components/Contacts/Avatar';
import { ChatContext } from '../../utils/ChatContext';
import Chat from './Chat';
import { useNavigation } from '@react-navigation/native';

const Chats = () => {
	const currentUser = auth().currentUser;
	const [chatUser, setChatUser] = useState();

	const fetchData = async () => {
		const q = query(
			collection(fs, 'users'),
			where('email', '==', currentUser.email)
		);

		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setChatUser(newData);
		});
	};

	useEffect(() => {
		fetchData();
	}, [currentUser]);

	const [chats, setChats] = useState([]);
	const { dispatch } = useContext(ChatContext);
	const navigation = useNavigation();

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(fs, 'userChats', currentUser.uid), doc => {
				setChats(doc.data());
			});

			return () => unsub();
		};
		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = u => {
		dispatch({ type: 'CHANGE_USER', payload: u });
	};

	// {chats !== undefined &&
	//    Object.entries(chats).map(chat => {
	//       if (chat[1].displayName) {
	//          return (
	//             <TouchableOpacity
	//                // onPress={() => navigation.navigate('Chat', { user, chat })}
	//                onPress={() => handleSelect(chat[1])}
	//                key={chat[0]}
	//                style={{
	//                   backgroundColor: '#FFFFFF',
	//                   borderRadius: 150,
	//                   padding: 5,
	//                   marginBottom: 20
	//                }}>
	//                <View
	//                   style={{
	//                      flexDirection: 'row',
	//                      justifyContent: 'space-between',
	//                      alignItems: 'center'
	//                   }}>
	//                   <View
	//                      style={{ flexDirection: 'row', alignItems: 'center' }}>
	//                      <Avatar user={chat[1]} size={50} />
	//                      <View
	//                         style={{ flexDirection: 'row', alignItems: 'center' }}>
	//                         <View style={{ flexDirection: 'column' }}>
	//                            <Text
	//                               style={{
	//                                  fontFamily: 'Montserrat-SemiBold',
	//                                  fontSize: 16
	//                               }}>
	//                               {chat[1].displayName}
	//                            </Text>
	//                            <View
	//                               style={{
	//                                  flexDirection: 'row',
	//                                  alignItems: 'center'
	//                               }}>
	//                               {chat[1]?.lastMessage && (
	//                                  <View
	//                                     style={{
	//                                        flexDirection: 'row',
	//                                        marginTop: 7
	//                                     }}>
	//                                     <Text
	//                                        style={{
	//                                           fontSize: 14,
	//                                           color: '#81F2DF',
	//                                           fontFamily: 'Montserrat-Regular'
	//                                        }}>
	//                                        Вы: {''}
	//                                     </Text>
	//                                     <Text
	//                                        style={{
	//                                           fontFamily: 'Montserrat-Regular',
	//                                           fontSize: 14,
	//                                           maxWidth: 160
	//                                        }}
	//                                        numberOfLines={1}
	//                                        ellipsizeMode='tail'>
	//                                        {/* {description} */}
	//                                     </Text>
	//                                  </View>
	//                               )}
	//                               {chat[1]?.date && (
	//                                  <View style={{ marginTop: 7, marginLeft: 10 }}>
	//                                     <Text
	//                                        style={{
	//                                           fontFamily: 'Montserrat-Medium',
	//                                           color: '#A5A5A5'
	//                                        }}>
	//                                        {new Date(time.seconds * 1000)
	//                                           .toLocaleTimeString()
	//                                           .replace(/(.*)\D\d+/, '$1')}
	//                                     </Text>
	//                                  </View>
	//                               )}
	//                            </View>
	//                         </View>
	//                      </View>
	//                   </View>
	//                </View>
	//             </TouchableOpacity>
	//          );
	//       } else {
	//          return null;
	//       }
	//    })}

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 10
			}}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Chat', { chatUser })}>
				<View>
					<Text>ЧАТ</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Chats;
