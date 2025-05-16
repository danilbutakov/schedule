import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { fs } from '../../utils/firebaseNative';

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
			const q = fs.collection('notes').where('clickedPair', '==', clickedPair);
			await q.get().then((snapshot) => {
				data = snapshot.docs.map((doc) => ({
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
			await fs.collection('notes').doc(data.noteId).set({
				createdAt: data.createdAt,
				note: data.note,
				noteId: data.noteId,
				userUid: data.userUid,
				clickedPair: data.clickedPair
			});
			return data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const deleteNote = createAsyncThunk(
	'notes/deleteNote',
	async (noteId, { rejectWithValue }) => {
		try {
			await fs.collection('notes').doc(noteId).delete();
			return noteId;
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
				(note) => note.noteId !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
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
			.addCase(writeToDatabase.pending, (state) => {
				state.writeStatus = 'loading';
				state.writeError = null;
			})
			.addCase(writeToDatabase.fulfilled, (state) => {
				state.writeStatus = 'resolved';
				state.writeError = null;
			})
			.addCase(writeToDatabase.rejected, (state, action) => {
				state.writeStatus = 'rejected';
				state.writeError = action.payload;
			})
			.addCase(deleteNote.pending, (state) => {
				state.deleteStatus = 'loading';
				state.deleteError = null;
			})
			.addCase(deleteNote.fulfilled, (state, action) => {
				state.deleteStatus = 'resolved';
				state.deleteError = null;
			})
			.addCase(deleteNote.rejected, (state, action) => {
				state.deleteStatus = 'rejected';
				state.deleteError = action.payload;
			});
	}
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
