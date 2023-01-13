import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { updateProductAsync } from "../Slices/productSlice";

export const UpdateProduct = (props) => {
console.log(product)
const [productName, setProductName] = useState("")
const [price, setPrice] = useState(0)
const [quantity, setQuantity] = useState(0)
const [description, setDescription] = useState("")
const [type, setType] = useState("")

const dispatch = useDispatch()

const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProductAsync({id: product.id, productName, price, quantity, description, type }))
}

return (
    <form id = "updateProductForm" onSubmit = {handleSubmit}>
        <div className = "formTitle"> Update Product Form</div>
        <div>{product.id}</div>
        <input className = "productName" placeholder = "product name" onChange = {(e) =>setProductName(e.target.value) }/>
        <input className = "productPrice" placeholder = "product price" onChange = {(e) =>setPrice(e.target.value) }/>
        <input className = "productQuantity" placeholder = "product quantity" onChange = {(e) =>setQuantity(e.target.value) }/>
        <input className = "productDescription" placeholder = "product description" onChange = {(e) =>setDescription(e.target.value) }/>
        <input className = "productType" placeholder = "product type" onChange = {(e) =>setType(e.target.value) }/>
        <button className = "updateProductButton" type = "submit"> Submit </button>
    </form>
)
}
export default UpdateProduct