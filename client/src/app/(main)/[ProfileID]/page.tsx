'use client'

import React, {  use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditUser } from '@/redux/actions/userActions';

import { AppDispatch } from '@/redux/store';

const Profile = () => {

    const dispatch = useDispatch<AppDispatch>();
    let auth = useSelector((state:any) => state.auth);
  
    let success = useSelector((state:any) => state.success);

    
   

    // State variables for form data
    const [formData, setFormData] = useState({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        tel: auth.user?.tel || '',
        address: auth.user?.address || '',
        postalcode: auth.user?.postalcode || '',
        nationality: auth.user?.nationality || ''
    });

    const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        dispatch(EditUser(auth.user?._id, formData ) );
        //stay on the page
  
    };

    return (
        <div>
            profile
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label className='text-blue-500' htmlFor="name">Name</label>
                <input className='bg-blue-200' type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <label className='text-blue-500' htmlFor="email">Email</label>
                <input className='bg-blue-200' type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                <label className='text-blue-500' htmlFor="tel">Tel</label>
                <input className='bg-blue-200' type="tel" id="tel" name="tel" value={formData.tel} onChange={handleChange} />
                <label className='text-blue-500' htmlFor="address">Address</label>
                <input className='bg-blue-200' type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                <label className='text-blue-500' htmlFor="postalcode">Postalcode</label>
                <input className='bg-blue-200' type="text" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} />
                <label className='text-blue-500' htmlFor="nationality">Nationality </label>
                <input className='bg-blue-200' type="text" id="national " name="nationality" value={formData.nationality} onChange={handleChange} />
                {success && success.message && <p>{success.message}</p>}
                <input className='bg-green-500' type="submit" value="Edit" />
            </form>
        </div>
    );
};

export default Profile;

