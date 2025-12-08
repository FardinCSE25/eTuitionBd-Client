import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosSecure = () => {
    const { user, loading, logOut } = UseAuth()
    console.log(user, loading, user?.accessToken, );


    
    const navigate = useNavigate()
    useEffect(() => {
        if(!loading && user?.accessToken){
            console.log("Hello", user?.accessToken);
            
            const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        }, (error) => {
            console.log(error);
             const statusCode = error?.response?.status;
            if (statusCode === 403) {
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
            }
            return Promise.reject(error)
        })
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
        }
    }, [user, logOut, navigate, loading])

    return axiosSecure;
};

export default UseAxiosSecure;