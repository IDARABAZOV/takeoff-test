import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
    filteredValue: Contact[]
    status: 'idle' | 'loading' | 'failed'
}

const initialState: ContactsState = {
    value: [],
    filteredValue: [],
    status: 'idle'
}

export const getContacts = createAsyncThunk(
    'contacts/getContacts',
    async () => {
        const data = await fetchContacts();
        return data.json();
    }
)

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        liveSearch: (state, action: PayloadAction<string>) => {
            state.filteredValue = state.value.filter((item) => {
                return (
                    item.name.toLowerCase().match(action.payload.toLowerCase())
                )
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContacts.fulfilled, (state, action) => {
                state.value = [];
                state.filteredValue = []
                state.value = state.value.concat(action.payload);
                state.filteredValue = state.filteredValue.concat(action.payload);
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

export const {liveSearch} = contactsSlice.actions

export const selectContacts = (state: RootState) => state.contacts.filteredValue;
export const getStatus = (state: RootState) => state.contacts.status;

export default contactsSlice.reducer;