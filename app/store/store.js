import { configureStore } from '@reduxjs/toolkit';

import notesSlice from './slices/notesSlice';
import pairSlice from './slices/pairSlice';
import deleteChatSlice from './slices/deletechatSlice';

export const store = configureStore({
	reducer: {
		notes: notesSlice,
		pair: pairSlice,
		deleteChat: deleteChatSlice
	}
});
