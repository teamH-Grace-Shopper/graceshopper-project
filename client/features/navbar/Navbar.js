/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectUserCart } from "../Slices/cartSlice";
import { clearOrder } from "../Slices/cartSlice";

import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    dispatch(clearOrder());
  };
  const firstName = useSelector((state) => state.auth.me.firstName);
  const cart = useSelector(selectUserCart);
  const showLoginSignUp = () => {
    document.querySelector("#login-signup-input").style.display = "block";
  };

  return (
    <div id="navbarBox">
      <Link to="/">
        <h1 id="storeName">
          Soul Shopper<span>Put a little soul in it</span>
        </h1>
      </Link>
      <div id="navbar-right">
        <div id="search-box">
          <input
            type="text"
            placeholder="S o u l   S e a r c h i n g . . ."
            id="search-bar"
          ></input>
          <button type="submit" id="go-button">
            Go
          </button>
        </div>
        {/* <AppRoutes /> */}
        <nav>
          {isLoggedIn ? (
            <div
              style={{ display: "flex", flexDirection: "row", height: "50%" }}
            >
              <Link
                to="/my-account"
                className="homeButton"
                style={{ fontSize: ".8rem", height: "50px" }}
              >
                Welcome {firstName},
                <br />
                Account
              </Link>
              <Link to="/" className="homeButton">
                Home <HomeIcon />
              </Link>
              <Link
                to="/"
                type="button"
                onClick={logoutAndRedirectHome}
                className="logoutButton"
              >
                Logout <LogoutIcon fontSize="small" />
              </Link>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="logoutButton"
                  style={{ alignSelf: "center" }}
                >
                  <SettingsSharpIcon />
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="loginAndSignUp">
              {/* The navbar will show these links before you log in */}
              <Link to="/" className="homeButton">
                <HomeIcon />
              </Link>
              <Link
                to="/login"
                className="loginButton"
                onClick={showLoginSignUp}
              >
                Login <LoginIcon fontSize="small" />
              </Link>
              <Link
                to="/signup"
                className="signUpButton"
                onClick={showLoginSignUp}
              >
                Sign Up <AppRegistrationIcon />
              </Link>
            </div>
          )}
        </nav>
        <div id="icon-box">
          <Link to="/cart" className="cartButton">
            <img src="https://www.pngkey.com/png/full/307-3071593_accessories-shopping-cart-icon-white.png"></img>
            <span
              style={{
                position: "absolute",
                top: "20px",
                right: "32px",
                fontSize: "1.5rem",
              }}
            >
              {cart ? cart.length : null}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
