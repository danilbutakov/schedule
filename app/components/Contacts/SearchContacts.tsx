import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fs } from '../../../firebase';
import Avatar from './Avatar';
// @ts-ignore
import SearchImg from '../../../assets/svgUtils/search.svg';
// @ts-ignore
import Delete from '../../../assets/svgUtils/delete.svg';
import { BlurView } from '@react-native-community/blur';
import { handleSelect } from '../../../assets/Functions';

const SearchContacts = () => {
	const currentUser = auth().currentUser;
	const navigation = useNavigation();

	const [searchValue, setSearchValue] = useState('');
	const newSearchValue = searchValue.toLowerCase();
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async () => {
		const q = query(
			collection(fs, 'users'),
			where('uid', '!=', currentUser.uid)
		);

		const unsubscribe = onSnapshot(q, querySnapshot => {
			setUsers(
				querySnapshot.docs.map(doc => {
					return { ...doc.data() };
				})
			);
			return () => unsubscribe();
		});

		if (searchValue.length > 2) {
			setFilteredUsers(
				users.filter(
					user =>
						user.profileName
							.toLowerCase()
							.includes(newSearchValue) ||
						user.email.toLowerCase().includes(newSearchValue)
				)
			);
		} else {
			setFilteredUsers([]);
		}
	};

	useEffect(() => {
		handleSearch();
	}, [searchValue]);

	return (
		<View style={styles.searchCont}>
			<View style={styles.searchBlock}>
				<View style={styles.inputBlock}>
					<View style={styles.leftBlock}>
						<SearchImg
							width={12}
							height={12}
							style={{ marginRight: 13 }}
						/>
						<TextInput
							style={styles.inputText}
							onChangeText={text => {
								setSearchValue(text);
							}}
							value={searchValue}
							placeholder='Поиск по имени или e-mail'
						/>
					</View>
					{searchValue && (
						<TouchableOpacity
							style={{ flex: 1 }}
							onPress={() => setSearchValue('')}>
							<Delete width={20} height={20} />
						</TouchableOpacity>
					)}
				</View>
			</View>
			{filteredUsers.length > 0 && (
				<ScrollView
					style={{
						backgroundColor: '#e5e5ea',
						borderRadius: 16,
						paddingTop: 20,
						paddingHorizontal: 10
					}}>
					{filteredUsers.map((user, key) => (
						<View
							style={{
								borderRadius: 20,
								marginBottom: 20,
								flex: 1
							}}
							key={key}>
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
										navigation.navigate('ContactInfo', {
											user
										})
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
												marginBottom: 5
											}}>
											{user.profileName}
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
													fontFamily:
														'Montserrat-Regular',
													color: '#8E8E93',
													fontSize: 14,
													flex: 3.5,
													paddingRight: 10
												}}>
												{user.email}
											</Text>
										</View>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										handleSelect(
											user,
											setIsLoading,
											currentUser,
											navigation
										).then(() => setSearchValue(''));
									}}>
									<Ionicons
										size={35}
										name='md-chatbubbles-sharp'
										color={'#3eb59f'}
									/>
								</TouchableOpacity>
							</View>
							<View
								style={{
									borderBottomWidth: 1,
									borderBottomColor: '#7c7772',
									paddingTop: 10
								}}></View>
						</View>
					))}
				</ScrollView>
			)}
			{isLoading ? (
				<>
					<BlurView
						style={styles.absolute}
						blurType='light'
						blurAmount={3}
					/>
					<ActivityIndicator
						size='large'
						color='#1E1E1F'
						style={{ backgroundColor: '#F7F7F7' }}
					/>
				</>
			) : null}
		</View>
	);
};

export default SearchContacts;

const styles = StyleSheet.create({
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	searchCont: {
		width: '100%',
		paddingHorizontal: 5,
		marginVertical: 5,
		borderRadius: 16
	},
	searchBlock: {
		width: '100%',
		borderRadius: 16,
		backgroundColor: '#e5e5ea',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: 5
	},
	inputBlock: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 16,
		flex: 1
	},
	leftBlock: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 14
	},
	inputText: {
		fontSize: 16,
		fontFamily: 'Montserrat-Medium',
		lineHeight: 20,
		flex: 14
	}
});
