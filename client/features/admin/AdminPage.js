import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts, deleteProductAsync } from "../Slices/productsSlice";
import { fetchUsersAsync, selectUsers } from "../Slices/usersSlice";


// MaterialUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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

//   const [showForm, setShowForm] = useState(false)

  const products = useSelector(selectProducts);
  const users = useSelector(selectUsers);
  console.log(users);

  const navigate = useNavigate()
  const dispatch = useDispatch(selectUsers);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchUsersAsync());
  }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleEdit = (id) => {
        console.log("EDIT FORM")
        // navigate to form?
        navigate(`/admin/products/edit/${id}`)
        // setShowForm(!showForm)
  }
  const handleDelete = (id)=> {
        // delete the form
        dispatch(deleteProductAsync(id))
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
        <button><Link to="/admin/products/addProduct" style={{color:"black"}}>Add Product</Link></button>
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
                      </div>
                      <div>Quantity: {product.quantity}</div>
                      <div>Price: ${product.price}</div>
                      <button onClick={()=>handleEdit(product.id)}>Edit</button>
                      <button onClick={()=>handleDelete(product.id)}>Delete</button>
                      {/* {showForm ? <UpdateProduct product={product} /> : null} */}
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
