import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
  "cart",
  async ({ userId, orderId, products }) => {
    //   const token = window.localStorage.getItem("token");
    try {
        console.log("orderId thunk", orderId)
      if (!userId) {
        window.localStorage.cartItems
          ? JSON.parse(window.localStorage.getItem("cartItems"))
          : window.localStorage.removeItem("cartItems");
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
  async ({ userId, cartQuantity, productId, orderId }) => {
    try {
      await axios.put(`/api/orders/${orderId}/order-items`, {
        cartQuantity,
        productId,
        orderId,
      });
      const { data } = await axios.get(`/api/orders/${orderId}/order-items`);
      console.log("increase in DB", data);
      return data;
    } catch (err) {}
  }
);

export const completeUserCartDatabase = createAsyncThunk(
  "cart/completeOrder",
  async ({ userId, productId, orderId, cartQuantity }) => {
    try {
      await axios.post(
        `/api/orders/users/${orderId}`,
        {
          completeStatus,
        }
        // {headers: { authorization: token }}
      );
      // const { data } = await axios.get(`api/orders/users/${userId}`);
      console.log("complete To Cart Order Async: ", data);
      return data;
    } catch (err) {
      console.log(err);
    }
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

      } else {
        // push the item in the cart and add the cartQuantity property to the product
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.push(tempProduct);
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

      if (action.payload) {
        let userCart = action.payload.map((item) => item.product);
        localStorage.setItem("cartItems", JSON.stringify(userCart));
        return userCart;
      }
    });
    builder.addCase(addItemToCartDatabase.fulfilled, (state, action) => {

    });
    builder.addCase(increaseCartItemInDb.fulfilled, (state, action) => {

    });
  },
});

export const selectUserCart = (state) => {
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
