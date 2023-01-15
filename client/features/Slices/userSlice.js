import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//GET single user
export const fetchUser = createAsyncThunk(
    "singleUser",
    async (id) => {
      try {
        const { data } = await axios.get(`/api/users/${id}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

//PUT update user information - customer only?
export const updateUserAsync = createAsyncThunk(
    "User/updateUser",
    async ({ id, address1, city, state, zipCode } ) => {
      try {
        const token = window.localStorage.getItem("token");
        const { data } = await axios.put(
          `/api/users/${id}`,
          { address1, city, state, zipCode },
          {
            headers: { authorization: token },
          }
          
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

//GET single user's order
export const fetchUserOrder = createAsyncThunk(
  "singleUser",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


//PUT update single user's order
export const updateUserOrders = createAsyncThunk(
  "singleUser",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


//DELETE  remove user - did not build backend route.. should we do this?

const UserSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(updateUserAsync.fulfilled, (state, action) => {
        return action.payload;
      });

    },
  });
  
  export const selectUser = (state) => state.user;
  
  export default UserSlice.reducer;
