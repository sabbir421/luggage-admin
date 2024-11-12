import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const signup = createAsyncThunk(
  "signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8081/auth/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) return (await response.json()).data;
      throw Error();
    } catch (error) {
      return rejectWithValue("Error at signup");
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/auth/admin/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) return response.data.data;
      throw Error();
    } catch (error) {
      return rejectWithValue("Error at login");
    }
  }
);

export const adminList = createAsyncThunk(
  "adminList",
  async (token, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const response = await fetch(
        "http://localhost:8081/auth/admin/get",
        requestOptions
      );

      if (response.status === 200) return (await response.json()).data;
      throw Error();
    } catch (error) {
      return rejectWithValue("Error at fetching admin list");
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  token: null,
  errorMsg: null,
  admins: {},
  userDetails: null,
  signup: false,
  isFetchingToken: false,
};

const authSlice = createSlice({
  name: "adminReducer",
  initialState,
  extraReducers: {
    [adminList.pending]: (state) => {
      state.error = null;
      state.error = false;
      state.isLoading = true;
    },
    [adminList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.admins = payload;
    },
    [adminList.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
      state.isLoading = false;
      state.admins = null;
    },
    [signup.pending]: (state) => {
      state.errorMsg = null;
      state.error = false;
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.signup = true;
    },
    [signup.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
      state.isLoading = false;
      state.signup = false;
    },
    [login.pending]: (state) => {
      state.errorMsg = null;
      state.error = false;
      state.isFetchingToken = true;
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isFetchingToken = false;
      state.token = action.payload;
      state.isLoading = false;
    },
    [login.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
      state.isFetchingToken = false;
      state.isLoading = false;
      state.token = null;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
