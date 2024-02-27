import axios from 'axios';

import {SET_USERS } from '../reducers/type'
import { Dispatch } from 'redux';



export const Getusers = () => (dispatch: Dispatch<any>) => {
    axios.get('http://localhost:5000/api/users')
    .then(res => {
     
        dispatch({
            type: SET_USERS,
            payload: res.data
        }) ;
    })
    
     
};


export const Deleteuser = (id:any) => (dispatch: Dispatch<any>)=> {
    axios.delete('http://localhost:5000/api//deleteuser/'+id)
    .then(res => {
        dispatch({
            type: SET_USERS,
            payload: res.data
        }) ;
    })
    
     
};


export const AddUser = (data:object) => (dispatch: Dispatch<any>)=> {
    
    axios.post('http://localhost:5000/api/adduser/' , data)
    .then(res => {
        dispatch({
            type: 'ADD_USERS',
            payload: res.data.users
        }) ;
    })
    
     
};

