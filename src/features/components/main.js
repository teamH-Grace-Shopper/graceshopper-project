import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const Main = () => {
  
    return (
        <>
       <Router>
        <div className = "bigbox">
            <nav className = "navbar">
                <h1>
                     SOUL SHOPPER 
                </h1>
                <h1>
                <Link to = "/signin"> Sign In </Link>
                </h1>
                <h1>
                <Link to = "/register"> Register </Link>
                </h1>
                <h1>
                <Link to = "/cart"> Cart </Link>
                </h1>
                <h1> searchbar</h1> 
                <button> go </button>
            
            </nav>
            <div className = "list of all products">
            <section>
            

                
            </section>
            </div>
        </div>
        </Router>
        </>
    );
};

export default Main;