import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='h-[92vh]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout