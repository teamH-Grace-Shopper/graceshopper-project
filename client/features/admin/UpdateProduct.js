import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  selectProduct,
  updateProductAsync,
} from "../Slices/productSlice";

// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const UpdateProduct = (props) => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();

  const theme = createTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAsync({
        id: productId,
        name,
        price,
        quantity,
        description,
        type,
      })
    );
  };

  const onChange = (e) => {
    const value = e.target.value;
    const nameInput = e.target.name;
    if (nameInput === "name") setName(value);
    if (nameInput === "price") setPrice(value);
    if (nameInput === "quantity") setQuantity(value);
    if (nameInput === "description") setDescription(value);
    if (nameInput === "type") setType(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            EDIT PRODUCT: {product.name}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              autoComplete="name"
              type="text"
              value={name}
              name="name"
              onChange={onChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
              label="price"
              value={price}
              name="price"
              onChange={onChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="quantity"
              id="quantity"
              autoComplete="current-quantity"
              type="quantity"
              value={quantity}
              name="quantity"
              onChange={onChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="description"
              id="description"
              autoComplete="current-description"
              type="description"
              value={description}
              name="description"
              onChange={onChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="type"
              id="type"
              autoComplete="current-type"
              type="type"
              placeholder="GOOD or BAD"
              value={type}
              name="type"
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
              color="secondary"
            >
              Edit Product
            </Button>

            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
              fullWidth
              href="/admin"
              color="secondary"
            >
              Back To Management
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default UpdateProduct;
// <form id = "updateProductForm" onSubmit = {handleSubmit}>
//     <div className = "formTitle"> Update Product Form</div>
//     <div>{product.id}</div>
//     <input className = "productName" placeholder = "product name" onChange = {(e) =>setProductName(e.target.value) }/>
//     <input className = "productPrice" placeholder = "product price" onChange = {(e) =>setPrice(e.target.value) }/>
//     <input className = "productQuantity" placeholder = "product quantity" onChange = {(e) =>setQuantity(e.target.value) }/>
//     <input className = "productDescription" placeholder = "product description" onChange = {(e) =>setDescription(e.target.value) }/>
//     <input className = "productType" placeholder = "product type" onChange = {(e) =>setType(e.target.value) }/>
//     <button className = "updateProductButton" type = "submit"> Submit </button>
// </form>
