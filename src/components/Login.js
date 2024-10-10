import React, {useState} from 'react';
import '../blocks/login.css';
import {useNavigate} from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
     e.preventDefault();
     onLogin(email, password);
    };

    const navigate = useNavigate();

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2 className="login__title">Login</h2>
            <input
              className="login__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input 
            className="login__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="login__button" type="submit">Login</button>
            <a className="login__link" onClick={() => {
                navigate('/signup');
            }}><p className="login__link-message">you're a member already? Register here</p></a>
        </form>
    );
}

export default Login;