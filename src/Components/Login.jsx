import React from 'react'
import '../Components/Login.css'
import {Link} from 'react-router-dom'
import logo from '../assets/Favicon.png'



const Login = () => {
  return (
    <div className="SigninCont">
      <div className="HomeWrapper">
         <img src={logo} alt="" />
        <p className='SigninHeader'>Log-in</p>
        <input type="text" placeholder='Username' className='SigninPlaceHolder' />
        <input type="text" placeholder='Password' className='SigninPlaceHolder' />
          <Link to='/Signin' className="NoDecoration" >
              <p className='AlreadySIgn'>I dont have an account</p>
        </Link>
          <Link to='/ChatPage'>
                <button className='PickButtonSign'>Continue to Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Login
