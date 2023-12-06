import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
   
    const login = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        try {
            fetch('http://localhost:3001/logout', {
              method: 'POST',
              credentials: 'include',
            });
      
            // Invalidate the session on the client-side
            setLoggedIn(false);
          } catch (error) {
            console.error('Logout failed:', error);
          }
        };
    

    return (

        // can set loggedIn to true from anywhere in app
        <UserContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error("useAuth needs to be within an AccountContext")
    }
    return context;
};