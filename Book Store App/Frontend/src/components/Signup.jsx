import React from 'react'
import { Link, replace, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit =async (data) => {
   const userInfo={
    fullname:data.fullname,
    email:data.email,
    password:data.password
   }
   await axios.post("http://localhost:4001/user/signup",userInfo)
   .then((res)=>{
    console.log(res.data)
    if(res.data){

        toast.success("Signup Sucessfully");
        navigate(from ,{replace:true} );
        
    }

    localStorage.setItem("User", JSON.stringify(res.data.user))

   }).catch((err)=>{
    console.log(err)
        
    toast.error(err.response.data.message);
   })
  };

  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Close Button */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>

          <h3 className="font-bold text-lg mb-4 text-center">Sign Up</h3>

          <div className="mt-2 space-y-2">
            <span>Name</span>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-3 py-1 border rounded-md outline-none"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          <div className="mt-2 space-y-2">
            <span>Email</span>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-3 py-1 border rounded-md outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div className="mt-2 space-y-2">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-1 border rounded-md outline-none"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center mt-3 text-xl">
            Have an account?{" "}
            <Link to="/" className="underline text-blue-500 cursor-pointer">
              Back
            </Link>
          </p>
        </form>
      </div>
    </dialog>
  )
}

export default Signup
