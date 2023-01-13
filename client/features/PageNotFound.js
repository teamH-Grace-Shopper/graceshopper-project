import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>SORRY PAGE NOT FOUND</h1>
      <h2> REDIRECT BACK TO HOME 🥰 </h2>

      <button>
        <Link to="/"> HOME </Link>
      </button>
    </div>
  );
};

export default PageNotFound;
