import React from 'react'
import './Feeds.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

function Feeds() {

    const [feedsList, setFeedsList] = useState(null);

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        async function fetchData() {
            const response = await axios.get('http://localhost:3001/posts/feeds', { headers });
            setFeedsList(response.data.data);
        }

        fetchData();

    }, []);


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
            </div>
        </div>
    )
}

export default Feeds