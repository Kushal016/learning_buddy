import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomeNavBar = () => {
    const navigate = useNavigate();
  return (
    <div className='flex space-x-4 items-center'>
        <div className='font-bold cursor-pointer py-2 px-3 hover:text-yellow-400'>
            Home
        </div>
        <div className='bg-green-600 text-white py-3 px-3 rounded font-bold cursor-pointer hover:bg-green-400'
        onClick={() => navigate('/login')}>
            Login
        </div>
        <div className='bg-yellow-600 text-white py-3 px-3 rounded font-bold cursor-pointer hover:bg-yellow-400'>Register</div>
    </div>
  )
}

export default HomeNavBar