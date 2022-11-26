import React from 'react';
import { useState, useEffect } from 'react'
import './Followers.css';
import axios from 'axios';

function Followers() {

    const [followersList, setFollowersList] = useState(null);

    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgxYjFkMmY2YTU0ODVlMWZjNGJjYTkiLCJlbWFpbCI6InNvbWV0aGluZzEyQGdtYWlsLmNvbSIsImlhdCI6MTY2OTQ0NDczOSwiZXhwIjoxNjcyMDM2NzM5fQ.hgNBInTeeSp2n-ZmiGBKmmPVdrnKwbCZ0dvJerN_WhM',
        };

        async function fetchData() {
            const response = await axios.get('http://localhost:3001/follow/getAllUsers', { headers });
            setFollowersList(response.data.data);
        }

        fetchData();

    }, []);


    const followAUser = async (e, userId) => {
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgxYjFkMmY2YTU0ODVlMWZjNGJjYTkiLCJlbWFpbCI6InNvbWV0aGluZzEyQGdtYWlsLmNvbSIsImlhdCI6MTY2OTQ0NDczOSwiZXhwIjoxNjcyMDM2NzM5fQ.hgNBInTeeSp2n-ZmiGBKmmPVdrnKwbCZ0dvJerN_WhM',
        };


        try {
            const body = { "userIdRecipient": userId };
            const response = await axios.post('http://localhost:3001/follow/followUser', body, { headers });
            console.log(response);
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
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
                    
                    <a href="http://www.google.com">
                        <input type="button" className="btn btn-dark submit" value="Post status" />
                    </a>

                    <a href="http://www.google.com">
                        <input type="button" className="btn btn-dark submit" value="Feeds" />
                    </a>

                </div>
            </div>
        </div>
    )
}

export default Followers