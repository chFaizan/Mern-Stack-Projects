import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WelcomePart = () => {
    const uname = localStorage.getItem('uname')
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [tokendt, setTokendt] = useState({
        token
    })
    const logout = async (e) => {
        const res = await axios.post('http://localhost:5000/api/user/logout', tokendt)
          if(res.data.logout_sts===0){
          localStorage.removeItem('token')
          localStorage.removeItem('uname')
          navigate("/login")
        }
        else{
            console.log("Logout Failed")
        }
    }
    return (
        <div style={{ overflow: 'hidden' }}>
           <p> Welcome {uname} <a href='#' onClick={logout}>Logout</a></p>
        </div>
    )
}

export default WelcomePart