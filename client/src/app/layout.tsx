

import "./globals.css";
import Navbar from "./(components)/navbar";



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
