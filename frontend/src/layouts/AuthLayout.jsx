import React from 'react'
import { Outlet } from 'react-router-dom'
import Quote from '../components/Quote'

const AuthLayout = () => {
  return (
    <div className="h-screen flex">
    <Outlet />
    <Quote />
  </div>
  )
}

export default AuthLayout