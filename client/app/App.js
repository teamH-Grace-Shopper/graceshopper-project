/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import Sidebar from "../features/navbar/SideNav";
import Footer from "../features/footer/footer";
import AppRoutes from "./AppRoutes";


const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
