import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios' 
import { toast } from 'react-hot-toast';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

 const onSubmit =async (data) => {
   const userInfo={

    email:data.email,
    password:data.password
   }
   await axios.post("http://localhost:4001/user/login",userInfo)
   .then((res)=>{
    console.log(res.data)
    if(res.data){
      
        toast.success("Login Sucessfully");
        
         document.getElementById("my_modal_3").close()
      setTimeout(() => {
      window.location.reload();
      
    localStorage.setItem("User", JSON.stringify(res.data.user))
      }, 2000);
     
    }

   }).catch((err)=>{
    console.log(err)
    setTimeout(() => {
    }, 2000);
  
    toast.error(err.response.data.message);

   })
  };
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* close button */}
            <Link
              to="/"
              onClick={()=>document.getElementById("my_modal_3").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-80 px-3 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
