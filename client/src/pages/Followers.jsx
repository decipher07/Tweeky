import React from 'react';
import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Followers.css';
import axios from 'axios';

function Followers() {

    const [followersList, setFollowersList] = useState(null);

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        async function fetchData() {
            const response = await axios.get('https://tweekysquareboat.herokuapp.com/follow/getAllUsers', { headers });
            setFollowersList(response.data.data);
        }

        fetchData();

    }, []);


    const followAUser = async (e, userId) => {
        
        const token = localStorage.getItem("token");
        
        const headers = {
            'Authorization': `Bearer ${token}`,
        };


        try {
            const body = { "userIdRecipient": userId };
            await axios.post('https://tweekysquareboat.herokuapp.com/follow/followUser', body, { headers });

        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    }

    const navigate = useNavigate();

    const logout = async (e) => {
        localStorage.removeItem("token");

        navigate('/login');
    }

    return (
        <div className="main">
            <div className="followerFrame">
                <div className='headers'>
                    <h1>You can try following these users</h1>
                </div>
                {
                    followersList ? followersList.map((item) => {
                        return (<div className="userListing"> <h5>{item.name}</h5> <h5>@{item.username}</h5><button className="btn btn-dark submit" value="Signup" onClick={(e) => followAUser(e, item._id)}>Follow</button></div>)
                    }) : null
                }

                <div className="footerFrame">
                    
                    <a href="http://localhost:5173/poststatus">
                        <input type="button" className="btn btn-dark submit" value="Post status" />
                    </a>

                    <a href="http://localhost:5173/feeds">
                        <input type="button" className="btn btn-dark submit" value="Feeds" />
                    </a>

                    <button type="button" className="btn btn-dark submit" value="Logout" onClick={(e) => logout(e)}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Followers