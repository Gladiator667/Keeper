import React from "react";
import { useUserAuth } from "../context/authContext";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    let {currentUser} = useUserAuth();
    if(!currentUser){
        return(
            <Navigate to="/" />
        );
    }

    return children
}

export default ProtectedRoute;
