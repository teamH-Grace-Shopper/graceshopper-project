/* eslint-disable no-unused-vars */
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
return (
    <div id='footer'>
    <div id = "footerbox">

        <Link to= "/contact" className = "contact">Contact Us</Link>  
        <Link to= "/AboutUs" className = "aboutUs">About Us</Link>
        <Link to= "" className = "SYS">Sell Your Soul</Link>
        
    </div>
    </div>
)
}

export default Footer