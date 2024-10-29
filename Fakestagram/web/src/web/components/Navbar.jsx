import React from 'react';
import './Navbar.css';

function Navbar({ onNavigate }) {
    return (
        <nav className="navbar">
            <h2>fakestagram</h2>
            <div className="navbar-buttons">
                <button className="btn" onClick={() => onNavigate('auth')}>Sign Up</button>
                <button className="btn" onClick={() => onNavigate('auth')}>Login</button>
            </div>
        </nav>
    );
}

export default Navbar;
