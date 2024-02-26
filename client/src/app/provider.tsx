'use client'
import {useEffect} from 'react'
import { jwtDecode } from "jwt-decode";
import { SET_USER } from "@/redux/reducers/type";
import { store , persistore}   from "../redux/store";
import { setAuth } from './(utils)/setAuth';

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";







const StoreProvider = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        if (localStorage.jwt) {
          const decodedToken = jwtDecode(localStorage.jwt);
          console.log(decodedToken);
          
          store.dispatch({
            type: SET_USER,
            payload: decodedToken,
          });
          setAuth(localStorage.jwt);
        }
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
