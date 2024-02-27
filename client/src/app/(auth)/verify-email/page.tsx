'use client'
// pages/verify-email/[userId]/[token].js

import {   useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import axios from 'axios';

const VerifyEmailPage = () => {
    const searchParams = useSearchParams();

    const userId = searchParams.get("userId");

  const token  = searchParams.get("token");
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${userId}/verify-email/${token}`);
       
        setVerificationResult(res.data.message);
      } catch (error:any) {
        setVerificationResult(error.response?.data.message || 'An error occurred');
      }
    };

    if (userId && token) {
      verifyEmail();
    }
  }, []);

  return (
    <div>
      {verificationResult ? (
        <p>{verificationResult}</p>
      ) : (
        <p>Verifying...</p>
      )}
    </div>
  );
};

export default VerifyEmailPage;
