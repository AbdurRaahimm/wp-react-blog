import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../libs/cookie';

export default function PublicRoute({ children }) {
    const navigate = useNavigate();
    const token = getCookie('token');
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);
    return (
        <>
            {
                token ? navigate('/') : children
            }
        </>
    )
}
