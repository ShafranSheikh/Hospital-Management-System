import React from 'react'
import '../styles/hero.css'
import hero from '../assets/hero.jpg'
import { useNavigate } from 'react-router-dom'
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
        <h1>Welcome To MediCore</h1>
        <img src={hero} alt="" loading='lazy' />
        <div className="hero-button-container">
            <button onClick={()=>navigate('/signin')}>Signup</button>
            <button onClick={()=>navigate('/login')}>Login</button>
        </div>

    </div>
  )
}

export default Hero