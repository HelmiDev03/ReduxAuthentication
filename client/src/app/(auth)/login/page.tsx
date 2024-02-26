'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import ErrorsActions from '@/redux/actions/errorsActions'
import { useDispatch , useSelector} from 'react-redux'
import {  useRouter  ,  useSearchParams} from 'next/navigation'
import { LoginAction } from '@/redux/actions/userActions'





const isValidEmail = (email: string) => {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}



const Login = () => {

 
  const errors = useSelector((state:any)=>state.errors)
  const dispatch = useDispatch()
  const [error, setError] = React.useState("");
  const router = useRouter()
  const searchParams = useSearchParams()
  const handleForm = async (e: any) => {
    e.preventDefault();
    dispatch(ErrorsActions({}) as any);
  
    setError("");
   
    const email = e.target.email.value;
    const password = e.target.password.value;
   
    if (!isValidEmail(email)) {
      setError("invalid email");
      return;
    }
    if ( !password) {
      setError("please add password");
      return;
    }
    dispatch(LoginAction(   {  email, password } , router) as any);
  }
  useEffect(() => {
    const token = searchParams.get("token");
   
    if (token) {
      localStorage.setItem("jwt", token);
      router.push("/dashboard");
     
    }
  }, []);
  return (
 
    <div>
      <div  className='flex flex-col justify-center items-center'>
      <h1 className='font-bold mb-6'>login</h1>

      <form   onSubmit={handleForm}       >
        <div>
          <label htmlFor="email">Email</label>
          <input className='mb-6 bg-[#eee]' type="text" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input className='mb-6 bg-[#eee]'  type="password" name="password" id="password" />
        </div>
        <button className='ml-12 ' type="submit"> <span   className='bg-[#50d71e]'          >login</span></button>

  
        {error && <p className='text-red-500'>{error}</p>}
        {errors && <p className='text-red-500'>{errors?.message}</p>}

      </form>
      <button className='ml-12 ' type="submit"> <span   className='bg-[#50d71e]'          >sign with google</span></button>
      <Link href="/register">
        Register
      </Link>

      

    </div>
    </div>

  )
}

export default Login


