import React from 'react';

import Navbar from '../features/navbar/Navbar';
import Sidebar from '../features/navbar/SideNav'
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default App;
