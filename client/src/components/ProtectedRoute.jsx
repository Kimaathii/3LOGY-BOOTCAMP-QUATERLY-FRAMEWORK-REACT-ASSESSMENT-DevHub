import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";




function ProtectedRoute({children}){
    const {user, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }


    return children
}

export default ProtectedRoute;