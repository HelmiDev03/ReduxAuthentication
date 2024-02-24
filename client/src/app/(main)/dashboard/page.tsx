'use client'
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const auth = useSelector((state: any) => state.auth);

  const name = auth.user ? auth.user.name : '';


  return (
    <div>
      Welcome {name ? name : 'to dashboard'}
    </div>
  );
 
};

export default Dashboard;
