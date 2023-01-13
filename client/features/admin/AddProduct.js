import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../Slices/productsSlice";

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

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const theme = createTheme();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProductAsync({ name, price, quantity, description, type })
    );
  };

  const onChange = (e) => {
    const value = e.target.value;
    const nameInput = e.target.name;
    if (nameInput === "name") setName(value);
    if (nameInput === 'price') setPrice(value)
    if (nameInput === 'quantity') setQuantity(value)
    if (nameInput === 'description') setDescription(value)
    if (nameInput === 'type') setType(value)
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Add Product
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
                color="success"
              >
                Add Product
              </Button>

              <Button
                variant="outlined"
                sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
                fullWidth
                href="/admin"
                color="success"
              >
                Back To Management 
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* <form className="AddProductForm" onSubmit={handleSubmit}>
        <div className="formTitle"> New Product Form</div>
        <div>
          <label> Name </label>
          <input
            className="productName"
            placeholder="product name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            className="productPrice"
            placeholder="product price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            className="productQuantity"
            placeholder="product quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <label>Description</label>
        <input
          className="productDescription"
          placeholder="product description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <label>Product Type</label>
          <input
            className="productType"
            placeholder="product type"
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <button className="addProductFormButton" type="submit">
          Add Product
        </button>
      </form> */}
    </>
  );
};

export default AddProduct;
