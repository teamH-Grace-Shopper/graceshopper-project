import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import AuthForm from '../auth/AuthForm';
import Home from '../home/Home';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div id= "navbarBox">
      <h1 id= "storeName">Soul Shopper<span>Put a little soul in it</span></h1>
        <div id="navbar-right">
        <div id="search-box">
          <input type="text" placeholder="Soul Searching..." id="search-bar"></input>
          <button type="submit" id="go-button">Go</button>
        </div>
          <Home />
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="homeButton">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome} className="logoutButton">
              Logout
            </button>
          </div>
        ) : (
          <div className= "loginAndSignUp">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className= "loginButton">Login</Link>
            <Link to="/signup" className= "signUpButton">Sign Up</Link>
          </div>
        )}
      </nav>
      <div id="icon-box">
          <Link to="/cart" className="cartButton"><img src="https://www.pngkey.com/png/full/307-3071593_accessories-shopping-cart-icon-white.png"></img></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;