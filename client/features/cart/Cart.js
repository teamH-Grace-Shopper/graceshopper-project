import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToUserOrderAsync,
  fetchUser,
  selectUser,
  updateUserAsync,
} from "../Slices/userSlice";
import {
  fetchCartAsync,
  selectUserCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  clearOrder,
  addItemToCartDatabase,
  increaseCartItemInDb,
} from "../Slices/cartSlice";
import { selectProducts } from "../Slices/productsSlice";

const Cart = ({ isLoggedIn }) => {
  const user = useSelector(selectUser);
  const userId = useSelector((state) => state.auth.me.id);

  console.log("userId: ", userId);
  console.log("user: ", user);
  console.log("logged in?", isLoggedIn);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts)
  const cart = useSelector(selectUserCart);
  console.log("cart: ", cart);

  // find order ID
  console.log(
    "user orderId: ",
    user.orders
      ? user.orders.find((order) => order.completeStatus === null)
      : "nothing"
  );
  const order = user.orders
    ? user.orders.find((order) => order.completeStatus === null)
    : false;
  const orderId = order ? order.id : false;
  console.log("orderId:", orderId);

  // const currentCart = cart.find((item) => item.completeStatus === null);
  // console.log("currentCart: ", currentCart)

  // console.log("users orders:", user.orders ? user.orders.find((item) => item.completeStatus === null) : null)

  // console.log("order: ", order.orderItems ? order.orderItems : "NO")

  // const itemsInCart = order.orderItems ? order.orderItems : "nothing"

  // console.log("itemsInCart: ", itemsInCart)

  useEffect(() => {
    console.log("userId CART: ", userId)
    if (userId) dispatch(fetchUser(userId))
    console.log("orderId .THEN--->", orderId)
    
    if (userId) dispatch(fetchCartAsync({ userId, orderId, products}));
  }, [dispatch, userId, orderId]);

  const handleIncreaseToOrder = (product) => {
    console.log("Increase product quantity  to order clicked");
    console.log("product increased: ", product);
    dispatch(increaseQuantity(product));
    // if (isLoggedIn){
    //   const productId = product.id
    //   const cartQuantity = product.cartQuantity
    //   dispatch(increaseCartItemInDb({userId, cartQuantity, productId, orderId}))
    // }
  };
  const handleDecreaseOrder = (product) => {
    console.log("Decrease product quantity in order clicked");
    dispatch(decreaseQuantity(product));
  };
  const handleRemoveFromOrder = (id) => {
    console.log("remove product from order clicked");
    dispatch(removeItem(id));
  };
  const handleClearOrder = () => {
    console.log("Delete order clicked");
    dispatch(clearOrder());
  };

  // if (!userId) {

  // } else {
  //   let userCart = user.orders.find((order) => order.completeStatus === null);
  //   cart = userCart;
  // }
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
                        <img src="https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
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
            {/* // : userId && currentCart ? currentCart.orderItems.map((order) => {
              //   console.log("ORDER: ", order)
              //       return (
              //         <div className="cart-item" key={order.productId}>
              //           <div className="cart-product">
              //             <img src="https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
              //             <div>
              //               <h3>{order.product.name}</h3>
              //               <button
              //                 onClick={() => handleRemoveFromOrder(order.productId)}
              //               >
              //                 Remove
              //               </button>
              //             </div>
              //           </div>
              //           <div className="cart-product-price">${order.product.price}</div>
              //           <div className="cart-product-quantity">
              //             <button onClick={() => handleDecreaseOrder(order.product)}>
              //               -
              //             </button>
              //             <div className="count">{order.cartQuantity}</div>
              //             <button onClick={() => handleIncreaseToOrder(order.product)}>
              //               +
              //             </button>
              //           </div>
              //           <div className="cart-product-total-price">
              //             ${order.price * order.cartQuantity}
              //           </div>
              //         </div>
              //       );
              //     }) : "Nothing Here"} */}
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
              <Link to="/checkout">
                <button className="checkout-button">
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
