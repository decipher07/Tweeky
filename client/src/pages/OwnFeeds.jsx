import React from 'react'
import './Feeds.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

function OwnFeeds() {

    const [feedsList, setFeedsList] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        async function fetchData() {
            const response = await axios.get('https://tweekysquareboat.herokuapp.com/posts/me/all', { headers });
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
                <h1 className='heading'>Welcome, Get all your posts</h1>

                {
                    feedsList?.allPostsOfTheParticularUser.map((item) => {
                        return (
                            <div className="feedslist">
                                {/* <h5>@{item._id}</h5> */}
                                <p>{item.content}</p>
                                <p>Updated At: {item.updatedAt}</p>
                            </div>
                        )
                    })
                }


                <div className="footerFrame">
                    <a href="http://localhost:5173/follower">
                        <input type="button" className="btn btn-dark submit" value="Check all Users" />
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

export default OwnFeeds