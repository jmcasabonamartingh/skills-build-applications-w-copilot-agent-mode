import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../api';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark octo-nav px-3">
      <Link className="navbar-brand fw-bold" to="/">
        OctoFit Tracker
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/">{t.nav.dashboard}</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/activities">{t.nav.activities}</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/teams">{t.nav.teams}</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/leaderboard">{t.nav.leaderboard}</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/workouts">{t.nav.workouts}</Link></li>
        </ul>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={toggleTheme}
            title={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn btn-sm btn-outline-light" onClick={toggleLang}>
            {t.nav.language}
          </button>
          <button className="btn btn-sm btn-light" onClick={handleLogout}>{t.nav.logout}</button>
        </div>
      </div>
    </nav>
  );
}
