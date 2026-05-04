import React, { useEffect, useState } from 'react';

import { apiGet } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

export default function DashboardPage() {
  const [leaders, setLeaders] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    apiGet('/leaderboard/').then((data) => {
      if (Array.isArray(data)) {
        setLeaders(data.slice(0, 5));
      }
    });
  }, []);

  return (
    <div>
      <section className="hero card border-0 shadow-sm mb-4">
        <div className="card-body p-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-6 fw-bold">{t.dashboard.hero}</h1>
              <p className="lead mb-0">{t.dashboard.heroSub}</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <img src="/octofitapp-small.png" alt="OctoFit logo" className="img-fluid dashboard-logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="card border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">{t.dashboard.topStudents}</h2>
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>{t.dashboard.user}</th>
                  <th>{t.dashboard.totalMinutes}</th>
                  <th>{t.dashboard.totalCalories}</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((row) => (
                  <tr key={row.user__username}>
                    <td>{row.user__username}</td>
                    <td>{row.total_minutes || 0}</td>
                    <td>{row.total_calories || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
