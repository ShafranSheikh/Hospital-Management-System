import React,{useState} from 'react'
import '../styles/userauthentication.css';
import { Link } from 'react-router-dom';
const Signin = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="signup-container">
            <form className="signup-form" >
                <h2>Create an Account</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="sample@mail.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Preferred Username</label>
                    <input type="text" name="username" placeholder="Enter your username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                    <button type="submit">Sign Up</button>
                <div className="form-links">
                    <p>Already have an account? <Link to="/Login">Login here</Link></p>
                </div>
            </form>
    </div>
  )
}

export default Signin