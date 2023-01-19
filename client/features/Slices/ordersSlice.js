import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Admin can see all orders
export const fetchOrdersAsync = createAsyncThunk(
    "orders/fetchAll",
    async (id) => {
      try {
        const { data } = await axios.get(`/api/orders/users/${id}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );



  const OrdersSlice = createSlice({
    name: "orders",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        return action.payload;
      });
     
     
    },
  });
  
  export const selectOrders = (state) => {
    return state.orders;
  };
  
  export default OrdersSlice.reducer;