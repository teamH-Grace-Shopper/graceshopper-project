/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
// import Home from "../home/Home";
// import AuthForm from "../auth/AuthForm";
// import AppRoutes from "../../app/AppRoutes";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const username = useSelector((state) => state.auth.me.username);

  const showLoginSignUp = () => {
    document.querySelector("#login-signup-input").style.display = "block";
  };

  return (
    <div id="navbarBox">
      <Link to="/"><h1 id="storeName">
        Soul Shopper<span>Put a little soul in it</span>
      </h1></Link>
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
            <div>
              <div id="welcome-box">
                <h3>Welcome {username} !</h3>
              </div>
              {/* The navbar will show these links after you log in */}
              <Link to="/" className="homeButton">
                Home
              </Link>
              <button
                type="button"
                onClick={logoutAndRedirectHome}
                className="logoutButton"
              >
                Logout
              </button>
              {isAdmin ? <Link to="/admin"> ADMIN MANAGEMENT PAGE</Link> : null}
            </div>
          ) : (
            <div className="loginAndSignUp">
              {/* The navbar will show these links before you log in */}
              <Link to="/" className="homeButton">
                Home
              </Link>
              <Link
                to="/login"
                className="loginButton"
                onClick={showLoginSignUp}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="signUpButton"
                onClick={showLoginSignUp}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
        <div id="icon-box">
          <Link to="/cart" className="cartButton">
            <img src="https://www.pngkey.com/png/full/307-3071593_accessories-shopping-cart-icon-white.png"></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
