
'use client'

import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Getusers , Deleteuser } from '@/redux/actions/usersActions';






const Admin = () => {


    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state:any) => state.auth);
    
    const users = useSelector((state:any) => state.users);

    const DeleteUser = (e:any,id:any) => {
        e.preventDefault();
        dispatch(Deleteuser(id) as any);




    }

    useState(() => {
        dispatch(Getusers() as any);
    })
   
 
  return (


    <div className='flex flex-col b-8'>
        <div className='flex flex-row justify-between items-center'>
        <h1 className='font-bold mb-6'>admin</h1>
      
        </div>
  <div className='flex flex-row justify-between items-center'>
        <table>
            <tbody> {/* Added tbody tag */}
            <tr>
                <th> Name</th>
                <th>Email</th>
                <th>number</th>
                <th>role</th>
                <th>adress</th>
                <th>action</th>
            </tr>
            {users && users.map((user:any) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.tel}</td>
                    <td>{user.role}</td>
                    <td>{user.address}</td>
                    <td className='text-red-500'><button onClick={(e) => DeleteUser(e,user._id)}>delete</button></td>
                </tr>
            ))}
            { ! users && <p>No users found</p> }
            </tbody> {/* Added tbody tag */}
        </table>
        </div>      
    </div>

  
);

}

export default Admin
function GETUSERS(): any {
    throw new Error('Function not implemented.');
}

