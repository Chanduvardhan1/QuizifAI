import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    submitted: false,
    activeSection: `home`,
    submit: false,
    attempted: {
        isAttempted: false,
        answeredIndex: null,
        isCorrect: false,
    },
    index: 1
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setDynamicStateFlags: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        setAttempted: (state, action) => {
            state.attempted = action.payload;
        }
    }
})

export const {
    setDynamicStateFlags,
    setAttempted
} = homeSlice.actions;
export default homeSlice.reducer;