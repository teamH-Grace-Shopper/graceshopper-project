import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser, updateUserAsync } from "../Slices/userSlice";

// MaterialUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "CM",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

const MyAccount = () => {
  const [value, setValue] = useState(0);
  const name = useSelector((state) => state.auth.me.username);
  const userId = useSelector((state) => state.auth.me.id);
  const user = useSelector(selectUser);

  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  //for tabs
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  //UPDATING USER
  const theme = createTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAsync({ id: userId, address1, city, state, zipCode }));
    setAddress1("");
    setCity("");
    setState("");
    setZipCode("");
  };

  // const onChange = (e) => {
  //   const value = e.target.value;
  //   const nameInput = e.target.name;
  //   if (nameInput === "address1") setAddress1(value);
  //   if (nameInput === "city") setCity(value);
  //   if (nameInput === "state") setState(value);
  //   if (nameInput === "zipcode") setZipCode(value);
  // };

  return (
    <div>
      <div>
        <p>Welcome back {name}!</p>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="orders" {...a11yProps(0)} />
            <Tab label="edit my account" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1rem",
              width: "100%",
            }}
          >
            {/* <h2>Order History</h2> */}

            <div className="cart-container">
              {user.orders && user.orders.length ? (
                user.orders.map((order) => {
                  return (
                    <div
                      key={order.orderNumber}
                      // style={{ border: "1px solid black" }}
                    >
                      {order.completeStatus ? (
                        <>
                          <p>Order Number: {order.orderNumber}</p>
                          <p>Order Date: {order.completeStatus}</p>
                          <div>Items in Order: {order.orderItems.length}</div>

                          <p id="order-total">
                            Order Total: $
                            {order.orderItems
                              ? order.orderItems.reduce((total, currVal) => {
                                  return (
                                    total +
                                    Number(currVal.price * currVal.quantity)
                                  );
                                }, 0)
                              : "Not completed"}
                          </p>
                        </>
                      ) : (
                        //if no date on complete status
                        <div className="cart-checkout">
                          <h2>Order not completed yet</h2>
                        
                          {order.orderItems
                            ? order.orderItems.map((item) => {
                                return (
                                  <p key={item.product.id}>
                                    {/* {" "} */}
                                    Product name: {item.product.name}
                                  </p>
                                );
                              })
                            : "no order items/products"}
                          <div>Items in Order: {order.orderItems.length}</div>
                          <p id="order-total">
                            Order Total: $
                            {order.orderItems
                              ? order.orderItems.reduce((total, currVal) => {
                                  return (
                                    total +
                                    Number(currVal.price * currVal.quantity)
                                  );
                                }, 0)
                              : "Not completed"}
                          </p>

                          <button>
                            <Link to="/checkout">Check out!</Link>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <h4>...No Order History</h4>
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h1>Your Details</h1>
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Address: {user.address1}</p>
              {user.address2 ? <p>Address2: {user.address2}</p> : null}
              <p>City: {user.city}</p>
              <p>State: {user.state}</p>
              <p>Zip Code: {user.zipCode}</p>
            </div>

            {/* UPDATING USER  */}
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
                  <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h4">
                    EDIT YOUR ADDRESS
                    <br />
                    {/* {user.name} */}
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
                      label="address"
                      // autoComplete="address"
                      type="text"
                      value={address1}
                      name="address1"
                      onChange={(e) => setAddress1(e.target.value)}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      // autoComplete="city"
                      label="city"
                      value={city}
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                    />

                    {/* <TextField
              margin="normal"
              required
              fullWidth
              label="state"
              // autoComplete="state"
              type="state"
              value={state}
              name="state"
              onChange={(e) => setState(e.target.value)}
            /> */}
                    <InputLabel id="demo-simple-select-helper-label">
                      state
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      autoWidth
                      label="state"
                    >
                      <MenuItem value="">
                        <em>select</em>
                      </MenuItem>
                      {states && states.length
                        ? states.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))
                        : null}
                    </Select>

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="zipCode"
                      // autoComplete="zipCode"
                      value={zipCode}
                      name="zipcode"
                      onChange={(e) => setZipCode(e.target.value)}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
                      color="success"
                    >
                      Edit Address
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
                      fullWidth
                      href="/my-account"
                      color="success"
                    >
                      Back To Orders
                    </Button>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default MyAccount;
