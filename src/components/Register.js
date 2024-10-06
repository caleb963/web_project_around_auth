import React, {useState} from 'react';
import '../blocks/register.css';

function Register({ onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    };

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h2 className='register__title'>Register</h2>
            <input
            className="register__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
            className="register__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="register__button" type="submit">Register</button>
        </form>
    );
}

export default Register;