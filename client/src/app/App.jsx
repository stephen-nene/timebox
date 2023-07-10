import { useState } from 'react'
import './App.css'
import Login from '../components/auth/Login'
// import Signup from '../components/auth/Signup'
import Home from '../components/Home'

import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.user.loggedIn)
  const [count, setCount] = useState(0)

  return (
    <Routes>
      {isLoggedIn ?
        <Route path="/" element={<Home />} />
        :
        <Route path="/" element={<Login />} />
      }
    </Routes>
  )
}

export default App
