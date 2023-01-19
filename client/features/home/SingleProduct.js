/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, selectProduct } from "../Slices/productSlice";
import { addToCart } from "../Slices/cartSlice";

export const SingleProductView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`Added ${product.name} to the cart`)
  };

  return (
    <div id="box">
      <div id="single-product-view-box">
        <div id="single-product-image">
          <img className="singleProductImage" src={product.imageUrl}></img>
        </div>
        <div id="single-product-details">
          <h1>{product.name}</h1>
          <h3>${product.price}</h3>
          <hr></hr>
          <h4>{product.description}</h4>

          {/* <Link to="/cart"> */}
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              add to cart
            </button>
          <h4>In Stock: {product.stockAmount ? "YES" : "NO"}</h4>
          <h5>Category:{product.type}</h5>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
