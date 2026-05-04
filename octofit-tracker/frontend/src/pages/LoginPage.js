import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      if (data.key) {
        navigate('/');
        return;
      }
      setError(t.login.errorCredentials);
    } catch (err) {
      setError(err.message || t.login.errorCredentials);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card shadow-sm">
        <div className="card-body p-4">
          <h1 className="h4 mb-3">{t.login.title}</h1>
          <p className="text-muted">{t.login.subtitle}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t.login.username}</label>
              <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t.login.password}</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error ? <div className="alert alert-danger py-2">{error}</div> : null}
            <button className="btn btn-primary w-100" type="submit">{t.login.button}</button>
          </form>
          <p className="mt-3 mb-0 text-center">
            {t.login.noAccount} <Link to="/register">{t.login.createAccount}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
