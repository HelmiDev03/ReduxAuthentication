'use client'
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; 
import { useSelector } from 'react-redux';

const Authprovider = ({ children }: { children: React.ReactNode }) => {
    const auth = useSelector((state: any) => state.auth);
    const router=useRouter();
    const pathname = usePathname();
    

    useEffect(() => {
        if (auth.isConnected) {
           
           
      
       
            router.push('/dashboard'); // Redirect to dashboard if connected
        
    }
    
    }, [auth.isConnected, router]);

    return <>{children}</>;
};

export default Authprovider;