import React, { useState } from 'react'
import ErrorMessage from '../CommonComponent/ErrorMessage';
import axios from 'axios';
const ForgetPass = () => {
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [resetpassdt, setResetpassdt] = useState({
    admin_email:'',
  });
    const handleInputChange = async(e)=>{
      const {name,value} = e.target

      setResetpassdt({
        ...resetpassdt,
        [name]:value,
      })
    }
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/adminloginapi/sendresetlink", resetpassdt);
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
                <h5>Forget Password ??</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="admin_email" className="form-label">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="admin_email"
                    name="admin_email"
                    onChange={handleInputChange}
                    placeholder="Enter Your Email"
                  />
                </div>
        
                <div className="mb-3">
                  <input
                    type="button"
                    onClick={handleSubmit}
                    className="form-control btn btn-success"
                    name="send_link"
                    value="Send Reset Link"
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

export default ForgetPass