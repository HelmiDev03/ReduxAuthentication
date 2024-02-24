

import React from 'react'

const Admin = () => {
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
                <th>cin</th>
                <th>adress</th>
                <th>action</th>
            </tr>
            <tr >
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
                <td>22222</td>
                <td>adress</td>
                <button > <span className='text-red-500'>delete</span></button>
            </tr>
            <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>50</td>
                <td>22222</td>
                <td>adress</td>
                <button><span className='text-red-500'>delete</span></button>
            </tr>
            </tbody> {/* Added tbody tag */}
        </table>
        </div>      
    </div>
  )
}

export default Admin
