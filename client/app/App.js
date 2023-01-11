import React from 'react';

import Navbar from '../features/navbar/Navbar';
import Sidebar from '../features/navbar/SideNav'
import AppRoutes from './AppRoutes';
import Footer from '../../src/features/footer';

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
