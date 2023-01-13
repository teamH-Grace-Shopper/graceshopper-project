import React from 'react';
import { Link } from "react-router-dom";


const Cart = () => {
 return (
    <div className="cart-container">
        <h2>Shopping Cart</h2>
<div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
                <div className="cart-item" >
                  <div className="cart-product">
                    <img src="https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
                    <div>
                      <h3>Item name</h3>
                
                      <button>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">$$$$$$</div>
                  <div className="cart-product-quantity">
                    <button>
                      -
                    </button>
                    <div className="count">3</div>
                    <button >+</button>
                  </div>
                  <div className="cart-product-total-price">
                    $$TOTAL PRICE
                  </div>
                </div>
          </div>
          <div className="cart-summary">
            <button className="clear-btn">
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">$CART TOTAL</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
    
                <button
                  className="cart-login">
                  Login to Check out
                </button>
            </div>
          </div>
        </div>






        {/* View if Cart is empty */}
      {/* <h2>Shopping Cart</h2>
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/home">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div> */}
        {/* View if Cart is empty */}


    </div>
  )

}

export default Cart