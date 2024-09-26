import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SignUp() {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const handleSignup = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const first_name = formData.get('first_name')
        const last_name = formData.get('last_name')
        const email = formData.get('email')
        const password = formData.get('password')
        const username = first_name + ' ' + last_name;
        const user_role = formData.get('user_role')
        console.log('Data:', { username, email, password, user_role })
        setLoading(true)
        try {
            const response = await fetch('/api/wp-json/custom/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username,
                    email,
                    password,
                    role: [user_role]
                })
            })
            const res = await response.json()
            console.log('Data:', res)
            if(response.ok) {
                // window.location.href = '/'
                toast.success(res);
                navigate('/signin')
            }else {
                toast.error(res.message)
                setLoading(false)
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('An error occurred. Please try again later.')
        }
    }
    return (
        <div className='bg-gradient-to-r from-pink-500 to-rose-500 h-screen grid place-items-center'>
            <div className="max-w-md w-full space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <div className="flex flex-col space-y-1">
                    <h3 className="text-3xl font-bold tracking-tight">Sign Up</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Please fill in the form to create an account.</p>
                </div>
                <div>
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 text-sm">
                                <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="first_name">
                                    First Name
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                    id="first_name"
                                    placeholder="Enter first name"
                                    name="first_name"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-2 text-sm">
                                <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="last_name">
                                    Last Name
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                    id="last_name"
                                    placeholder="Enter last name"
                                    name="last_name"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                id="email"
                                placeholder="Enter your email"
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="password_">
                                Password
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                id="password_"
                                placeholder="password"
                                name="password"
                                type="password"
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                           {/* user roles */} 
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="user_role">
                                User Role
                            </label>
                            <select
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                name="user_role"
                            >
                                <option value="subscriber">Subscriber (Read posts and comments ) </option>
                                <option value="author">Author (Create and edit own posts)</option>
                                <option value="contributor">Contributor (Create and edit own posts )</option>
                                <option value="editor">Editor (Create, edit, and publish own posts)</option>
                            </select>
                        </div>
                        <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="text-center text-sm mt-2 text-zinc-700 dark:text-zinc-300">
                    Do You have an account?
                    <Link to="/signin" className="font-semibold underline">   SignIn </Link>
                </p>
                </div>
            </div>
        </div>
    )
}
