'use client'
import {useEffect} from 'react'
import { jwtDecode } from "jwt-decode";
import { SET_USER } from "@/redux/reducers/type";
import { store , persistore}   from "../redux/store";
import { setAuth } from './(utils)/setAuth';

import { Provider as ReduxProvider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";







const StoreProvider = ({ children }: { children: React.ReactNode }) => {


    useEffect(() => {
        if (localStorage.jwt) {
          const decodedToken = jwtDecode(localStorage.jwt);
          
          
          store.dispatch({
            type: SET_USER,
            payload: decodedToken,
          });
          setAuth(localStorage.jwt);
        }


        //reset suceess and errors message to {} in page refresh
        
    
        
      }, [localStorage.jwt]);
        
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistore}>
    
              {children}
            
        
       
      </PersistGate>
    </ReduxProvider>
   
  )
}

export default StoreProvider
