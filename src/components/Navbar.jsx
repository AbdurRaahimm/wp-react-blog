import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../libs/cookie';
import wpLogo from '/wpLogo.jpeg';

export default function Navbar() {
    const navigate = useNavigate();
    const token = getCookie('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        navigate('/')
    }
    return (
        <header className='flex justify-between items-center shadow-md px-4 py-2'>

            <Link to="/">
                <h1 className='capitalize  sm:text-xl font-bold flex justify-center items-center gap-2'>
                    <img src={wpLogo} alt="logo" className='w-10 h-10 inline-block' />
                    react blog
                </h1>
            </Link>

            <div className="flex justify-between items-center gap-3">
                <p className='font-bold capitalize '>{user ? user.name : 'Guest'}</p>
                {
                    user ? <button onClick={handleLogout} className='border border-pink-600 rounded-full px-3 py-[3px] font-semibold '> Logout </button> :
                        <Link to="/signin" className='border border-pink-600 rounded-full px-3 py-[3px] font-semibold'> Signin </Link>
                }
                {/* <button onClick={handleLogout} className='border border-pink-600 rounded-full px-3 py-[3px]'> Signin </button> */}
            </div>
        </header>
    )
}
