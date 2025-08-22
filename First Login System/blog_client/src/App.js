
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './component/Registration';
import Login from './component/Login';
import Home from './component/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const token = localStorage.getItem('token')
  
  const [tokendt,setTokendt] = useState({
    token
  })
  useEffect(()=>{
    const checkToken = async()=>{
      try {
        const res = await axios.post('http://localhost:5000/api/user/checktoken',tokendt)
        console.log(res)
        if(res.data.tokensts===1){
          localStorage.removeItem('token')
          localStorage.removeItem('uname')
        }
      } catch (error) {
        console.error(error) 
      }
    }
    checkToken()
  }, [])
  return (
  <>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
