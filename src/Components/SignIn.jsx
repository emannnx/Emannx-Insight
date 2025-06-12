import React from 'react'
import "../Components/Sigin.css"
import { Link } from 'react-router-dom'
import logo from '../assets/Favicon.png'


const SignIn = () => {
  return (
    <div className='SigninCont' >
      <div className="HomeWrapper">
        <img src={logo} alt="" />
        <p className='SigninHeader'>Sign-in</p>
        <input type="text" placeholder='Username' className='SigninPlaceHolder' />
        <input type="text" placeholder='Email' className='SigninPlaceHolder' />
        <input type="text" placeholder='Password' className='SigninPlaceHolder' />
        <input type="text" placeholder='Confirm Password' className='SigninPlaceHolder' />
          <Link to='/Login' className="NoDecoration" >
              <p className='AlreadySIgn'>Already Have an Account</p>
        </Link>
          <Link to='/ChatPage'>
                <button className='PickButtonSign'>Continue to Sigin</button>
        </Link>
      </div>
    </div>
  )
}

export default SignIn
