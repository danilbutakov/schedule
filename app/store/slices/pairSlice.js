import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	clickedPair: []
};

export const pairSlice = createSlice({
	name: 'pair',
	initialState,
	reducers: {
		setClickedPair: (state, action) => {
			state.clickedPair = action.payload;
		}
	}
});

export const { setClickedPair } = pairSlice.actions;
export default pairSlice.reducer;