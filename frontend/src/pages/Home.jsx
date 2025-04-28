import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-bottom bg-[url(https://res.cloudinary.com/jerrick/image/upload/v1680864170/642ff3aad68222001dc53666.jpg)] h-screen pt-8 flex justify-between flex-col w-full bg-red-300'>
        <img  className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get started with Uber</h2>
                <Link  to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 px-3 mt-4'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home