/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const openSideBar = () => {
        document.getElementById("side-nav").style.width = "250px"
        document.querySelector(".open-button").style.display = "none"
        // document.getElementById("main-product-section").style.width = "80%"
    }
    const closeSideBar = () => {
        document.getElementById("side-nav").style.width = "0";
        document.querySelector(".open-button").style.display = "flex"
        // document.getElementById("main-product-section").style.width = "95%"
    }
    return(
        <>
        <button className="open-button" onClick={openSideBar}><img src="https://icons-for-free.com/iconfiles/png/512/List+Text+Menu+Numbers+String+Burger-131983791952927273.png"></img></button>
        <div id="side-nav" className="sidenav">
            <button className="close-button" onClick={closeSideBar}>X</button>
            <Link to="/" className="link">Good Souls</Link>
            <Link to="/" className="link">Bad Souls</Link>
            <Link to="/" className="link">Deals (with the devil)</Link>
        </div>
        </>

    )
}

export default Sidebar;