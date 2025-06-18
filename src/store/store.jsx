import { configureStore } from '@reduxjs/toolkit';


import  users from './reducers/user_reducers';


export default configureStore({
    reducer :{
        users,
    }
});