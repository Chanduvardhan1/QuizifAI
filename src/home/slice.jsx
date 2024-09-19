import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    submitted: false
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSubmitted: (state, action) => {
            state.submitted = action.payload;
        }
    }
})

export const { setSubmitted } = homeSlice.actions;
export default homeSlice.reducer;