import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNav from '../CommonComponent/AdminNav';

const AdminHome = () => {
  const navigate = useNavigate();

const aid = localStorage.getItem('aid');
const aemail = localStorage.getItem('aemail');
const aname = localStorage.getItem('aname');
const token = localStorage.getItem('token');

useEffect(() => {
  if (token == null) {
    navigate('/adminlogin');
  }
}, [token, navigate]);

return (
  <div>
    <AdminNav />
    <p>Welcome {aname}</p>
  </div>
);

}

export default AdminHome


