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
import Confirmation from "../features/confirmationPage/confirmationPage";
import ContactForm from "../features/footer/Contact";
import AboutUs from "../features/footer/AboutUs";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const userId = useSelector((state)=>state.auth.me.id)
  const user = useSelector((state)=>state.auth.me)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <>
      {/* IF LOGGED IN ROUTES */}
      {isLoggedIn ? (
        <Routes>
          <Route to="/*" element={<MainPage userId={userId} isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/" element={<MainPage userId={userId} isLoggedIn={isLoggedIn} user={user}/>} />

          {/* My Account Page */}
          <Route path="/my-account" element={<MyAccount />} />

            {/* Product Routes */}
            <Route path="/products/:id" element={<SingleProductView />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/contact" element={<ContactForm />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>

            {/* ADMIN ROUTES */}
            {isAdmin ? (
              <Route path="/admin" element={<AdminPage />} />
            ) : (
              <Route element={<MainPage userId={userId} isLoggedIn={isLoggedIn} user={user}/>} />
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
          <Route to="/*" element={<MainPage userId={userId} isLoggedIn={isLoggedIn} user={user}/>} />
          <Route path="/" element={<MainPage userId={userId} isLoggedIn={isLoggedIn} user={user}/>} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/contact" element={<ContactForm />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
          {/* Product Routes */}
          <Route path="/products/:id" element={<SingleProductView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* PAGE NOT FOUND */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
