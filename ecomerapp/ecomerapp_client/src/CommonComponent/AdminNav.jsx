import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const AdminNav = () => {
  const navigate = useNavigate();
  const aid = localStorage.getItem('aid');
  const aemail = localStorage.getItem('aemail');
  const aname = localStorage.getItem('aname');
  const token = localStorage.getItem('token');

  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [tokendt] = useState({ token });

  const logout = async (e) => {
    const res = await axios.post("http://localhost:5000/adminloginapi/logout", tokendt);

    if (res.data.logoutsts === 0) {
      localStorage.removeItem('aid');
      localStorage.removeItem('aemail');
      localStorage.removeItem('aname');
      localStorage.removeItem('token');
      navigate("/adminlogin");
    } else {
      setShowToast(true);
      setMsg(res.data.msg);
      setType("error");
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <>
      <ErrorMessage showToast={showToast} msg={msg} type={type} />
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Admin e-shop</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/adminhome">Home</a>
              </li>

              {/* Dropdown for Product */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  Product
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/addcategory">Add Category</a></li>
                  <li><a className="dropdown-item" href="/addproduct">Add Products</a></li>
                  
                  <li><a className="dropdown-item" href="/viewproduct">View Products</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>

              {/* Admin Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  {aname || "Admin"}
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                  <li><a className="dropdown-item" href="/adminchangepass">Change Password</a></li>
                  <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
