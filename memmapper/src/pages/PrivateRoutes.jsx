 import React from "react";
// import { useAuth } from "./AccountContext";
 import { Navigate, Outlet } from "react-router-dom";



// const PrivateRoutes = ({ children, ...rest }) => {
//     const { loggedIn } = useAuth();

//     return <Route {...rest}>{loggedIn ? element : <Navigate to="/" />} </Route>;
// };

const PrivateRoute = ({ user, redirectPath = '/', children }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />
  
  };

 export default PrivateRoute;