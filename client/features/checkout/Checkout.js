/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser, updateUserAsync } from "../Slices/userSlice";
import { selectUserCart } from "../Slices/cartSlice";

const Checkout = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const userId = useSelector((state) => state.auth.me.id);
  const user = useSelector(selectUser);
  const cart = useSelector(selectUserCart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  const cartProductTotalPrice = cart.reduce((acc, item) => {
    acc += item.price * item.cartQuantity;
    return acc;
  }, 0);

  return (
    <>
      <div id="checkout-page">
        <div id="client-details">
          <div id="contact-info-box">
            <h1>Contact Information:</h1>
            <div id="contact-info">
              <div className="contact-input-box">
                <label className="contact-input-title">First Name</label>
                <input className="contact-input input-box"></input>
              </div>

              <div className="contact-input-box">
                <label className="contact-input-title">Last Name</label>
                <input className="contact-input input-box"></input>
              </div>
              <div className="contact-input-box">
                <label className="contact-input-title">Email</label>
                <input className="contact-input input-box"></input>
              </div>
            </div>
          </div>

          <div id="shipping-address-box">
            <h1>Shipping Address:</h1>
            <div id="address-details-box">
              <div className="address-input-box name">
                <label className="address-input-title">First Name</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box name">
                <label className="address-input-title">Last Name</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box address">
                <label className="address-input-title">Address</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box address">
                <label className="address-input-title">
                  Apartment, suite, etc. (optional)
                </label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box city">
                <label className="address-input-title">City</label>
                <input className="address-input input-box"></input>
              </div>
              {/* <div className="address-input-box country">
                <label className="address-input-title">Country/region</label>
                <select className="address-input  input-box" name="country">
                  <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                </select>
              </div> */}
              <div className="address-input-box state">
                <label className="address-input-title">State</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box zip">
                <label className="address-input-title">ZIP Code</label>
                <input className="address-input  input-box"></input>
              </div>
            </div>
          </div>
          <div id="billing-address-box">
            <h1>Billing Address:</h1>
            <label className="checkbox">
              Same as Mailing Address
              <input type="checkbox"></input>
              <span className="checkmark"></span>
            </label>
            <div id="address-details-box">
              <div className="address-input-box name">
                <label className="address-input-title">First Name</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box name">
                <label className="address-input-title">Last Name</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box company">
                <label className="address-input-title">
                  Company (optional)
                </label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box address">
                <label className="address-input-title">Address</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box address">
                <label className="address-input-title">
                  Apartment, suite, etc. (optional)
                </label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box city">
                <label className="address-input-title">City</label>
                <input className="address-input input-box"></input>
              </div>
              {/* <div className="address-input-box country">
                <label className="address-input-title">Country/region</label>
                <select className="address-input  input-box" name="country">
                  <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                </select>
              </div> */}
              <div className="address-input-box state">
                <label className="address-input-title">State</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box zip">
                <label className="address-input-title">ZIP Code</label>
                <input className="address-input  input-box"></input>
              </div>
            </div>
          </div>
          <div id="payment-details-box">
            <h1>Payment Details:</h1>
            <div id="payment-info-box">
              <div className="payment-input-box name">
                <label className="payment-input-title">First Name</label>
                <input className="payment-input input-box"></input>
              </div>
              <div className="payment-input-box name">
                <label className="payment-input-title">Last Name</label>
                <input className="payment-input input-box"></input>
              </div>
              <div className="payment-input-box payment">
                <label className="payment-input-title">Card Number</label>
                <input className="payment-input input-box"></input>
              </div>
              <div className="address-input-box month-year">
                <label className="address-input-title">MM/YY</label>
                <input className="address-input input-box"></input>
              </div>
              <div className="address-input-box CVV">
                <label className="address-input-title">State</label>
                <input className="address-input  input-box"></input>
              </div>
              <div className="address-input-box zip">
                <label className="address-input-title">ZIP Code</label>
                <input className="address-input  input-box"></input>
              </div>
            </div>
          </div>
        </div>

        <div id="cart-and-orderbtn-box" style={{display: "flex", flexDirection:"column"}}>
          <h1>CHECKOUT</h1>
          <div id="cart-items">
            {cart && cart.length ? (
              cart.map((orderItem) => {
                console.log("orderItem: ", orderItem);
                return (
                  <div className = "cart-container" key={orderItem.id}>
                    <p>Item: {orderItem.name}</p>
                    <p> Quantity: {orderItem.price}</p>
                    <p> Total: ${orderItem.price * orderItem.cartQuantity}</p>
                  </div>
                );
              })
            ) : (
              <h1> No items in your cart </h1>
            )}
            <div className="cart-total total">TOTAL: ${cart ? cartProductTotalPrice : 0}</div>
            {/* {user.orders && user.orders.length ? (
              user.orders.map((order) => {
                return (
                  <div className="cart-container" key={order.id}>
                    {order.completeStatus ? (
                      <h1>You have no products in your cart!</h1>
                    ) : (
                      <>
                        <h4>
                          {" "}
                          Cart:{" "}
                          <span className="cart-total">
                            {order.orderItems.length} items
                          </span>
                        </h4>
                        {order.orderItems
                          ? order.orderItems.map((item) => {
                              return (
                                <p key={item.product.id}>
                                  {item.product.name}
                                  <span className="price">
                                    ${item.product.price}
                                  </span>
                                </p>
                              );
                            })
                          : null}

                        <hr></hr>
                        <p className="total">
                          Total:
                          <span className="cart-total total">
                            <b>
                              $
                              {order.orderItems
                                ? order.orderItems.reduce((total, currVal) => {
                                    return (
                                      total +
                                      Number(
                                        currVal.product.price * currVal.quantity
                                      )
                                    );
                                  }, 0)
                                : "Not total yet"}
                            </b>
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <h1>You have no products in your cart!</h1>
            )} */}
          </div>
          <Link to="/confirmation">
            <button id="order-btn">ORDER YOUR SOUL</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Checkout;
