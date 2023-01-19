import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { completeUserCartDatabase } from "../Slices/cartSlice";

const Confirmation = () => {
  const [date, setDate] = useState();

  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.me.email);
  const orderNumber = useSelector((state) => state.auth.me.orderNumber);
  console.log("state auth me", useSelector((state) => state.auth.me.id));

  const handleCompleteOrder = (id) => {
    setDate(new Date());
    const updatedCompleteOrder = {id, date}
    dispatch(completeUserCartDatabase(updatedCompleteOrder))
  };
  
  const contract = Math.floor(Math.random()*100000+1000)

  return (
    <div id="confirmation-page">
      <div className="confirmationBox">
        <h1 className="thank-you">THANK YOU FOR YOUR PATRONAGE</h1>
        <hr></hr>

        <h2 className="confirmation-text"> Your souls are being summoned</h2>
        <h2 className="confirmation-text-2">

          Your Contract ID is: {orderNumber ? orderNumber : contract}
        </h2>
        <h2 className="confirmation-text-3">

          A confirmation contract will be sent to: {email ? email : "YOUR EMAIL!"}
        </h2>

        <Link to="/">
          <button
            className="confirmation-button"
            onClick={() => handleCompleteOrder(orderNumber)}
          >
            continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
