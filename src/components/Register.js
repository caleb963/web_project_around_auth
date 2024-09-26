import React, {useState} from 'react';

function Register({ onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;