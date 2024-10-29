import React from 'react';
import '@web/components/css/Navbar.css';

function Navbar({ isLoggedIn, onLogOff, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-title">Fakestagram</div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <button className="btn" onClick={onLogOff}>
            Log Off
          </button>
        ) : (
          <>
            <button className="btn" onClick={() => onNavigate('signup')}>
              Sign Up
            </button>
            <button className="btn" onClick={() => onNavigate('login')}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
