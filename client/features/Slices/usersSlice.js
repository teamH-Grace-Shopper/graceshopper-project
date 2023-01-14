import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsersAsync = createAsyncThunk(
    "users/fetchAll",
    async () => {
      const token = window.localStorage.getItem("token");
      try {
        const { data } = await axios.get(`/api/users`, {headers: {authorization: token}});
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

   //POST - create a user; must be pushed into user arr - 
   export const addUserAsync = createAsyncThunk(
    "users/addUser",
    async ({ username, email, firstName, lastName, address1, address2, city, state, zipCode, isAdmin}) => {
      try {
        const { data } = await axios.post(`/api/users`, {
            username, email, firstName, lastName, address1, address2, city, state, zipCode, isAdmin
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  const UsersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(addUserAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      });
     
    },
  });
  
  export const selectUsers = (state) => {
    return state.users;
  };
  
  export default UsersSlice.reducer;