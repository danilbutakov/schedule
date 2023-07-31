import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';

import SearchContacts from '../../components/Contacts/SearchContacts';
import ContactItem from '../../components/Contacts/ContactItem';
import { useFetchContacts } from '../../hooks/useFetchContacts';
import { useContactPreview } from '../../hooks/useContactPreview';
import { useTheme } from '@react-navigation/native';

const ContactsScreen = () => {
	// @ts-ignore
	const { contacts, refreshing, onRefresh } = useFetchContacts();
	const theme = useTheme();

	return (
		<Animatable.View
			duration={1000}
			animation={'fadeIn'}
			useNativeDriver
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: theme.colors.first,
				paddingHorizontal: 10
			}}>
			<SearchContacts />
			<FlatList
				contentContainerStyle={{ paddingTop: 7, paddingBottom: 10 }}
				data={contacts}
				maxToRenderPerBatch={10}
				renderItem={({ item }) => (
					<ContactPreview contact={item} refreshing={refreshing} />
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
		</Animatable.View>
	);
};

const ContactPreview = ({ contact, refreshing }) => {
	const { userPreview } = useContactPreview(contact, refreshing);

	return (
		<ContactItem
			// @ts-ignore
			style={{
				marginTop: 7,
				marginBottom: 10
			}}
			user={userPreview}
		/>
	);
};

export default ContactsScreen;
