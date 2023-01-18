/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectProducts } from '../Slices/productsSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchProductsAsync } from '../Slices/productsSlice';
import { filterGoodProducts } from '../Slices/productsSlice';
import { filterBadProducts } from '../Slices/productsSlice';


const Sidebar = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

    const openSideBar = () => {
        document.getElementById("side-nav").style.width = "250px"
        document.querySelector(".open-button").style.display = "none"
    }
    const closeSideBar = () => {
        document.getElementById("side-nav").style.width = "0";
        document.querySelector(".open-button").style.display = "flex"
        document.getElementById("main-product-section").style.width = "95%"
    }

    const filterGood = () => {
      dispatch(filterGoodProducts())
    }

    const filterBad = () => {
      dispatch(filterBadProducts())
    }
    return(
        <>
        <button className="open-button" onClick={openSideBar}><img src="https://icons-for-free.com/iconfiles/png/512/List+Text+Menu+Numbers+String+Burger-131983791952927273.png"></img></button>
        <div id="side-nav" className="sidenav">
            <button className="close-button" onClick= {closeSideBar}>X</button>
            <a className="link" onClick = {filterGood}>Good Souls</a>
            <a className="link" onClick = {filterBad}>Bad Souls</a>
        </div>
        </>

    )
}

export default Sidebar;