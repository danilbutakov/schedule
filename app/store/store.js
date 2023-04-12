import { configureStore } from '@reduxjs/toolkit';

import notesSlice from '../features/notes/notesSlice';
import pairSlice from '../features/pair/pairSlice';

export const store = configureStore({
	reducer: {
		notes: notesSlice,
		pair: pairSlice
	}
});
