/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div id="welcome-box">
      <h3>Welcome {username} !</h3>
    </div>
  );
};

export default Home;
