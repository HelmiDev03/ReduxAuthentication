import axios from 'axios';

import {SET_USERS , DELETE_USER_USER} from '../reducers/type'



export const Getusers = () => dispatch => {
    axios.get('http://localhost:5000/api/users')
    .then(res => {
     
        dispatch({
            type: SET_USERS,
            payload: res.data
        }) ;
    })
    
     
};


export const Deleteuser = (id) => dispatch => {
    axios.delete('http://localhost:5000/api//deleteuser/'+id)
    .then(res => {
        dispatch({
            type: SET_USERS,
            payload: res.data
        }) ;
    })
    
     
};
