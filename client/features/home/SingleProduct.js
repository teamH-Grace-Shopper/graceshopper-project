/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, selectProduct } from "../Slices/productSlice";


export const SingleProductView = () => {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();
    const { id } = useParams();
const product = useSelector(selectProduct);

useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch]);

    const increment =(e) =>{
        quantity++
        
    }

    const decrement = (e) => {
        quantity--
    }

    return(
        <div id="box">
        <div id="single-product-view-box">
            <div id="single-product-image">
                <img src={product.imageUrl}></img>
            </div>
            <div id="single-product-details">
                <h1>{product.name}</h1>
                <h3>{product.price}</h3>
                <hr></hr>
                <h4>{product.description}</h4>
                
                {/* <section id='quantity-input'>
                <button type='button' value='-' className='qtyminus minus' field='quantity' onClick={() => setCount(count--)}> - </button>
                <p style= {{color: "black"}} name='quantity' value={count} className='qty'></p>
                <button type='button' value='+' className='qtyplus plus' field='quantity' onClick={() =>setCount(count++)}> + </button>
                </section> */}

                <button className="add-to-cart">add to cart</button>
                <h4>In Stock: {product.quantity}</h4>
                <h5>Category:{product.type}</h5>

            </div>
        </div>
        </div>
    )
}

export default SingleProductView