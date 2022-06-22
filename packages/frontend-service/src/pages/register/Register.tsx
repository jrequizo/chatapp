import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { endpoints, getPostRequestConfig } from "../../types/common"

import './Register.css'

interface RegisterDetails {
  email: string,
  username: string,
  password: string
}

function Register() {
  const navigate = useNavigate()

  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    email: "",
    username: "",
    password: ""
  })

  function handleRegisterDetailsChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target
    setRegisterDetails(oldRegisterDetails => {
      return {
        ...oldRegisterDetails,
        [name]: value,
      }
    })
  }
  
  function handleRegisterButtonClicked() {
    async function registerUser() {
      
      // make Fetch request
      const result = await fetch(
          endpoints.account + "register",
          getPostRequestConfig(JSON.stringify(registerDetails))
        )

        console.log(result)

        // check Fetch request result
        if (result.status === 200) {
          navigate("/chat", {replace: true})
        } else {
          // TODO: show what kind of status code it is
        }
    }
    registerUser()
  }
  
  return (
    <main className="Register">

      <section className="register-container">

      <div className="register-left-area">
        <img className="login-bg" src={`${process.env.PUBLIC_URL}/images/chatbox-logo.svg`} alt="ChatApp logo">
        </img>
      </div>

      <div className="register-right-area">
        <div className="register-form-container">
          <h2>Register</h2>
          <input type="email" 
                 name="email" 
                 placeholder="Email Address..." 
                 onChange={handleRegisterDetailsChanged}>
          </input>
          <input type="text" 
                 name="username" 
                 placeholder="Username..." 
                 onChange={handleRegisterDetailsChanged}>
          </input>
          <input type="password" 
                 name="password" 
                 placeholder="Password..." 
                 onChange={handleRegisterDetailsChanged}>
          </input>
          <button className="registerBtn" onClick={handleRegisterButtonClicked}>Sign Up</button>
          <div>Already have an account? click <a href="/">here</a>
          </div>
          </div>
      </div>

    </section>
    </main>
  )
}

export default Register
