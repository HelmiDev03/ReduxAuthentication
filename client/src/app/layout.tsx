'use client'

import "./globals.css";
import Navbar from "./(components)/navbar";
import store  from "../redux/store";
import { Provider } from "react-redux";
import { setAuth } from './(utils)/setAuth';
import { jwtDecode } from "jwt-decode";
import { SET_USER } from "@/redux/reducers/type";
import { LogoutAction } from "@/redux/actions/userActions";




if (localStorage.jwt) {
  const decodedToken = jwtDecode(localStorage.jwt);
  store.dispatch({
    type: SET_USER,
    payload: decodedToken,
  });
  setAuth(window.localStorage.jwt);

}





export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



 


  




  return (
    <Provider store={store}>
  
    <html lang="en">
      <body >
    <div className="flex flex-col min-h-screen">
 
           <Navbar  />
    
          
          {children}
  


    </div>
    </body>
    </html>
    </Provider>


        
  );
}
