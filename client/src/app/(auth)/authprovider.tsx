'use client'
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';

const Authprovider = ({ children }: { children: React.ReactNode }) => {
    const auth = useSelector((state: any) => state.auth);
    const router=useRouter();
    const errors = useSelector((state:any)=>state.errors)
    const success = useSelector((state:any)=>state.success)
   
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (success.message != '' ) {
            dispatch(
              {
                type: "SUCCESS",
                payload: '',
              })
            }
            if (errors){
              dispatch({
                type: "ERRORS",
                payload: {},
                   }
                  )
            }
        if (auth.isConnected) {
           
           
      
       
            router.push('/dashboard'); // Redirect to dashboard if connected
        
    }
    
    }, [router]);

    return <>{children}</>;
};

export default Authprovider;
