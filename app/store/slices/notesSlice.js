import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	where
} from 'firebase/firestore';
import { fs } from '../../../firebase';

const initialState = {
	notes: [],
	status: null,
	error: null,
	writeStatus: null,
	writeError: null,
	deleteStatus: null,
	deleteError: null
};

export const getNotes = createAsyncThunk(
	'notes/getNotes',
	async (clickedPair, { rejectWithValue }) => {
		try {
			let data = [];
			const q = query(
				collection(fs, 'notes'),
				where('clickedPair', '==', clickedPair)
			);

			await getDocs(q).then(snapshot => {
				data = snapshot.docs.map(doc => ({
					...doc.data()
				}));
			});

			return data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const writeToDatabase = createAsyncThunk(
	'notes/writeToDatabase',
	async (data, { rejectWithValue }) => {
		try {
			await setDoc(doc(fs, 'notes', data.noteId), {
				createdAt: data.createdAt,
				note: data.note,
				noteId: data.noteId,
				userUid: data.userUid,
				clickedPair: data.clickedPair
			});
			console.log('good add note');
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const deleteFromDatabase = createAsyncThunk(
	'notes/deleteFromDatabase',
	async (noteId, { rejectWithValue }) => {
		try {
			await deleteDoc(doc(fs, 'notes', noteId));
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote: (state, action) => {
			state.notes.push(action.payload);
		},
		deleteNote: (state, action) => {
			state.notes = state.notes.filter(
				note => note.noteId !== action.payload
			);
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getNotes.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.notes = action.payload;
			})
			.addCase(getNotes.rejected, (state, action) => {
				state.status = 'rejected';
				state.writeError = action.payload;
			})
			.addCase(writeToDatabase.pending, state => {
				state.writeStatus = 'loading';
				state.writeError = null;
			})
			.addCase(writeToDatabase.fulfilled, state => {
				state.writeStatus = 'resolved';
				state.writeError = null;
			})
			.addCase(writeToDatabase.rejected, (state, action) => {
				state.writeStatus = 'rejected';
				state.writeError = action.payload;
			})
			.addCase(deleteFromDatabase.pending, state => {
				state.deleteStatus = 'loading';
				state.deleteError = null;
			})
			.addCase(deleteFromDatabase.fulfilled, state => {
				state.deleteStatus = 'resolved';
				state.deleteError = null;
			})
			.addCase(deleteFromDatabase.rejected, (state, action) => {
				state.deleteStatus = 'rejected';
				state.deleteError = action.payload;
			});
	}
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
