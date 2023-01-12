/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import SingleProductView from "../features/home/SingleProduct";
import Home from "../features/home/Home";
import MainPage from "../features/home/MainPage";

/**
 * COMPONENT
 */

const ProductRoutes = () => {
  return (
    <>
    <div>
        <Routes>
          <Route path="/products" element={<SingleProductView />} />
          <Route path="/*" element={[<Home />, <MainPage />]} />
          <Route to="/home" element={[<Home />, <MainPage />]} />
        </Routes>
    </div>
    </>
  );
};

export default ProductRoutes;
