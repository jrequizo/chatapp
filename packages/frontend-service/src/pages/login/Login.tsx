import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { loginUser } from './Login.controller';

import './Login.css';

interface LoginDetails {
  email: string,
  password: string
}

function Login() {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: ""
  });

  function handleLoginDetailsChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginDetails(oldLoginDetails => {
      return {
        ...oldLoginDetails,
        [name]: value,
      }
    });
  }

  function handleLoginButtonClicked() {
    async function doLoginRequest(username: string, password: string) {
      let isLoggedIn = await loginUser(username, password);

      if (isLoggedIn) {
        navigate("/chat", {replace: true});
      }
    }

    doLoginRequest(loginDetails.email, loginDetails.password);
  }

  return (
    <main className="Login">

      <section className="login-container">

        <div className="login-left-area">
          <img className="login-bg" src={`${process.env.PUBLIC_URL}/images/chatbox-logo.svg`} alt="ChatApp logo">
          </img>
        </div>

        <div className="login-right-area">
          <div className="login-form-container">
            <h2>Login</h2>
            <input type="email"
              placeholder="Email Address..." name="email"
              onChange={handleLoginDetailsChanged}
              value={loginDetails.email}>
            </input>
            <input type="password" placeholder="Password..."
              name="password" onChange={handleLoginDetailsChanged} value={loginDetails.password}>
            </input>
            <button className="loginBtn"
              onClick={handleLoginButtonClicked}>Login</button>
            <a href="/under-construction">Forgot your password?</a>
            <div>Don't have an account? Click <a href="/register">here</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login
