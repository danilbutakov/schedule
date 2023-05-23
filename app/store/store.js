import { configureStore } from '@reduxjs/toolkit';

import notesSlice from './slices/notesSlice';
import pairSlice from './slices/pairSlice';

export const store = configureStore({
	reducer: {
		notes: notesSlice,
		pair: pairSlice
	}
});
