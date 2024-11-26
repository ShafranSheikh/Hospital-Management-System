import React, {useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import '../styles/userauthentication.css';
import { loginSuccess } from '../redux/features/authSlice.js';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",{
                email,
                password,
            });
            if(response.status === 200){
                dispatch(
                    loginSuccess({
                        token: response.data.token 
                    })
                );
                navigate('/dashboard');
            }else{
                setError("Username or password incorrect, please try again");
            }
        }catch(error){
            setError("An error occurred. Please try again later.");
            console.error(error);
        }
    }
    return (
    <div className="login-container" >
            <form className="login-form"  onSubmit={handleFormSubmit}>
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
                {error && <p className="error">{error}</p>}
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

export default Login