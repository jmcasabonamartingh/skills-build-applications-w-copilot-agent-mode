import React, { useEffect, useState } from 'react';

import { apiGet, apiPost } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const { t } = useLanguage();
  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    target_minutes: 20,
  });

  const load = () => {
    apiGet('/workouts/').then((data) => setWorkouts(Array.isArray(data) ? data : []));
  };

  useEffect(load, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiPost('/workouts/', form);
    setForm({ title: '', description: '', difficulty: 'beginner', target_minutes: 20 });
    load();
  };

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">{t.workouts.addTitle}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">{t.workouts.titleLabel}</label>
                <input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">{t.workouts.descLabel}</label>
                <textarea className="form-control" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">{t.workouts.difficulty}</label>
                <select className="form-select" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                  <option value="beginner">{t.workouts.difficulties.beginner}</option>
                  <option value="intermediate">{t.workouts.difficulties.intermediate}</option>
                  <option value="advanced">{t.workouts.difficulties.advanced}</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">{t.workouts.targetMin}</label>
                <input className="form-control" type="number" value={form.target_minutes} onChange={(e) => setForm({ ...form, target_minutes: Number(e.target.value) })} />
              </div>
              <button className="btn btn-primary" type="submit">{t.workouts.saveBtn}</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">{t.workouts.listTitle}</h2>
            {workouts.map((workout) => (
              <article key={workout.object_id || workout.id} className="border rounded p-3 mb-2">
                <h3 className="h6 mb-1">{workout.title}</h3>
                <p className="mb-1 text-muted">{workout.description}</p>
                <small>{t.workouts.difficulties[workout.difficulty] || workout.difficulty} | {workout.target_minutes} min</small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
