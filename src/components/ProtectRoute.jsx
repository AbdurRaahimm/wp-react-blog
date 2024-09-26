import React, { useEffect } from 'react'
import { getCookie } from '../libs/cookie';
import { useNavigate } from 'react-router-dom';

export default function ProtectRoute({children}) {
    const navigate = useNavigate();
    const token = getCookie('token');
    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
    }, [token, navigate]);
  return (
    <>
      {
        token ? children : navigate('/signin')

      }
    </>
  )
}
