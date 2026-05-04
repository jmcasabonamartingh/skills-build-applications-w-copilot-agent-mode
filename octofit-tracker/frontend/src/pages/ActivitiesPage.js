import React, { useEffect, useState } from 'react';

import { apiGet, apiPost } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

const defaultForm = {
  activity_type: 'running',
  duration_minutes: 30,
  distance_km: 5,
  calories_burned: 250,
  performed_at: new Date().toISOString().slice(0, 16),
  notes: '',
};

export default function ActivitiesPage() {
  const [form, setForm] = useState(defaultForm);
  const [activities, setActivities] = useState([]);
  const { t } = useLanguage();

  const load = () => {
    apiGet('/activities/').then((data) => setActivities(Array.isArray(data) ? data : []));
  };

  useEffect(load, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiPost('/activities/', form);
    setForm(defaultForm);
    load();
  };

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">{t.activities.logTitle}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">{t.activities.type}</label>
                <select className="form-select" value={form.activity_type} onChange={(e) => setForm({ ...form, activity_type: e.target.value })}>
                  <option value="running">{t.activities.types.running}</option>
                  <option value="walking">{t.activities.types.walking}</option>
                  <option value="strength">{t.activities.types.strength}</option>
                  <option value="cycling">{t.activities.types.cycling}</option>
                  <option value="other">{t.activities.types.other}</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">{t.activities.minutes}</label>
                <input className="form-control" type="number" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })} />
              </div>
              <div className="mb-2">
                <label className="form-label">{t.activities.distance}</label>
                <input className="form-control" type="number" step="0.1" value={form.distance_km} onChange={(e) => setForm({ ...form, distance_km: Number(e.target.value) })} />
              </div>
              <div className="mb-2">
                <label className="form-label">{t.activities.calories}</label>
                <input className="form-control" type="number" value={form.calories_burned} onChange={(e) => setForm({ ...form, calories_burned: Number(e.target.value) })} />
              </div>
              <div className="mb-2">
                <label className="form-label">{t.activities.date}</label>
                <input className="form-control" type="datetime-local" value={form.performed_at} onChange={(e) => setForm({ ...form, performed_at: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">{t.activities.notes}</label>
                <textarea className="form-control" rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <button className="btn btn-primary" type="submit">{t.activities.logBtn}</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">{t.activities.listTitle}</h2>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>{t.activities.type}</th>
                    <th>{t.activities.minutes}</th>
                    <th>{t.activities.calories}</th>
                    <th>{t.activities.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.object_id}>
                      <td>{t.activities.types[activity.activity_type] || activity.activity_type}</td>
                      <td>{activity.duration_minutes}</td>
                      <td>{activity.calories_burned}</td>
                      <td>{new Date(activity.performed_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
