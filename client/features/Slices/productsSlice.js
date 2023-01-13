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

//POST - create a product; must be pushed into products arr - Admin only view&feature
export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async ({ name, price, quantity, description, type }) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.post(
        `/api/products`,
        {
          name,
          price,
          quantity,
          description,
          type,
        },
        { headers: { authorization: token } }
      );
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
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectProducts = (state) => {
  return state.products;
};

export default ProductsSlice.reducer;
