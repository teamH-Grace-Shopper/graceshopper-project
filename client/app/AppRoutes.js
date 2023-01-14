/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import { me } from "./store";
import MainPage from "../features/home/MainPage";
import SingleProductView from "../features/home/SingleProduct";
import Checkout from "../features/checkout/Checkout";
import AdminPage from "../features/admin/AdminPage";
import Cart from "../features/cart/Cart";
import UpdateProduct from "../features/admin/UpdateProduct";
import AddProduct from "../features/admin/AddProduct";
import MyAccount from "../features/account/MyAccount";
import UserAccount from "../features/admin/UserAccount";
import PageNotFound from "../features/PageNotFound";


/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <>
      <div>
        {/* IF LOGGED IN ROUTES */}
        {isLoggedIn ? (
          <Routes>
            <Route to="/*" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />

            {/* My Account Page */}
            <Route path="/my-account" element={<MyAccount />} />

            {/* Product Routes */}
            <Route path="/products/:id" element={<SingleProductView />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />

            {/* ADMIN ROUTES */}
            {isAdmin ? (
              <Route path="/admin" element={<AdminPage />} />
            ) : (
              <Route element={<MainPage />} />
            )}
            {isAdmin ? (
              <Route
                path="/admin/products/edit/:productId"
                element={<UpdateProduct />}
              />
            ) : null}
            {isAdmin ? (
              <Route
                path="/admin/products/addProduct"
                element={<AddProduct />}
              />
            ) : null}
            {isAdmin ? (
              <Route
                path="/admin/user/:userId"
                element={<UserAccount />}
              />
            ) : null}

            {/* PAGE NOT FOUND */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ) : (
          // NOT LOGGED IN ROUTES
          <Routes>
            <Route to="/*" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
            {/* Product Routes */}
            <Route path="/products/:id" element={<SingleProductView />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />

            {/* PAGE NOT FOUND */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </>
  );
};

export default AppRoutes;
