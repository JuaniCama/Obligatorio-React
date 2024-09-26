import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '@web/components/Home.jsx';
import Profile from '@web/components/Profile.jsx';
import Notifications from '@web/components/Notifications.jsx';
import './App.css'; // Importar el archivo CSS

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <h2>fakestagram</h2>
          <ul>
            <li>
              <i class="fa-solid fa-house icono">  </i>
              <Link to="/">Home</Link>
            </li>
            <li>
              <i class="fa-solid fa-heart icono"> </i>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <i class="fa-solid fa-user icono"> </i>
              <Link to="/profile">Profile</Link>
            </li>

          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
