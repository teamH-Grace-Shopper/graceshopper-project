import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//GET - a single product
export const fetchProduct = createAsyncThunk(
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


  //PUT - update product - Admin only view&feature
  export const updateProductAsync = createAsyncThunk(
    "product/updateProduct",
    async (product) => {
      try {
        const { id, name, price, quantity, description, type, imageUrl } = product;
        const updatedProduct = { name, price, quantity, description, type, imageUrl }; 
        const { data } = await axios.put(
          `/api/campuses/${id}`,
          updatedProduct
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  //DELETE - remove product - Admin only view&feature
  export const deleteProductAsync = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
      try {
        const { data } = await axios.delete(`/api/products/${id}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );



  const ProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(updateProductAsync.fulfilled, (state, action) => {
        return action.payload;
      });

      builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
        //we dont update the state for delete
      });
    },
  });
  
  export const selectProduct = (state) => state.product;
  
  export default ProductSlice.reducer;


