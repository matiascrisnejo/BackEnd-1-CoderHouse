import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Products from './components/Products.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  </BrowserRouter>
  )
}
