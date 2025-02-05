import React from 'react'
import Custom_Navbar from './components/Custom_Navbar/Custom_Navbar'
import { Route, Routes } from 'react-router-dom'
import TextEditor from './components/TextEditor/TextEditor'
import Counter from './components/Counter/Counter'
import UserForm from './components/UserForm/UserForm'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import './App.css'
const App = () => {
  return (
    <div className='app'>
      <Custom_Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Counter/>}/>
        <Route path="/text-editor" element={<TextEditor/>}/>
        <Route path="/user-form" element={<UserForm/>}/>
      </Routes>
    </div>
  )
}

export default App
