
'use client'

import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Getusers , Deleteuser , AddUser } from '@/redux/actions/usersActions';
import { AppDispatch } from '@/redux/store';






const Admin = () => {


    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state:any) => state.auth);
  
    const users = useSelector((state:any) => state.users);

    const DeleteUser = (e:any,id:any) => {
        e.preventDefault();
        dispatch(Deleteuser(id) as any);




    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
        password: ''
    });


    const adduser = async (e:any) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
       const password = e.target.password.value;
        const tel = e.target.tel.value;
        dispatch(AddUser({name,email,tel,password}) );
        
    }


    useState(() => {
      if  (auth.user?.role !== 'admin') {
             router.push('/dashboard');
             return null;
        }
        //wait 1 second
        
            dispatch(Getusers() );
        
        
      
    })

   
 
  return (


    <div className='flex flex-col b-8'>
        <div className='flex flex-row justify-between items-center'>
        <h1 className='font-bold mb-6'>admin</h1>

        <form   onSubmit={adduser}>
            <h1>add user</h1>
            <label htmlFor="name">Name</label>
            <input className='bg-gray-500' type="text" id="name" name="name" /><br />
            <label htmlFor="email">Email</label>
            <input className='bg-gray-500'  type="email" id="email" name="email" /><br />
            <label htmlFor="tel">Tel</label>
            <input className='bg-gray-500'  type="tel" id="tel" name="tel" /><br />
            <label htmlFor="password">password</label>
            <input className='bg-gray-500'  type="password" id="password" name="password" /><br />

            <input className='bg-green-500' type="submit" value="add user" />
        </form>
      
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

