import React , {useState} from "react"
import { useDispatch } from "react-redux"
import { addProductAsync } from "../Slices/productsSlice"

export const AddProduct = () =>  {
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProductAsync({productName, price, quantity, description, type}))
    }

    return (
        <form className = "newProductForm" onSubmit = {handleSubmit}>
        <div className = "formTitle"> New Product Form</div>
        <input className = "productName" placeholder = "product name" onChange = {(e) =>setProductName(e.target.value) }/>
        <input className = "productPrice" placeholder = "product price" onChange = {(e) =>setPrice(e.target.value) }/>
        <input className = "productQuantity" placeholder = "product quantity" onChange = {(e) =>setQuantity(e.target.value) }/>
        <input className = "productDescription" placeholder = "product description" onChange = {(e) =>setDescription(e.target.value) }/>
        <input className = "productType" placeholder = "product type" onChange = {(e) =>setType(e.target.value) }/>
        <button type = "submit"> Submit </button>
    </form>
    )

}

export default AddProduct