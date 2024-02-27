'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '@/redux/actions/userActions';
import { useRouter } from 'next/navigation';
import  {AppDispatch} from '@/redux/store';
const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch< AppDispatch>();
  const auth = useSelector((state:any) => state.auth);
  

  const logout = (e:any) => {
    e.preventDefault();
    dispatch( LogoutAction(router) );

  }
  useEffect(() => {
   
  }, [auth]);

  return (
    <div>
    <ul className='flex justify-between gap-10 mb-[300px]'>
      {auth.isConnected && auth.user && <li><Link href='/dashboard'>dashboard</Link></li>}
      {! auth.isConnected && <li><Link href='/login'>login</Link></li>}
      {! auth.isConnected && <li><Link href='/register'>register</Link></li>}
      {auth.isConnected && auth.user &&<li><button type='submit' onClick={(e)=>{router.push(`/${auth.user._id}`)}}>Profile</button></li>}

      {auth.isConnected && auth.user?.role==='admin' && <li><button type='submit' onClick={(e)=>{router.push('/admin')}}>Admin space</button></li>}
     

    
      {auth.isConnected && auth.user && <li>Name : {auth.user.name}</li>}
      {auth.isConnected && auth.user && <li><button type='submit' onClick={logout}>logout</button></li>}
    </ul>
    </div>
  );
};

export default Navbar;
