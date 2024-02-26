

import "./globals.css";
import Navbar from "./(components)/navbar";
import { store , persistore}   from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { setAuth } from './(utils)/setAuth';
import { jwtDecode } from "jwt-decode";
import { SET_USER } from "@/redux/reducers/type";


import StoreProvider from "../app/provider";











export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 


  return (
 
        <html lang="en">
          <body>
            <div className="flex flex-col min-h-screen">
              <StoreProvider>
              <Navbar />
              {children}
              </StoreProvider>
            </div>
          </body>
        </html>
    
  );
}
