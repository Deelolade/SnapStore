import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true;
            state.error = null
        },
        signInSuccess:(state, action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        signInError :(state, action)=>{
            state.loading = false;
            state.error = action.payload
        },
        logOut: (state)=>{
            state.currentUser = null
            state.loading =false;
            state.error = null;
        }
    }
})
export const { signInStart, signInSuccess, signInError, logOut} = userSlice.actions;

export default userSlice.reducer;