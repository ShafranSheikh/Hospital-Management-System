import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../styles/userauthentication.css'
const login = () => {
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');
    return (
    <div className="login-container" >
            <form className="login-form" >
                <h2>Login</h2>
                    <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input type="email" name="email" placeholder="sample@mail.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"value={password} onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>    
                <div className="form-links">
                    <p>
                        Don't have an account? <Link to="/signin">Create an account</Link>
                    </p>
                    <p>Or</p>
                    <a href="/google-signin" className="google-signin">
                        Sign in with Google
                    </a>
                </div>
            </form>
        </div>
  )
}

export default login