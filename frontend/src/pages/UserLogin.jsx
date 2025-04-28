import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-16 ml-1 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
            <form>
                <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                <input required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                    type="email" placeholder='Your email.. '></input>
                <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                <input required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                    type="password" placeholder='your password..'></input>
                <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base '>Login</button>
                <p className='text-centre'> New here?<Link className='mb-3 text-blue-600' to='/register'>Create new Account</Link></p>
            </form>
            </div>
            <div>
                <button className='text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base bg-green-500 '>Sign in as captain</button>
            </div>
        </div>
    )
}

export default UserLogin