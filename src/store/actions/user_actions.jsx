import axios from "axios";
import {BASE_URL} from "../urls";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { encryptData } from "../utils_encryption";


axios.defaults.headers.post['Content-Type'] = 'application/json';

const USERS_API =  axios.create({baseURL : BASE_URL});

USERS_API.interceptors.request.use((req) => {
    const storage =   sessionStorage.getItem("food_recipe");
    const {data} = JSON.parse(storage);
    const {token} = data;

    if(token != null){
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
})

export const loginUser =  createAsyncThunk('/login', async  (values) => {
    try {
        const  response =  await  axios.post(`${BASE_URL}/auth/login`, {
            username : values.username,
            password : values.password
        });
        console.log("Function called")
        // console.log(response.data);

        const encrypted = encryptData(response.data);
        sessionStorage.setItem("food_recipe", encrypted);

        return  response.data;
    }
    catch (error){
        console.log(error)
        return error.message;
    }
});

