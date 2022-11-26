import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Followers from './pages/Followers'
import PostStatus from './pages/PostStatus'
import Feeds from './pages/Feeds'
import OwnFeeds from './pages/OwnFeeds'

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="login" />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='follower' element={<Followers/>} />
      <Route path='poststatus' element={<PostStatus/>} />
      <Route path='feeds' element={<Feeds/>} />
      <Route path='myposts' element={<OwnFeeds/>} />

    </Routes>
  )
}

export default App
