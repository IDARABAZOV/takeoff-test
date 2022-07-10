import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchContacts} from "./ContactsAPI";

interface Contact {
    id: number,
    name: string,
    phone: string,
    email: string
}

export interface ContactsState {
    value: Contact[]
    status: 'idle' | 'loading' | 'failed'
}

const initialState: ContactsState = {
    value: [],
    status: 'idle'
}

export const getContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async () => {
        const data = await fetchContacts();
        return data.json();
    }
)

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getContacts.fulfilled, (state, action) => {
                state.value = [];
                state.value = state.value.concat(action.payload);
                state.status = 'idle';
            })
            .addCase(getContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getContacts.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const selectContacts = (state: RootState) => state.contacts.value;
export const getStatus = (state: RootState) => state.contacts.status;

export default contactsSlice.reducer;