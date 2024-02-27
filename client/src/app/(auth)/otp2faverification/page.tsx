'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Registration} from '@/redux/actions/userActions'
import ErrorsActions from '@/redux/actions/errorsActions'
import { Dispatch } from 'redux'



const VerifyAccount = () => {
  

  const dispatch = useDispatch()
  const errors = useSelector((state: any) => state.errors)
  const success = useSelector((state: any) => state.success)




  const handleForm =  (e: any) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      otp: e.target.otp.value
    }
    
  
  }
    









  
  return (
    <div  className='flex flex-col justify-center items-center'>
      <h1 className='font-bold mb-6'>Verify Your Account</h1>

      <form   onSubmit={handleForm}       >
      <div>

        
<label htmlFor="email">email</label>
<input         className='mb-6 bg-[#eee]' type="text" name="email" id="email" />
</div>
      <div>

        
          <label htmlFor="otp">OTPCODE</label>
          <input         maxLength={6} className='mb-6 bg-[#eee]' type="text" name="otp" id="otp" />
        </div>
       

        <button className='bg-blue-600 text-white p-2 rounded-md' type='submit'>verify</button>
       

        
      </form>


    </div>
  )
}

export default VerifyAccount
