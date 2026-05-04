# OctoFit Tracker

OctoFit Tracker prototype based on the workshop story and instructions.

## Features implemented

- User registration and login endpoints
- User profile model
- Activity logging and tracking
- Team creation and team membership models
- Leaderboard endpoint by total minutes/calories
- Personalized workout suggestions
- React frontend with pages for auth, dashboard, activities, teams, leaderboard and workouts

## Project structure

```text
octofit-tracker/
├── backend/
│   ├── venv/
│   ├── requirements.txt
│   └── octofit_tracker/
└── frontend/
```

## Backend setup

```powershell
python3 -m venv octofit-tracker/backend/venv
octofit-tracker/backend/venv/Scripts/python.exe -m pip install -r octofit-tracker/backend/requirements.txt
octofit-tracker/backend/venv/Scripts/python.exe octofit-tracker/backend/octofit_tracker/manage.py makemigrations
octofit-tracker/backend/venv/Scripts/python.exe octofit-tracker/backend/octofit_tracker/manage.py migrate
octofit-tracker/backend/venv/Scripts/python.exe octofit-tracker/backend/octofit_tracker/manage.py runserver 0.0.0.0:8000
```

## Frontend setup

```powershell
npm install --prefix octofit-tracker/frontend
npm start --prefix octofit-tracker/frontend
```

## API quick tests with curl

```bash
curl http://localhost:8000/api/
curl http://localhost:8000/api/leaderboard/
curl -X POST http://localhost:8000/api/register/ -H "Content-Type: application/json" -d '{"username":"student1","email":"student1@example.com","password":"Password123"}'
curl -X POST http://localhost:8000/api/auth/login/ -H "Content-Type: application/json" -d '{"username":"student1","password":"Password123"}'
```

## Environment variables

- `MONGO_URI` (default: `mongodb://localhost:27017`)
- `MONGO_DB_NAME` (default: `octofit_tracker`)
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `REACT_APP_API_BASE_URL` (frontend)

## Required ports

- `8000` backend (public)
- `3000` frontend (public)
- `27017` MongoDB (private)
