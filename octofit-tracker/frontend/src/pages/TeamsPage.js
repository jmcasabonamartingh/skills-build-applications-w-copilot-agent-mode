import React, { useEffect, useState } from 'react';

import { apiGet, apiPost } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { t } = useLanguage();

  const getTeamKey = (team) => {
    if (team.object_id && team.object_id !== 'None') {
      return team.object_id;
    }
    return team.name;
  };

  const load = () => {
    apiGet('/teams/').then((data) => setTeams(Array.isArray(data) ? data : []));
  };

  useEffect(load, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiPost('/teams/', { name, description });
    setName('');
    setDescription('');
    load();
  };

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">{t.teams.createTitle}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">{t.teams.nameLabel}</label>
                <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">{t.teams.descLabel}</label>
                <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <button className="btn btn-primary" type="submit">{t.teams.createBtn}</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">{t.teams.listTitle}</h2>
            <div className="row g-3">
              {teams.map((team) => (
                <div className="col-md-6" key={getTeamKey(team)}>
                  <div className="p-3 border rounded h-100">
                    <h3 className="h6 mb-1">{team.name}</h3>
                    <p className="text-muted mb-1">{team.description || t.teams.noDesc}</p>
                    <small>{t.teams.members}: {team.members_count || 0}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
