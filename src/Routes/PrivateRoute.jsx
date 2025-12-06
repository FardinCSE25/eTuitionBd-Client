import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Components/Loading/Loading';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to='/login'/>
    }
    return children;
};

export default PrivateRoute;