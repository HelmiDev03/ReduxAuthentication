'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useSelector } from 'react-redux';

const Authprovider = ({ children }: { children: React.ReactNode }) => {
    const auth = useSelector((state: any) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if ( ! auth.isConnected) {
            router.push('/login'); // Redirect to dashboard if connected
        }
    }, [ router]);

    return <>{children}</>;
};

export default Authprovider;
