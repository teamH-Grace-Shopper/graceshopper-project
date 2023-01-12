import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/Slices/productsSlice";
import productReducer from "../features/Slices/productSlice"
import usersReducer from "../features/Slices/usersSlice";
import userReducer from "../features/Slices/userSlice";


const store = configureStore({
  reducer: { 
    auth: authReducer, 
    products: productsReducer, 
    product: productReducer,
    users: usersReducer,
    user: userReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
