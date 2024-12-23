import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../auth'
import { useAppStore } from '@/store'
const Profile = () => {
  const {userInfo} = useAppStore();
  return (
    <>
      Profile
      <div>Email:{userInfo.email}</div>
      <div>Email:{userInfo.id}</div>
    </>
  )
}

export default Profile
