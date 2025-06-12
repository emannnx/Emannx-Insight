import React from 'react'
import "../Components/Home.css"
import {Link} from 'react-router-dom'
import logo from '../assets/Favicon.png'



const Home = () => {
  return (
    <div className='HomeContainer'>
       <div className="HomeWrapper">
        <img src={logo} alt="" />
        <p className='HomeHeader'>Welcome to Emannx</p>
        <Link to='/Login'>
                <button className='PickButton'>Log-in</button>
        </Link>
        <Link to='/Signin' >
                <button className='PickButton'>Sign-in</button>
        </Link>
       </div>
      
    </div>
  )
}

export default Home
