import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate();
          const [msg,setMsg] = useState(null);
      const [logindt,setLogindt] = useState({
           
            user_email: '',
            password: '',
            
        })

        const handleInputChange = (e)=>{
            const {name,value} = e.target
            setLogindt({
                ...logindt,
                [name]:value,
            })
        }
         const handleSubmit = async(e)=>{
           e.preventDefault();
           try {
            const res = await axios.post('http://localhost:5000/api/user/userlogin',logindt)
            console.log(res)
            if(res.data.sts ===0){
              localStorage.setItem('token',res.data.token)
               localStorage.setItem('uname',res.data.user_name)
               navigate('/home')
            }else if(res.data.sts ===0){
                setMsg(res.data.msg)
            }
            else{
                setMsg(res.data.msg)
            }
           } catch (error) {
            console.error(error);
           }
        }
  return (
    <div>
      <table align="center">
      
        <tr>
          <td>User Email</td>
          <td><input type="text" name="user_email" onChange={handleInputChange} /></td>
        </tr>
      
        <tr>
          <td>Password</td>
          <td><input type="password" name="password" onChange={handleInputChange}/></td>
        </tr>
        
        <tr>
          <td colspan="2">
            <button onClick={handleSubmit} type="submit">Login</button>
          </td>
        </tr>
           <tr>
           <td colspan="2" align='center'style={{color:'red'}}>
            {msg}
          </td>
        </tr>
    
      </table>  </div>
  )
}

export default Login