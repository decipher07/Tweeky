import React from 'react'
import './Feeds.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

function Feeds() {

    const [feedsList, setFeedsList] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        async function fetchData() {
            const response = await axios.get('https://tweekysquareboat.herokuapp.com/posts/feeds', { headers });
            setFeedsList(response.data.data);
        }

        fetchData();

    }, []);

    const navigate = useNavigate();

    const logout = async (e) => {
        localStorage.removeItem("token");

        navigate('/login');
    }

    return (
        <div className="main">
            <div className="feedsFrame">
                <h1 className='heading'>Welcome, Catch back to people you follow</h1>

                {
                    // console.log(feedsList)
                    feedsList ? feedsList.map((item) => {
                        return item.posts.map((individualPosts) => {
                            return (
                                <div className="feedslist">
                                    <h5>@{item.username}</h5>
                                    <p>{individualPosts.content}</p>
                                </div>
                            )
                        })
                    }) : null

                }

                <div className="footerFrame">
                    <a href="http://localhost:5173/follower">
                        <input type="button" className="btn btn-dark submit" value="Check all Users" />
                    </a>
                    
                    <a href="http://localhost:5173/myposts">
                        <input type="button" className="btn btn-dark submit" value="My Posts" />
                    </a>

                    <button type="button" className="btn btn-dark submit" value="Logout" onClick={(e) => logout(e)}>Logout</button>
                </div>

            </div>
        </div>
    )
}

export default Feeds