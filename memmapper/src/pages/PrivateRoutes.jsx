import React from "react";
import { useAuth } from "./AccountContext";
import { Navigate } from "react-router-dom";


const PrivateRoutes = ({ element, ...rest }) => {
    const { loggedIn } = useAuth();

    return loggedIn ? element : <Navigate to="/" />;
};

export default PrivateRoutes;