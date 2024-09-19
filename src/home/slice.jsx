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
        },
        handleStarted: (state,action) => {
            state.started = action?.payload
        },
        handleQuestion1:(state,action) => {
            state.question1 = action?.payload
        },
        handleFirstname:(state,action) => {
            state.firstname = action?.payload
        },
        handleMessage:(state,action) => {
            state.message = action?.payload
    },
    handleLastname:(state,action) =>{
        state.lastname =action?.payload
    },
    handlePhonenumber:(state,action) =>{
        state.phonenumber = action?.payload
    },
    handleUseremail:(state,action) => {
        state.useremail = action?.payload
    },
    handleActivesection:(state,action) =>{
        state.activesection = action?.payload
    },

    // handleSubmit:(state,action) =>{
    //     state.sumit= action?.payload
    // }
}
})

export const { setSubmitted,handleStarted,handleQuestion1,handleFirstname,handleMessage,handleLastname,handlePhonenumber,handleUseremail,handleActivesection, } = homeSlice.actions;
export default homeSlice.reducer;