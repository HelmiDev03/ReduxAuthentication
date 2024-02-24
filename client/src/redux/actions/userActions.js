import axios from 'axios';
import { ERRORS, SUCCESS } from "../reducers/type";
import {SET_USER , UPDATE_USER} from '../reducers/type'
import { jwtDecode } from "jwt-decode";
import { setAuth } from '@/app/(utils)/setAuth';


export const Registration = (data, router) => dispatch => {
    axios.post('http://localhost:5000/api/register', data)
    .then(res => {
        dispatch({
            type: ERRORS,
            payload: {}
        })
   
       router.push('/login')
    })
    .catch((err) => {

        dispatch({
            type: ERRORS,
            payload: err.response?.data
        })
    })
};


export const LoginAction = (data , router) => dispatch => {
    axios.post('http://localhost:5000/api/login' , data)
    .then(res => {
        
        const {token} = res.data
        localStorage.setItem('jwt', token)
        const decodedToken = jwtDecode(token);
        setAuth(token);

        dispatch({
            type: SET_USER,
            payload: decodedToken
        }) ;
        
       


        dispatch({
            type: ERRORS,
            payload: {}
        }) ;

        router.push('/dashboard')

       
   
       
    })
    .catch((err) => {

        dispatch({
            type: ERRORS,
            payload: err.response?.data
        })
    })
};


export const LogoutAction = (router)=>dispatch=>{
    localStorage.removeItem('jwt')
    dispatch({
        type: SET_USER,
        payload: {}
    })
    router.push('/login')
}


export const EditUser = (id ,data) => dispatch => {
    

    axios.put(`http://localhost:5000/api/updateuser/${id}` , data)
    .then(res => {

        
      
        
        const user = res.data.user


        dispatch
        ({
            type: UPDATE_USER,
            payload: user
        }) ;

        dispatch({
            type: SUCCESS,
            payload: {message: res.data.message}
        }) ;
        dispatch({
            type: ERRORS,
            payload: {}
        })
     
        
    })
    .catch((err) => {
        console.log(err)
        dispatch({
            type: ERRORS,
            payload: err.response?.data
        })
        dispatch({
            type: SUCCESS,
            payload: {}
        }) ;
    })









}


