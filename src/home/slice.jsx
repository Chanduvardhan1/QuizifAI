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
    index: 1,
    contactUSEmail: null,

    user:[],
    //   answeredQuestions:index,
    //  correctAnswer:index,
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
        },
        saveResContactUsEmail: (state, action) => {
            state.contactUSEmail = action.payload;
        },
        getContactUsEmail: (state, action) => {
        },
        saveUserAttemptedQuestions:(state, action) => {
            state.answeredQuestions = action.payload;
        }
    }
})

export const {
    setDynamicStateFlags,
    setAttempted,
    saveResContactUsEmail,
    getContactUsEmail,
    saveUserAttemptedQuestions,
} = homeSlice.actions;
export default homeSlice.reducer;