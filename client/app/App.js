/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Sidebar from '../features/navbar/SideNav'
import Footer from '../features/footer/footer';
<<<<<<< HEAD
import MainPage from '../features/home/MainPage';
import ProductRoutes from './ProductRoutes';
=======
import AppRoutes from './AppRoutes';
>>>>>>> 3e32437c2263f463a3d02dc7ce619dca59eda094

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AppRoutes />
      <Footer/>
    </div>
  );
};

export default App;
