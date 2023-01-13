/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Sidebar from '../features/navbar/SideNav'
import Footer from '../features/footer/footer';
import MainPage from '../features/home/MainPage';
import ProductRoutes from './ProductRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ProductRoutes />
      <Footer/>
    </div>
  );
};

export default App;
