import React, { useState } from 'react'
import ErrorMessage from '../CommonComponent/ErrorMessage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false)
  const [msg, setMsg] = useState('')
  const [type, setType] = useState('')
  const [logindt, setLogindt] = useState({
    admin_email: '',
    admin_pass: '',

  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLogindt({
      ...logindt,
      [name]: value,
    })
  }

  const handlelogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(process.env.REACT_APP_ADMIN_LOGIN, logindt)
      if (res.data.sts === 0) {
        localStorage.setItem('aid',res.data.aid)
        localStorage.setItem('aemail',res.data.aemail)
        localStorage.setItem('aname',res.data.aname)
        localStorage.setItem('token',res.data.token)  
        navigate('/adminhome')                      
      }
      else {
        setShowToast(true)
        setMsg(res.data.msg)
        setType("error")
        setTimeout(() => {
          setShowToast(false)
        }, 3000);
      }
    } catch (error) {
      console.error(error)
    }


  }
  return (
    <div>
      <ErrorMessage showToast={showToast} msg={msg} type={type} />
      <div className='container'>
        <div className='row justify-content-center mt-5'>
          <div className='col-md-4 col-sm-4 align-self-center'>
            <div className='card'>
              <div className='card-header bg-success text-white text-center'>
                <h5>Admin Login</h5>
              </div>
              <div className='card-body'>
                <div className='mb-3'>
                  <label for='admin_email' className='form-label'>Admin Email</label>
                  <input type='email' onChange={handleInputChange} className='form-control' id='admin_email' name='admin_email' placeholder='Enter Username' />
                </div>
                <div className='mb-3'>
                  <label for='admin_pass' className='form-label'>Admin Password</label>
                  <input type='password' onChange={handleInputChange} className='form-control' id='admin_pass' name='admin_pass' placeholder='Enter email' />
                </div>
                    <div className='mb-3 text-center'>
                      Forget Password <a href="adminforgetpass">Click Here</a>
                      </div>
                <div className='mb-3'>
                  <input type='button' onClick={handlelogin} className='form-control btn btn-success' name='admin_login' value={'Login'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin