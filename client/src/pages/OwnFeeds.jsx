import React from 'react'
import './Feeds.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

function OwnFeeds() {

    const [feedsList, setFeedsList] = useState(null);

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        async function fetchData() {
            const response = await axios.get('http://localhost:3001/posts/me/all', { headers });
            setFeedsList(response.data.data);
        }

        fetchData();

    }, []);


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
            </div>
        </div>
    )
}

export default OwnFeeds