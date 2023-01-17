import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToUserOrderAsync, fetchUser, selectUser, updateUserAsync } from "../Slices/userSlice";

const Cart = () => {
  const username = useSelector((state) => state.auth.me.username);
  const userId = useSelector((state) => state.auth.me.id);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);


  const handleAddToOrder = (product) => {
    console.log("Increase product quantity  to order clicked");
    // dispatch(addToOrder(product));
  };
  const handleDecreaseOrder = (product) => {
    console.log("Decrease product quantity in order clicked")
    // dispatch(decreaseOrder(product));
  };
  const handleRemoveFromOrder = (product) => {
    console.log("remove product from order clicked")
    // dispatch(removeFromOrder(product));
  };
  const handleClearOrder = () => {
    console.log("Detele order clicked")
    // dispatch(clearOrder());
  };


  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {/* View if Cart is empty */}
      {user.orders && user.orders.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <button>
              <Link to="/">Start Shopping!</Link>
            </button>
          </div>
        </div>
      ) : (
        //if there are orders..
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>

          <div className="cart-items">
            {user.orders && user.orders.length
              ? user.orders.map((order) => {
                  return (
                    <div key={order.id}>
                      {!order.completeStatus && order.orderItems.length
                        ? order.orderItems.map((item) => {
                            return (
                              <div className="cart-item" key={item.product.id}>
                                <div className="cart-product">
                                  <img src="https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
                                  <div>
                                    <h3>{item.product.name}</h3>
                                    <button onClick={() => handleRemoveFromOrder()}>Remove</button>
                                  </div>
                                </div>
                                <div className="cart-product-price">
                                  {item.product.price}
                                </div>

                                <div className="cart-product-quantity">
                                  <button
                                  onClick={() => handleDecreaseOrder()}
                                  >-</button>
                                  <div className="count">{item.quantity}</div>
                                  <button
                                  onClick={() => handleAddToOrder()}
                                  >+</button>
                                </div>
                                <div className="cart-product-total-price">
                                  ${item.product.price * item.quantity}
                                </div>
                              </div>
                            );
                            
                          })
                        : null}
                      <div className="cart-summary">
                        <button className="clear-btn"
                        onClick={() => handleClearOrder()}
                        >Clear Cart</button>
                        <div className="cart-checkout">
                          <div className="subtotal">
                            <span>Subtotal</span>
                            <span className="amount">
                            ${order.orderItems
                              ? order.orderItems.reduce((total, currVal) => {
                                  return (
                                    total +
                                    Number(currVal.product.price * currVal.quantity)
                                  );
                                }, 0)
                              : "Not completed"}
                            </span>
                          </div>
                          <p>Taxes and shipping calculated at checkout</p>
                          <Link to="/checkout"><button className="checkout-button">
                            Check out!
                          </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

{
  /* <div className="cart-item">
              <div className="cart-product">
                <img src="https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
                <div>
                  <h3>Item name</h3>

                  <button>Remove</button>
                </div>
              </div>
              <div className="cart-product-price">$$$$$$</div>
              <div className="cart-product-quantity">
                <button>-</button>
                <div className="count">3</div>
                <button>+</button>
              </div>
              <div className="cart-product-total-price">$$TOTAL PRICE</div>
            </div>
          </div>

          <div className="cart-summary">
            <button className="clear-btn">Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">$CART TOTAL</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>

              <button className="checkout-button">
                <Link to="/checkout">Check out!</Link>
              </button>
            </div>
          </div>
        </div>
      )} */
}
