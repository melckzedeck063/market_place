import {createSlice} from "@reduxjs/toolkit";
import {
    getDashboard,
    loginUser,
    myProfile,
} from "../actions/user_actions";

export const UserSlice =  createSlice({
    name : "users",

    initialState : {
        loged_user : null,
        current_user : null,
        dashboard_data : null,
        user_profile : [],
        status : '',
        error  : false,
        message : ''
    },

    reducers : {
        login_user : (state,action) => {
            state.loged_user.push(action.payload);
        },
        get_users : (state,action) => {
            state.all_users.push(action.payload);
        }
    },

    extraReducers (builder) {
        builder
            .addCase(loginUser.pending, (state,action) => {
                state.status = "Loading";
            } )
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status ="Successful";
                state.message = "Login  successful";
                state.error = false;
                state.loged_user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "Failed";
                state.message = "Request failed";
                state.error =  true;
            })

    

    }
})

export const  {login_user,get_users} =  UserSlice.actions;
export default UserSlice.reducer;