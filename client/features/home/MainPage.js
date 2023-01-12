/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../Slices/productsSlice";

export const MainPage = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const addToCart = () => {
    
  }
    return(
      <>
       <div id="main-product-section">
        <h1 id="product-page-header">Featured Virtues</h1>
        <hr></hr>
        {products.map((product) => {
          return(
            <ul key={product.id}>
              <div className="product-box">
                <img src={product.imageUrl} className="product-image"></img>
                <div id="product-details">
                <h3 className="product-name"> {product.name}
                    {/* <Link to={`/products/${product.id}`} className="product-name">{product.name} </Link> */}
                </h3>
                <button className="add-to-cart" onClick={addToCart}></button>
                </div>
                <h4 className="product-price">{product.price}</h4>
            </div>
            </ul>
                )
            })}
        </div>
        </>
    )
}

export default MainPage