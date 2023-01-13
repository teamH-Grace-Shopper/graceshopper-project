import React from "react";

const Checkout = () => {
    return(
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
                            <label className="contact-input-title">Phone</label>
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
                            <label className="address-input-title">Apartment, suite, etc. (optional)</label>
                            <input className="address-input input-box"></input>
                        </div>
                        <div className="address-input-box city">
                            <label className="address-input-title">City</label>
                            <input className="address-input input-box"></input>
                        </div>
                        <div className="address-input-box country">
                            <label className="address-input-title">Country/region</label>
                            <select className="address-input  input-box" name="country">
                                <option value="australia">Australia</option>
                                <option value="canada">Canada</option>
                                <option value="usa">USA</option>
                                </select>
                        </div>
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
                    <label className="checkbox">Same as Mailing Address
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
                            <label className="address-input-title">Company (optional)</label>
                            <input className="address-input input-box"></input>
                        </div>
                        <div className="address-input-box address">
                            <label className="address-input-title">Address</label>
                            <input className="address-input input-box"></input>
                        </div>
                        <div className="address-input-box address">
                            <label className="address-input-title">Apartment, suite, etc. (optional)</label>
                            <input className="address-input input-box"></input>
                        </div>
                        <div className="address-input-box city">
                            <label className="address-input-title">City</label>
                            <input className="address-input input-box"></input>
                        </div>
                        <div className="address-input-box country">
                            <label className="address-input-title">Country/region</label>
                            <select className="address-input  input-box" name="country">
                                <option value="australia">Australia</option>
                                <option value="canada">Canada</option>
                                <option value="usa">USA</option>
                                </select>
                        </div>
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
            <div id="cart-and-orderbtn-box">
            <h1>CHECKOUT</h1>
                <div id="cart-items">
                <div className="cart-container">
                    <h4>Cart: <span className="cart-total">4 items</span></h4>
                    <p>Product 1 <span className="price">$15</span></p>
                    <p>Product 2 <span className="price">$5</span></p>
                    <p>Product 3 <span className="price">$8</span></p>
                    <p>Product 4 <span className="price">$2</span></p>
                    <hr></hr>
                    <p className="total">Total: <span className="cart-total total"><b>$30</b></span></p>
                    </div>
                </div>
                <button id="order-btn">ORDER YOUR SOUL</button>
            </div>
        </div>
        </>
    )
}

export default Checkout