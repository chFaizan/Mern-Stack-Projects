import React, { useState } from 'react'
import ErrorMessage from '../CommonComponent/ErrorMessage';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ResetPassLink = () => {
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const {rtoken} =useParams();
   const [resetpass, setResetpass] = useState({
    reset_token:rtoken,  
    admin_pass:'',
    });
    const handleInputChange = async(e)=>{
     const {name,value} = e.target

      setResetpass({
        ...resetpass,
        [name]:value,
      })
    }
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/adminloginapi/resetpass", resetpass);
        if (res.data.sts === 0) {
            setType("success");
        } else {
            setType("error");
        }
        setShowToast(true);
        setMsg(res.data.msg);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);

        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

    
  return (
    <>
    
      <ErrorMessage showToast={showToast} msg={msg} type={type} />
         <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 col-sm-4 align-self-center">
            <div className="card">
              <div className="card-header bg-success text-white text-center">
                <h5>Change Your Password</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="admin_pass" className="form-label">
                    Admin New Password
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
                    name="change_pass"
                    value="Change Password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default ResetPassLink