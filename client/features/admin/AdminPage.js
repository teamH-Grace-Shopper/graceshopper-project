import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../Slices/productsSlice";
import { fetchUsersAsync, selectUsers } from "../Slices/usersSlice";

// MaterialUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

const AdminPage = () => {
  const [value, setValue] = useState(0);
  const username = useSelector((state) => state.auth.me.username);

  const products = useSelector(selectProducts);
  const users = useSelector(selectUsers);
  console.log(users);

  const dispatch = useDispatch(selectUsers);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchUsersAsync());
  }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    if (e.target.name === "edit") {
        console.log("EDIT FORM")
    }
    if (e.target.name === "delete"){
        // delete the form
        console.log("FORM DELETE")
    }
  }

  return (
    <div>
      <div>
        <p>Welcome {username}, you are an administrator</p>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="inventory" {...a11yProps(0)} />
            <Tab label="users" {...a11yProps(1)} />
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
            {products && products.length
              ? products.map((product) => {
                  return (
                    <div key={product.id}>
                      <img
                        src={product.imageUrl}
                        style={{
                          width: "250px",
                          height: "250px",
                          borderRadius: "10px",
                        }}
                      ></img>
                      <div>
                        <div>
                          {product.name}
                          <Link to={`/products/${product.id}`}>
                            {product.name}
                          </Link>
                        </div>
                        {/* <button className="quick-add-to-cart" onClick={addToCart}></button> */}
                      </div>
                      <div>Quantity: {product.quantity}</div>
                      <div>Price: ${product.price}</div>
                      <button onClick={handleClick} name="edit">Edit</button>
                      <button onClick={handleClick} name ="delete">Delete</button>
                    </div>
                  );
                })
              : null}
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
        >
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1rem" }}
          >
            {users && users.length
              ? users.map((user) => {
                  return (
                    <div
                      key={user.id}
                      style={{ border: "1px solid black", width: "250px", display: "flex", flexDirection: "column", justifyContent: "space-evenly", padding: "5px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "5px",
                        }}
                      >
                        <p> {user.firstName} </p>
                        <p> {user.lastName} </p>
                      </div>
                      <div>Email: {user.email}</div>
                      <div>Admin Rights: {user.isAdmin ? "Yes" : "No"}</div>
                      <button style={{width: "50px"}}>Edit</button>
                    </div>
                  );
                })
              : null}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default AdminPage;
