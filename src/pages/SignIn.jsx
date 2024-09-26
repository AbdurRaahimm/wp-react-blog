import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCookie } from '../libs/cookie'

export default function SignIn() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const handleSignin = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        const password = formData.get('password')
        setLoading(true)
        try {
            const response = await fetch('/api/wp-json/api/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })
            const data = await response.json()
            console.log('Data:', data)
            if(response.ok) {
                // localStorage.setItem('token', data.jwt_token)
                setCookie('token', data.jwt_token, 60)
                // window.location.href = '/'
                toast.success(data.message);
                navigate('/')
            }else {
                toast.error(data.message)
                setLoading(false)
            }
        } catch (error) {
            // console.error('Error:', error)
            toast.error('An error occurred. Please try again later.')
        }
    }   
    return (
        <div className='bg-gradient-to-r from-pink-500 to-rose-500 h-screen grid place-items-center'>
            <div className="mx-auto w-full max-w-md  space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold tracking-tight">Sign In</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Please fill in the form to sign in.</p>
                <form onSubmit={handleSignin} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Username
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="username"
                            placeholder="Enter username"
                            name="username"
                            type="text"
                            required
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Password
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="password"
                            placeholder="Enter password"
                            name="password"
                            type="password"
                            required
                        />
                        <div className="flex justify-end text-xs">
                            <a href="#" className="text-zinc-700 hover:underline dark:text-zinc-300">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                    Don&apos;t have an account?
                    <Link to="/signup" className="font-semibold underline">   Signup </Link>
                </p>
            </div>
        </div>
    )
}
