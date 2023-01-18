import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
  "cart",
  async ({ userId, orderId, products }) => {
    //   const token = window.localStorage.getItem("token");
    try {
      if (!userId) {
        window.localStorage.cartItems
          ? JSON.parse(localStorage.getItem("cartItems"))
          : localStorage.setItem("cartItems", JSON.stringify([]));
      } else {
        if (orderId){
        const { data } = await axios.get(
          `/api/order-item/orders/${orderId}`
          // {headers: { authorization: token }}
        );
        return data;
        } else {
            return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const addItemToCartDatabase = createAsyncThunk(
  "cart/addItem",
  async ({ userId, productId, orderId, cartQuantity }) => {
    try {
      await axios.post(
        `/api/order-item/orders/${orderId}`,
        {
          orderId,
          productId,
          cartQuantity,
        }
        // {headers: { authorization: token }}
      );
      const { data } = await axios.get(`api/orders/users/${userId}`);
      console.log("Add To Cart Async: ", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const increaseCartItemInDb = createAsyncThunk(
  "cart/increase",
  async ({ cartQuantity, productId, orderId }) => {
    try {
      await axios.post(`/api/order-item/orders/${orderId}`, {
        cartQuantity,
        productId,
        orderId,
      });
      const { data } = await axios.get(`/api/order-item/orders/${orderId}`);
      console.log("increase in DB", data);
      return data;
    } catch (err) {}
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  reducers: {
    addToCart: (state, action) => {
      // see if and find if item is in the cart already, if item index doesn't exists index will be -1
      const itemAdd = state.find((item) => item.id === action.payload.id);
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
    clearOrder: (state, action) => {
      state = [];
      localStorage.setItem("cartItems", JSON.stringify(state));
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      console.log("action payload in cart: ", action.payload);
      // return action.payload.filter(cart => cart.completeStatus === null || !cart.completeStatus ? cart.orderItems : null)
      if (action.payload) {
        let userCart = action.payload.map((item) => item.product);
        console.log("userCart: ", userCart);
        //   let newCart = items.orderItems.map((item) => item.product);
        //   return newCart;
        localStorage.setItem("cartItems", JSON.stringify(userCart));
        return userCart;
      }
    });
    builder.addCase(addItemToCartDatabase.fulfilled, (state, action) => {
      console.log("added to cart ASYNC: ", action.payload);
      //   state.push(action.payload);
      // see if and find if item is in the cart already, if item index doesn't exists index will be -1
      //   const itemAdd = state.find((item) => item.id === action.payload.id);
      //   // if item in cart then get the index and increment by 1
      //   if (itemAdd) {
      //     itemAdd.cartQuantity += 1;
      //     // state.cartTotalQuantity += 1;
      //     // state.cartTotalAmount += Number(action.payload.price);
      //   } else {
      //     // push the item in the cart and add the cartQuantity property to the product
      //     const tempProduct = { ...action.payload, cartQuantity: 1 };
      //     state.push(tempProduct);
      //     // state.cartTotalQuantity += tempProduct.cartQuantity;
      //     // state.cartTotalAmount += Number(action.payload.price);
      //   }

      //   localStorage.setItem("cartItems", JSON.stringify(state));
    });
    builder.addCase(increaseCartItemInDb.fulfilled, (state, action) => {
      console.log("action payload with increase: ", action.payload);
      //   state.push(action.payload);
      //   localStorage.setItem("cartItems", JSON.stringify(state));
    });
  },
});

export const selectUserCart = (state) => {
  console.log("state of cart: ", state.cart);
  return state.cart;
};

export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  clearOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
