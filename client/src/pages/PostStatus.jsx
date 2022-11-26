import React from 'react'
import { useState } from 'react'
import './PostStatus.css'
import axios from 'axios';

function PostStatus() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgxYjFkMmY2YTU0ODVlMWZjNGJjYTkiLCJlbWFpbCI6InNvbWV0aGluZzEyQGdtYWlsLmNvbSIsImlhdCI6MTY2OTQ0NDczOSwiZXhwIjoxNjcyMDM2NzM5fQ.hgNBInTeeSp2n-ZmiGBKmmPVdrnKwbCZ0dvJerN_WhM',
        };

        const body = { content: message };
        const response = await axios.post('http://localhost:3001/posts/post', body, { headers });
        console.log(response);

        if (response.data.success)
            window.location = window.location
    }

    return (
        <div className="main">
            <div className="postFrameForUsers">
                <div className='headers'>
                    <h1>You can Post a status here</h1>
                </div>

                <div className="statusCode">
                    <form action="/poststatus" method="get" onSubmit={handleSubmit}>
                        <textarea className='transparent-message' name="message" id="message" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)} >
                        </textarea>
                        <div>
                            <input type="submit" className="btn btn-dark submit" value="Submit" />
                        </div>
                        <div className='buttonProp'>
                            <a href="http://localhost:5173/poststatus">
                                <input type="button" className="btn btn-dark submit" value="Feeds" />
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostStatus