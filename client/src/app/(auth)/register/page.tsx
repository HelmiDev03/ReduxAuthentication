'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Registration} from '@/redux/actions/userActions'
import ErrorsActions from '@/redux/actions/errorsActions'
import { Dispatch } from 'redux'



const Register = () => {
  const errors = useSelector((state:any)=>state.errors)
  const success = useSelector((state:any)=>state.success)

  
  const [error  ,   setError] = useState('' ) ;
  const router = useRouter()  
  
   const isValidEmail = (email: string) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const dispatch = useDispatch()




  const handleForm =  (e: any) => {
    e.preventDefault();
    dispatch(ErrorsActions({}) as any);
  
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

 
    if (!name) {
      setError("invalid name");
      return;
    }

    if (!isValidEmail(email)) {
      setError("invalid email");
      return;
    }
    if (password.length < 6 || !password) {
      setError("invalid password");
      return;
    }

    dispatch(Registration(   { name, email, password } , router) as any);
    
   

  }
    









  
  return (
    <div  className='flex flex-col justify-center items-center'>
      <h1 className='font-bold mb-6'>Register</h1>

      <form   onSubmit={handleForm}       >
      <div>
          <label htmlFor="name">Name</label>
          <input className='mb-6 bg-[#eee]' type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input className='mb-6 bg-[#eee]' type="text" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input className='mb-6 bg-[#eee]'  type="password" name="password" id="password" />
        </div>
        <button className='ml-12 ' type="submit"> <span   className='bg-[#50d71e]'          >Register</span></button>
        {error && <p className='text-red-500'>{error}</p>} 
        {errors && <p className='text-red-500'>{errors?.email}</p>}
        {success.message && (<p className='text-green-500'>{success.message}</p>)}

        
      </form>

      <Link  href='/login'>  <span className='text-blue-600'>   have acc , go login </span>  </Link>

    </div>
  )
}

export default Register
