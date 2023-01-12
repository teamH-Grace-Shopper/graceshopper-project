import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
    "singleProduct",
    async (id) => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );


  const singleProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
        return action.payload;
      });


    },
  });
  
  export const selectSingleProduct = (state) => state.product;
  
  export default singleProductSlice.reducer;