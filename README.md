# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey jmcasabonamartingh!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/jmcasabonamartingh/skills-build-applications-w-copilot-agent-mode/issues/1)

---

## OctoFit Tracker — Cómo levantar el proyecto

### Requisitos previos

- Python 3.x con el entorno virtual creado en `octofit-tracker/backend/venv`
- Node.js instalado
- MongoDB corriendo en `localhost:27017`  
  Para iniciar el servicio de MongoDB (como administrador): `Start-Service MongoDB`

---

### Backend (Django — puerto 8000)

Desde la raíz del repositorio:

```powershell
octofit-tracker/backend/venv/Scripts/python.exe octofit-tracker/backend/octofit_tracker/manage.py runserver 0.0.0.0:8000
```

El API estará disponible en: `http://localhost:8000/api/`

---

### Frontend (React — puerto 3000)

Desde la raíz del repositorio:

```powershell
npm.cmd --prefix octofit-tracker/frontend start
```

La aplicación estará disponible en: `http://localhost:3000`

> **Nota:** En Windows con política de ejecución restringida, usa `npm.cmd` en lugar de `npm`.

---

### Usuario de prueba

| Campo    | Valor          |
|----------|----------------|
| Usuario  | `demo_student` |
| Password | `Password123!` |

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

