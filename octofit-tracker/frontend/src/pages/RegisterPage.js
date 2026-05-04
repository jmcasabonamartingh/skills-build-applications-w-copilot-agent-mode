import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { apiPost } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const data = await apiPost('/register/', { username, email, password });
      if (data.username) {
        setMessage(t.register.success);
        setTimeout(() => navigate('/login'), 800);
        return;
      }
      setError(t.register.error);
    } catch (err) {
      setError(err.message || t.register.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card shadow-sm">
        <div className="card-body p-4">
          <h1 className="h4 mb-3">{t.register.title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t.register.username}</label>
              <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t.register.email}</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">{t.register.password}</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {message ? <div className="alert alert-success py-2">{message}</div> : null}
            {error ? <div className="alert alert-danger py-2">{error}</div> : null}
            <button className="btn btn-primary w-100" type="submit">{t.register.button}</button>
          </form>
          <p className="mt-3 mb-0 text-center">
            {t.register.haveAccount} <Link to="/login">{t.register.goLogin}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
