import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import ActivitiesPage from './pages/ActivitiesPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeamsPage from './pages/TeamsPage';
import WorkoutsPage from './pages/WorkoutsPage';

function AuthenticatedLayout() {
  return (
    <>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

function AuthGuard({ children }) {
  const token = localStorage.getItem('octofit_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/*"
        element={(
          <AuthGuard>
            <AuthenticatedLayout />
          </AuthGuard>
        )}
      />
    </Routes>
  );
}
