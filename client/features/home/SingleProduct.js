/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


export const SingleProductView = () => {
    let [quantity, setQuantity] = useState(0)

    const increment =() =>{
        quantity++
    }

    const decrement = () => {
        quantity--
    }
    return(
        <div id="box">
        <div id="single-product-view-box">
            <div id="single-product-image">
                <img src="https://st2.depositphotos.com/2288675/5430/i/600/depositphotos_54306899-stock-photo-balance-and-harmony-in-nature.jpg"></img>
            </div>
            <div id="single-product-details">
                <h1>Product Name</h1>
                <h3>Price</h3>
                <hr></hr>
                <h4>Product Description</h4>
                <form id='quantity-input' method='POST' action='#'>
                <input type='button' value='-' className='qtyminus minus' field='quantity' onChange={(e) => decrement(e.target.value)}/>
                <input type='text' name='quantity' value={quantity} className='qty'></input>
                <input type='button' value='+' className='qtyplus plus' field='quantity' onChange={(e) =>increment(e.target.value)} />
                </form>

                <button className="add-to-cart">add to cart</button>
                <h5>Category:</h5>
            </div>
        </div>
        </div>
    )
}

export default SingleProductView