import React from 'react'
import './footer.css';
import facebook from '../../assets/facebook.png';
import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';
const Footer = () => {
  return (
    <footer>
        <h2>Copyright &copy; 2024 Shafran. All rights</h2>
        <div className="footer-social-links">
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
    </footer>
  )
}

export default Footer