/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const addToCart = () => {
    
  }
    return(
      <>
       <div id="main-product-section">
        <h1 id="product-page-header">Featured Virtues</h1>
        <hr></hr>
        {/* {products.map((product) => {
          return(
            <ul key={product.id}> */}
              <div className="product-box">
                <img src="https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c291bHxlbnwwfHwwfHw%3D&w=1000&q=80" className="product-image"></img>
                <div id="product-details">
                <h3 className="product-name"> Product Name
                    {/* <Link to={`/products/${product.id}`} className="product-name">{product.name} </Link> */}
                </h3>
                <button className="add-to-cart" onClick={addToCart}></button>
                </div>
                <h4 className="product-price">$19.99</h4>
            </div>
            {/* </ul>
                )
            })} */}
        </div>
        </>
    )
}

export default MainPage