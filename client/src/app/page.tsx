
'use client'

import Login from '@/app/(auth)/login/page'
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function Home() {
  const pathname = usePathname();
const router = useRouter();


  const auth = useSelector((state: any) => state.auth);
if (pathname === '/' && auth.isConnected) {
  router.push('/dashboard'); // Redirect to dashboard if connected and on homepage

}







  return (

      <Login />
   
  );
}
