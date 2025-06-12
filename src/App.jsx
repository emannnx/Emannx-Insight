import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignIn from './Components/SignIn'
import Login from './Components/Login'
import Home from './Components/Home'
import ChatPage from './Components/ChatPage'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>

    <Route path='/' element={ <Home /> } />
    <Route path='/Signin' element = { <SignIn /> } />
    <Route path='/Login' element = { <Login /> } />
    <Route path='/ChatPage' element={ <ChatPage/> } /> 


   </Routes>
   </BrowserRouter>
  )
}

export default App
