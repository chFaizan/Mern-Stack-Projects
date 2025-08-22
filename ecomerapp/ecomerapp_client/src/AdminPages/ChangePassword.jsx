import React, { useEffect, useState } from 'react';
import ErrorMessage from '../CommonComponent/ErrorMessage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../CommonComponent/AdminNav';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');

  const aid = localStorage.getItem('aid');
  const aemail = localStorage.getItem('aemail');
  const aname = localStorage.getItem('aname');
  const token = localStorage.getItem('token');

  const [cpassdt, setCpassdt] = useState({
    admin_email: aemail,
    old_pass: '',
    admin_pass: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCpassdt({
      ...cpassdt,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:5000/adminloginapi/updatepass", cpassdt);
        console.log(res);

        setShowToast(true);
        setMsg(res.data.msg);
        if (res.data.chpasssts === 0) {
            setType("success");
        } else {
            setType("error");
        }

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    } catch (error) {
        console.error(error);
    }
};

 

  useEffect(() => {
    if (token === null) {
      navigate('/adminlogin');
    }
  })

  return (
    <div>
      <ErrorMessage showToast={showToast} msg={msg} type={type} />
      <AdminNav />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 col-sm-4 align-self-center">
            <div className="card">
              <div className="card-header bg-success text-white text-center">
                <h5>Change Password of {aemail}</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="old_pass" className="form-label">
                    Old Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="old_pass"
                    name="old_pass"
                    onChange={handleInputChange}
                    placeholder="Enter Old Password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="admin_pass" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="admin_pass"
                    name="admin_pass"
                    onChange={handleInputChange}
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="button"
                    onClick={handleSubmit}
                    className="form-control btn btn-success"
                    name="admin_cpass"
                    value="Change Password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ChangePassword;
