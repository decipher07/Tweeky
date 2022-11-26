import React from 'react'
import { useState } from 'react'
import './Login.css'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);

    alert('You want to this ? ')
  }

  return (
    <div className='main'>
      <div className="loginFrame">

        <h1 className="text-center heading">Login</h1>
        <hr className="underline" />
        <h6 className="text-center sub-heading">Tweeky for Squareboat</h6>

        <div className="formClass">
          <form action="/" method="post" onSubmit={handleSubmit}>
            <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
            <input type="password" id="pass" name="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
            <div className='buttonDisp'>
              <input type="submit" className="btn btn-dark submit" value="Login" />
              <a className="btn btn-outline-dark google-btn" role="button" href="localhost:3001/auth">
                <img width="20px" alt="Google sign-in" id='googletag'
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login