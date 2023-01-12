import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsAsync = createAsyncThunk(
    "products/fetchAll",
    async () => {
      try {
        const { data } = await axios.get(`/api/products`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  const ProductsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  
     
    },
  });
  
  export const selectProducts = (state) => {
    return state.products;
  };
  
  export default ProductsSlice.reducer;