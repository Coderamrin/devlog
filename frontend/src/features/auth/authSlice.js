import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login, regisster, get loggedin user

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  loading: false,
  error: null,
};

const url = "https://devlog.onrender.com/api/user";

// register
export const register = createAsyncThunk(
  "auth/register",

  async (user, thunkAPI) => {
    try {
      const res = await axios.post(url + "/register", user);

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",

  async (user, thunkAPI) => {
    try {
      const res = await axios.post(url + "/login", user);

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await localStorage.removeItem("user");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = false;
      });
  },
});

export default authSlice.reducer;
