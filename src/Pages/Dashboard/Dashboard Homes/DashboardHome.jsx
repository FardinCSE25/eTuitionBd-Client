import React from 'react';
import useRole from '../../../Hooks/UseRole';
import Loading from '../../../Components/Loading/Loading';
import AdminHome from './AdminHome';
import StudentHome from './StudentHome';
import TutorHome from './TutorHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole()
    
    if (roleLoading) {
        return <Loading />
    }

    if (role.role === 'Admin') {
        return <AdminHome />
    }
    else if (role.role === 'Tutor') {
        return <TutorHome />
    }
    else {
        return <StudentHome />
    }
};

export default DashboardHome;