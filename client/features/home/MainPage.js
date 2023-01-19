/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../Slices/productsSlice";
import { addItemToCartDatabase, addToCart } from "../Slices/cartSlice";
import { fetchOrdersAsync, selectOrders } from "../Slices/ordersSlice";

export const MainPage = ({ userId, isLoggedIn, user }) => {
  const dispatch = useDispatch();
  console.log("userId", userId);
  console.log("user", user);
  console.log("loggedIn?", isLoggedIn);

  const products = useSelector(selectProducts);

  const orders = useSelector(selectOrders);
  console.log("ORDERSLKS:DJF:LSKDJF:LKS", orders);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    console.log("userId --------------------: ", userId);
    if (userId) dispatch(fetchOrdersAsync(userId));
  }, [userId]);

  if (isLoggedIn && orders) {
    const order = orders.find((order) => order.completeStatus === null);
    console.log("CURRENT CART: ", order);
    // const currCart = orderItems.map(item=>item.product)
    // console.log("CURRENT CART:" , currCart)
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`Added ${product.name} to your cart`);
    if (isLoggedIn){
      dispatch(addItemToCartDatabase(product))
    }

  };
  return (
    <div id="main-body">
      <div id="main-product-section">
        <h1 id="product-page-header">Deals With The Devil</h1>
        <div className="view-products">
          {products
            ? products.map((product) => {
                return (
                  <ul className="test" key={product.id}>
                    <div className="product-box">
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          className="product-image"
                        ></img>
                      </Link>
                      <div id="product-details">
                        <h3 className="product-name">
                          <Link
                            to={`/products/${product.id}`}
                            className="product-name"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        {/* button className="quick-add-to-cart" */}
                        <button onClick={() => handleAddToCart(product)}>
                          Add To Cart
                        </button>
                      </div>
                      <h4 className="product-price">${product.price}</h4>
                    </div>
                  </ul>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
