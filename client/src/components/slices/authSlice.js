import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";

import axios from "axios";


const SIGNUP_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/create";
const LOGIN_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/login";

const logoutAuth = () => {
    sessionStorage.removeItem("user");
    
};


export const signup = createAsyncThunk(
    "signup",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await axios.post(SIGNUP_URL, {
                name,
                email,
                password,
            });
            if (response.data.hasOwnProperty("user")) {
                
                thunkAPI.dispatch(setMessage("You have registered successfully."));
                
            }
            else {
                thunkAPI.dispatch(setMessage(response.data.error || "Failed registration!"));
            }
            return response.data;
        } catch (error) {
            const message =error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    "login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post(LOGIN_URL, {
                email,
                password,
            });
        //    console.log(response);
            // if(response.data.hasOwnProperty("token")){
                if(response.status === 200){
                sessionStorage.setItem("user", JSON.stringify(response.data));
                thunkAPI.dispatch(setMessage("Login successfully."));
                          
            }else{
                thunkAPI.dispatch(setMessage(response.data.error || "Login Failed."));
            }
            return response.data;
        } catch (error) {
            if(error.response.status === 404){
                // console.log(error.response.data.error);
                thunkAPI.dispatch(setMessage(error.response.data.error || "Login Failed."));
            }
            else{const message = error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();}
        }
    }
);

export const logout = createAsyncThunk("logout", async () => {
    await logoutAuth();
   
});
const storedUser = JSON.parse(sessionStorage.getItem("user"));
const initialState = storedUser? { loggedIn: true, user: storedUser}: { loggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signup.fulfilled]: (state, action) => {
            state.loggedIn = false;
        },
        [signup.rejected]: (state, action) => {
            state.loggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            
            if(action.payload.hasOwnProperty('token')){
            state.loggedIn = true;           
            state.user = action.payload;
          
            }
            else {
                state.loggedIn =false;
                state.user = null;
            }
        },
        [login.rejected]: (state, action) => {
          
            state.loggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.loggedIn = false;
            state.user = null;
            
        },
    },
});

export default authSlice.reducer;
