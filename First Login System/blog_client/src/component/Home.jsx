import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import WelcomePart from './WelcomePart';

const Home = () => {
  const token = localStorage.getItem('token')
 
  const navigate = useNavigate();
  useEffect(()=>{
if(token === null){
    navigate("/login")
  }
  })
  
  return (
  <>
  <WelcomePart />
  </>
  )

}

export default Home