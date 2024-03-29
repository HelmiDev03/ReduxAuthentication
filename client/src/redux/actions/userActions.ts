import axios from 'axios';
import { Dispatch } from 'redux';
import { ERRORS, LOGOUT_USER, SUCCESS, SET_USER, UPDATE_USER } from "../reducers/type";
import { jwtDecode } from "jwt-decode";
import { setAuth } from '@/app/(utils)/setAuth';


interface UserData {
    // Define the structure of your user data object
}

export const Registration = (data: UserData, router: any) => (dispatch: Dispatch<any>) => {
    axios.post('http://localhost:5000/api/register', data)
    .then(res => {
        dispatch({
            type: ERRORS,
            payload: {}
        });
        dispatch({
            type: SUCCESS,
            payload: res.data.message
        });
    
    })
    .catch((err) => {
        dispatch({
            type: ERRORS,
            payload: err.response?.data
        });
    });
};
















export const LoginAction = (data: UserData, router: any , window:any) => (dispatch: Dispatch<any>) => {
    
    axios.post('http://localhost:5000/api/login', data)
    .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwt', token);
        const decodedToken = jwtDecode(token);
        setAuth(token);

        dispatch({
            type: SET_USER,
            payload: decodedToken
        });

        dispatch({
            type: ERRORS,
            payload: {}
        });
        window.location.reload('/dashboard');  

        
    })
    .catch((err) => {
        dispatch({
            type: ERRORS,
            payload: err.response?.data
        });
        window.location.reload('/login'); 
    });
     
};

export const LogoutAction = (router: any , window : any) => (dispatch: Dispatch<any>) => {
    localStorage.removeItem('jwt');
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    });
    window.location.reload('/login'); 
};

export const EditUser =  (id: string, data: UserData) => (dispatch: Dispatch<any>) => {
    axios.put(`http://localhost:5000/api/updateuser/${id}`, data)
    .then( res => {
        
        const token =res.data.token;
        localStorage.setItem('jwt', token);
        const decodedToken = jwtDecode(token);
        setAuth(token);
        dispatch({
            type: UPDATE_USER,
            payload:  res.data.user

        });
 
        dispatch({
            type: SUCCESS,
            payload: res.data.message
        });
    
        
        dispatch({
            type: ERRORS,
            payload: {}
        });
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: ERRORS,
            payload: err.response?.data
        });
        dispatch({
            type: SUCCESS,
            payload: {}
        });
    });
};
