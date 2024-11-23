import React from 'react'
import './navbar.css';
import { Link } from "react-router-dom";
import phone from '../../assets/telephone.png'
import mail from '../../assets/mail.png';
import logo from '../../assets/hospital-logo.png'
import facebook from '../../assets/facebook.png';
import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';
const Navbar = () => {
  return (
    <div className="navbar-container-main">
        <div className="navbar-container-contents">
            <div className="navbar-contacts">
                <h2><img src={phone} alt="" /> +9470 1095371</h2>
                <h2><img src={mail} alt="" /> shafransheikh@gmail.com</h2>
            </div>
            <img src={logo} alt="logo" />
            <div className="navbar-social-licks">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" />
                </a>
                <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                    <img src={github} alt="" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="" />
                </a>
            </div>
        </div>
        <div className="navbar-container-links">
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About us</Link>
                </li>
                <li>
                    <Link to='/Services'>Services</Link>
                </li>
                <li>
                    <Link to='/Contact'>Contact</Link>
                </li>
                <li>
                    <Link to='/dashboard'>Dashboard</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar