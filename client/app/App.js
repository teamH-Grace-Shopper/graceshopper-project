/* eslint-disable no-unused-vars */
import React from 'react';

import Navbar from '../features/navbar/Navbar';
import Sidebar from '../features/navbar/SideNav'
import Footer from '../../src/features/footer';
import MainPage from '../features/home/MainPage';

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <MainPage />
      <Footer/>
    </div>
  );
};

export default App;
