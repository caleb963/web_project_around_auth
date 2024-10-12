import React from 'react';
import { Link } from 'react-router-dom';
import headerTitle from '../images/header__title.png';

function Header({ isAuthenticated, onLogout }) {
    return (
        <header className="header">
             <img src={headerTitle} alt="header-title" className="header__title" />
             {isAuthenticated ? (
                <button onClick={onLogout} className="header__button">Logout</button> ) : (
      <nav className="header__nav">
        <Link to="/signin" className="header__link">Login</Link>
        <Link to="/signup" className="header__link">Register</Link>
      </nav>               
       )}
        </header>
    );
}

export default Header;