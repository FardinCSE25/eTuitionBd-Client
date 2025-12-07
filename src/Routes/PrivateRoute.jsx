import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const location = useLocation()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate state={location.pathname} to='/login'/>
    }
    return children;
};

export default PrivateRoute;