import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='flex flex-col justify-center items-center space-y-2 h-screen'>
            <h1 className='text-3xl font-bold'>404 Not Found</h1>
            <Link to='/' className='text-blue-500'>Go Home</Link>
        </div>
    )
}
