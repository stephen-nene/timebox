import { useState } from 'react'
import './App.css'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    {/* <Login/> */}
    </>
  )
}

export default App
