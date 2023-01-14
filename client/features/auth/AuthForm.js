import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate()
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const email = evt.target.email.value;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const address1 = evt.target.address1.value
    dispatch(authenticate({ firstName, lastName, email, username, password, address1, method: formName }));
    navigate('/')
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === "signup" ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="address1">
                <small>Address 1:</small>
              </label>
              <input name="address1" type="text" />
            </div>
          </div>
        ) : null}
        <div style={{ display: "flex", flexDirection: "column" }}> 
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
