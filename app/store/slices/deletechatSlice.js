import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteDoc, doc } from 'firebase/firestore';
import { fs } from '../../../firebase';

const initialState = {
	isLoading: false,
	deleteStatus: null,
	deleteError: null,
	deleteMessageStatus: null,
	deleteMessageError: null
};

export const deleteChat = createAsyncThunk(
	'chat/deleteChat',
	async (route, { rejectWithValue }) => {
		try {
			await deleteDoc(doc(fs, 'chats', route.params['chat'].combinedId));
			await deleteDoc(
				doc(fs, 'messages', route.params['chat'].combinedId)
			);
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const deleteMessage = createAsyncThunk(
	'chat/deleteMessage',
	async (combinedId, messageId, { rejectWithValue }) => {
		console.log(combinedId);
		console.log(messageId);
		try {
			await deleteDoc(
				doc(fs, `messages/${combinedId}/children/${messageId}`)
			);
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const deleteChatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(deleteChat.pending, state => {
				state.deleteStatus = 'loading';
				state.deleteError = null;
			})
			.addCase(deleteChat.fulfilled, state => {
				state.deleteStatus = 'resolved';
				state.deleteError = null;
			})
			.addCase(deleteChat.rejected, (state, action) => {
				state.deleteStatus = 'rejected';
				state.deleteError = action.payload;
			})
			.addCase(deleteMessage.pending, state => {
				state.deleteMessageStatus = 'loading';
				state.deleteMessageError = null;
			})
			.addCase(deleteMessage.fulfilled, state => {
				state.deleteMessageStatus = 'resolved';
				state.deleteMessageError = null;
			})
			.addCase(deleteMessage.rejected, (state, action) => {
				state.deleteMessageStatus = 'rejected';
				state.deleteMessageError = action.payload;
			});
	}
});

export const { setIsLoading } = deleteChatSlice.actions;
export default deleteChatSlice.reducer;
