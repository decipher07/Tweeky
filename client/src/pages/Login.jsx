import React from 'react'
import { useState } from 'react'
import './Login.css'
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const body = { email, password };
    const response = await axios.post('http://localhost:3001/sign/login', body);
    
    localStorage.setItem("token", response.data.data.token);
  }

  return (
    <div className='main'>
      <div className="loginFrame">

        <h1 className="text-center heading">Login</h1>
        <hr className="underline" />
        <h6 className="text-center sub-heading">Tweeky for Squareboat</h6>

        <div className="formClass">
          <form action="/follower" method="get" onSubmit={handleSubmit}>
            <input type="text" id="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
            <input type="password" id="pass" name="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
            <div className='buttonDisp'>
              <input type="submit" className="btn btn-dark submit" value="Login" />
              <a className="btn btn-dark google-btn" role="button" href="localhost:3001/auth">
                <img width="20px" alt="Google sign-in" id='googletag'
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Login
              </a>
            </div>
            <div className="underwrittenText">
              <a href="http://www.google.com">
                <input type="button" className="btn btn-dark submit" value="Signup" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login