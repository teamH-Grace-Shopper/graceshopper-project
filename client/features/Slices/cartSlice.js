import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart", async (userId) => {
  const token = window.localStorage.getItem("token");
  try {
    const { data } = await axios.get(`/api/orders/users/${userId}`, {
      headers: { authorization: token },
    });
    console.log("fetch Cart Async: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };

const cartSlice = createSlice({
  name: "cart",
  initialState: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  reducers: {
    addToCart: (state, action) => {
      // see if and find if item is in the cart already, if item index doesn't exists index will be -1
      const itemAdd = state.find(
        (item) => item.id === action.payload.id
      );
      // if item in cart then get the index and increment by 1
      if (itemAdd) {
        itemAdd.cartQuantity += 1;
        // state.cartTotalQuantity += 1;
        // state.cartTotalAmount += Number(action.payload.price);
      } else {
        // push the item in the cart and add the cartQuantity property to the product
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.push(tempProduct);
        // state.cartTotalQuantity += tempProduct.cartQuantity;
        // state.cartTotalAmount += Number(action.payload.price);
      }

      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    increaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.cartQuantity++;
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item.cartQuantity === 1) {
        item.cartQuantity = 1;
      } else {
        item.cartQuantity--;
      }
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const filteredItems = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(filteredItems));
      return filteredItems;
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      console.log("action payload in cart: ", action.payload);
      // return action.payload.filter(cart => cart.completeStatus === null || !cart.completeStatus ? cart.orderItems : null)
      return action.payload;
    });
  },
});

export const selectCart = (state) => {
  console.log("state of cart: ", state.cart);
  return state.cart;
};

export const { addToCart, decreaseQuantity, increaseQuantity, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
