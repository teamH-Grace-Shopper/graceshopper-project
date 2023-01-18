/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../Slices/productsSlice";
import { addToCart } from "../Slices/cartSlice";


export const MainPage = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
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
                    <img src={product.imageUrl} className="product-image"></img>
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
                      <button onClick={()=> handleAddToCart(product)}>Add To Cart</button>
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
