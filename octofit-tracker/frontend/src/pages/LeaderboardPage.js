import React, { useEffect, useState } from 'react';

import { apiGet } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    apiGet('/leaderboard/').then((data) => setLeaders(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h1 className="h4">{t.leaderboard.title}</h1>
        <p className="text-muted">{t.leaderboard.subtitle}</p>
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>{t.leaderboard.rank}</th>
                <th>{t.leaderboard.user}</th>
                <th>{t.leaderboard.minutes}</th>
                <th>{t.leaderboard.calories}</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((row, index) => (
                <tr key={row.user__username}>
                  <td>{index + 1}</td>
                  <td>{row.user__username}</td>
                  <td>{row.total_minutes || 0}</td>
                  <td>{row.total_calories || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
