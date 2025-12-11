import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import UseRole from '../Hooks/UseRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';

const TutorRoute = ({ children }) => {
    const { loading } = UseAuth()
    const { role, isLoading } = UseRole()

    if (loading || isLoading) {
        return <Loading />
    }

    if (role.role !== 'Tutor') {
        return <Forbidden />
    }
    return children;
};

export default TutorRoute;