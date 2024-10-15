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
    leaderBoard: {
        attemptedQuestions: 0,
        correctAnswers: 0,
        attemptedQList: []
    },
    sampleQuiz:{
    }
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
            state.leaderBoard = action.payload;
        },
         showUserAnswers:(state, action) => {
             state.sampleQuiz[action.payload.key] = action.payload.value
         },
         getUploadImage:(state,action) => {
            state.getUploadImage = action?.payload?.value
         },
         saveUploadImageResponse:(state,action) =>{
             state.uploadImageRes = action?.payload?.value
         },
         setSelectedImage:(state,action) =>{
            console.log('action?.payload?.value',action);
            state[action.payload.key] = action?.payload?.value
         },
         setOpen:(state,action) =>{
         state[action.payload.key] = action?.payload?.value
         },
        


    }
})

export const {
    setDynamicStateFlags,
    setAttempted,
    saveResContactUsEmail,
    getContactUsEmail,
    saveUserAttemptedQuestions,
    showUserAnswers,
    getUploadImage,
    saveUploadImageResponse,
    setSelectedImage,
    setOpen
} = homeSlice.actions;
export default homeSlice.reducer;