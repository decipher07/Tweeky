import React from 'react'
import { useState } from 'react'
import './Login.css'
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };

    try {
      const response = await axios.post('http://43.204.215.187:3001/sign/login', body);
      localStorage.setItem("token", response.data.data.token);
      navigate('/follower');
    } catch ( err ){
      alert(err.response.data.message);
    }
  }

  return (
    <div className='main'>
      <div className="loginFrame">

        <h1 className="text-center heading">Login</h1>
        <hr className="underline" />
        <h6 className="text-center sub-heading">Tweeky for Squareboat</h6>

        <div className="formClass">
          <form action="/login" method="get" onSubmit={handleSubmit}>
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
              <a href="http://localhost:5173/signup">
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