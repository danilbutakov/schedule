import React from 'react';

import { useFetchChats } from '../../hooks/useFetchChats';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { Separator } from '../Separator';
import { FlashList } from '@shopify/flash-list';
import ChatsItem from './ChatsItem';

const Chats = () => {
	const { userData } = useFetchUserData();

	const { chatsFiltered } = useFetchChats(userData);

	const renderItem = ({ item }) => <ChatsItem item={item} />;

	return (
		<FlashList
			data={chatsFiltered}
			estimatedItemSize={77}
			ItemSeparatorComponent={() => Separator('chats')}
			renderItem={renderItem}
		/>
	);
};

export default Chats;
