import React from "react";
import {useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Confirmation = () => {

        const email = useSelector((state) => state.auth.me.email);
        const orderNumber = useSelector((state) => state.auth.me.orderNumber)

    return(
        <div id= "confirmation-page">
            <div className = "confirmationBox">
                <h1 className = "thank-you">THANK YOU FOR YOUR PATRONAGE</h1>
                <hr></hr>

                <h2 className = "confirmation-text"> Your souls are being summoned</h2>
                <h2 className = "confirmation-text-2"> Your Contract ID is: {orderNumber}</h2>
                <h2 className = "confirmation-text-3"> A confirmation contract will be sent to: {email} </h2>

                <Link to="/"> <button className = "confirmation-button">continue shopping</button> </Link>
            </div>
            
            </div>
    )
}

export default Confirmation