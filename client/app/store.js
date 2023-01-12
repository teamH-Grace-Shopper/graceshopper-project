import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/Slices/productsSlice";
import productReducer from "../features/Slices/productSlice"


const store = configureStore({
  reducer: { 
    auth: authReducer, 
    products: productsReducer, 
    product: productReducer 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
