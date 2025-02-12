import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosPrivate = axios.create({
    // baseURL: 'https://library-management-system-server-ten.vercel.app/'
    baseURL: 'http://localhost:3000/'

});

const UseAxiosPrivate = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access-token");
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 403 || error.response?.status === 401) {
                    console.error("Token expired or invalid, logging out...");
                    localStorage.removeItem("access-token"); // Clear token
                    await logOut();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosPrivate;
};

export default UseAxiosPrivate;
