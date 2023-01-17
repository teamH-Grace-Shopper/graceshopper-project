import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Confirmation = () => {

        const email = useSelector((state) => state.auth.me.email);

    return(
        <div id= "confirmation-page">
            <div className = "confirmationBox">
                THANK YOU
                <hr></hr>

                <div className = "confirmation-text"> Your souls are being summoned</div>
                <div className = "confirmation-text-2"> Thank you for your patronage. Your Contract ID is: (cart ID)</div>
                <div className = "confirmation-text-3"> A confirmation contract will be sent to: {email} </div>

                <button>continue shopping</button> 
            </div>
            
            </div>
    )
}

export default Confirmation