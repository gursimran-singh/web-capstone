import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";

import axios from "axios";

// import AuthService from "../services/auth.service";
const SIGNUP_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/create";
const LOGIN_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/login";

const loginAuth = (email, password) => {
    return axios
        .post(LOGIN_URL, {
            email,
            password,
        })
        .then((response) => {
            // console.log(response);
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

// const logoutAuth = () => {
//     localStorage.removeItem("user");
// };


const user = JSON.parse(localStorage.getItem("user"));

export const signup = createAsyncThunk(
    "auth/register",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await axios.post(SIGNUP_URL, {
                name,
                email,
                password,
            });
            if (response.data.hasOwnProperty("user")) {
                
                thunkAPI.dispatch(setMessage("You have registered successfully."));
                // return response.data;
            }
            else {
                thunkAPI.dispatch(setMessage(response.data.error || "Failed registration!"));
            }
            return response.data;
        } catch (error) {
            console.log(error);
            const message =
                (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await loginAuth(email, password);
            if(data.hasOwnProperty("token")){
                thunkAPI.dispatch(setMessage("Login successfully."));
               
            }else{
                thunkAPI.dispatch(setMessage(data.error || "Login successfully."));
            }
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

// export const logout = createAsyncThunk("auth/logout", async () => {
//     await logoutAuth();
// });

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signup.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
        },
        [signup.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        // [logout.fulfilled]: (state, action) => {
        //     state.isLoggedIn = false;
        //     state.user = null;
        // },
    },
});

const { reducer } = authSlice;
export default reducer;
