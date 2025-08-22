import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminPages/AdminLogin';
import AdminHome from './AdminPages/AdminHome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChangePassword from './AdminPages/ChangePassword';
import ForgetPass from './AdminPages/ForgetPass';
import ResetPassLink from './AdminPages/ResetPassLink';
import AddCategory from './AdminPages/AddCategory';
import AddProduct from './AdminPages/AddProduct';
import ViewProduct from './AdminPages/ViewProduct';
import Product from './UserPages/Product';


function App() {
  const token = localStorage.getItem('token')
  const [tokendt,setTokemdt] = useState({
    token
  })

  useEffect(()=>{
    const checkToken = async()=>{
      try {
        const res = await axios.post("http://localhost:5000/adminloginapi/checktoken",tokendt)
        if(res.data.tokensts === 1){
          localStorage.removeItem('token')
          localStorage.removeItem('aid')          
          localStorage.removeItem('aname')
          localStorage.removeItem('aemail')
                        }
      } catch (error) {
        console.error(error);
      }
    }
    checkToken()
  },[])
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/adminchangepass" element={<ChangePassword />} />
        <Route path="/adminforgetpass" element={<ForgetPass />} />
         <Route path="/viewproduct" element={<ViewProduct />} />
       <Route path="/adminpassreset/:rtoken" element={<ResetPassLink />} />
            <Route path="/product" element={<Product />} />

        
                
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
