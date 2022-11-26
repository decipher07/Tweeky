import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="login" />}/>
      <Route path='login' element={<Login />}/>
    </Routes>
  )
}

export default App
