import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('idUser');
        navigate('/');
    }
    return (
        <nav className="fixed top-6 left-6 right-6 bg-[#000000af] text-white p-4 rounded-xl shadow-black shadow-2xl">
            <ul className="flex justify-center gap-6 lg:gap-56">
                <li className="hover:underline-offset-4 hover:underline cursor-pointer" onClick={() => navigate('/home')}>Home</li>
                <li className="hover:underline-offset-4 hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</li>
                <li className="hover:underline-offset-4 hover:underline cursor-pointer" onClick={() => navigate('/')}>Login</li>
                <li className="hover:underline-offset-4 hover:underline cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul>
        </nav>
    )
}

export default Navbar;