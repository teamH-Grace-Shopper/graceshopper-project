/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "../Slices/userSlice";
import {
  fetchCartAsync,
  selectUserCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  clearOrder,
  increaseCartItemInDb,
} from "../Slices/cartSlice";
import { selectProducts } from "../Slices/productsSlice";
import { fetchOrdersAsync, selectOrders } from "../Slices/ordersSlice";

const Cart = () => {
  const user = useSelector(selectUser);
  const userId = useSelector((state) => state.auth.me.id);
  const userOrders = useSelector(selectOrders);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const localCart = localStorage.getItem("cartItems");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectUserCart);

  // find order ID
  const order = user.orders
    ? user.orders.find((order) => order.completeStatus === null)
    : false;
  const orderId = order ? order.id : false;

  console.log("LOCAL CART STORAGE: ", localCart);
  console.log("cart: ", cart);
  console.log("userId: ", userId);
  console.log("user: ", user);
  console.log("logged in?", isLoggedIn);
  console.log("userORDERS: ", userOrders);
  console.log("orderId:", orderId);
  console.log(
    "user orderId: ",
    user.orders
      ? user.orders.find((order) => order.completeStatus === null)
      : "nothing"
  );

  useEffect(() => {
    if (userId) dispatch(fetchUser(userId));

    if (userId) dispatch(fetchOrdersAsync(userId));
    if (userId) dispatch(fetchCartAsync({ userId, orderId, products }));
  }, [dispatch, userId, orderId]);

  const handleIncreaseToOrder = (product) => {
    dispatch(increaseQuantity(product));
    if (isLoggedIn) {
      const productId = product.id;
      const cartQuantity = product.cartQuantity;
      dispatch(
        increaseCartItemInDb({ userId, cartQuantity, productId, orderId })
      );
    }
  };
  const handleDecreaseOrder = (product) => {
    dispatch(decreaseQuantity(product));
  };
  const handleRemoveFromOrder = (id) => {
    dispatch(removeItem(id));
  };
  const handleClearOrder = () => {
    dispatch(clearOrder());
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/checkout");
    } else {
    }
  };

  const cartProductTotalPrice = cart.reduce((acc, item) => {
    acc += item.price * item.cartQuantity;
    return acc;
  }, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {/* View if Cart is empty */}
      {cart && cart.length === 0 ? (
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
            {cart && cart.length
              ? cart.map((order) => {
                  return (
                    <div className="cart-item" key={order.id}>
                      <div className="cart-product">
                        <img src={order.imageUrl} />
                        <div>
                          <h3>{order.name}</h3>
                          <button
                            onClick={() => handleRemoveFromOrder(order.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart-product-price">${order.price}</div>
                      <div className="cart-product-quantity">
                        <button onClick={() => handleDecreaseOrder(order)}>
                          -
                        </button>
                        <div className="count">{order.cartQuantity}</div>
                        <button onClick={() => handleIncreaseToOrder(order)}>
                          +
                        </button>
                      </div>
                      <div className="cart-product-total-price">
                        ${order.price * order.cartQuantity}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearOrder()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cartProductTotalPrice}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              {/* handleCheckout and add items in cart to db */}
              <Link to="/checkout">
                <button
                  onClick={() => handleCheckout()}
                  className="checkout-button"
                >
                  Checkout!
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
