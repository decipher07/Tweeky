import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './SignUp.css'

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    function ValidateEmail(mail) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ValidateEmail(email))
            alert("Please enter the correct email");

        try {
            const body = { name, username, password, email };
            const response = await axios.post('http://localhost:3001/sign/signup', body);
            
            if ( response.status == 201 )
                navigate('/login');
            else
                alert(response.data.message)
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    }

    return (
        <div className='main'>
            <div className="loginFrame">

                <h1 className="text-center heading">Sign Up</h1>
                <hr className="underline" />
                <h6 className="text-center sub-heading">Tweeky for Squareboat</h6>

                <div className="formClass">
                    <form action="/" method="post" onSubmit={handleSubmit}>
                        <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
                        <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                        <input type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                        <input type="password" id="pass" name="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                        <div className="underwrittenText">
                            <input type="submit" className="btn btn-dark submit" value="Signup" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp