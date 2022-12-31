import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './Context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center">
            <progress className="progress w-56 my-20"></progress>
        </div>
    }


    if (user?.uid) {
       return children
    }
    return <Navigate to='/login' state={{from:location}}></Navigate>
};

export default PrivateRoute;