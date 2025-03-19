import React from 'react'
import './footer.css';
import facebook from '../../assets/facebook.png';
import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';
const Footer = () => {
  return (
    <footer>
        <h2>Copyright &copy; 2024 Shafran. All rights</h2>
        <div className="footer-social-links" >
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" loading='lazy'/>
            </a>
            <a href="https://github.com/ShafranSheikh" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="" loading='lazy'/>
            </a>
            <a href="https://www.linkedin.com/in/mohamed-shafran-26847a257/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="" loading='lazy'/>
            </a>
        </div>
    </footer>
  )
}

export default Footer