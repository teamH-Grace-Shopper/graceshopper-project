import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";

/*
  THUNKS
*/
export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (
    { firstName, lastName, email, username, password, address1, method },
    thunkAPI
  ) => {
    // cart from localStorage if !cart
    const cart = window.localStorage.getItem("cartItems");
    try {
      if (!cart) {
        const res = await axios.post(`/auth/${method}`, {
          firstName,
          lastName,
          email,
          username,
          password,
          address1,
        });
        console.log("response data", res);
        window.localStorage.setItem(TOKEN, res.data.token);
        thunkAPI.dispatch(me());
      } else {
        const res = await axios.post(`/auth/${method}`, {
          firstName,
          lastName,
          email,
          username,
          password,
          address1,
        }, cart);
        console.log("response data", res);
        window.localStorage.setItem(TOKEN, res.data.token);
        thunkAPI.dispatch(me());
      }
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

/*
  SLICE
*/
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem("cartItems")
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;

/*
  REDUCER
*/
export default authSlice.reducer;
