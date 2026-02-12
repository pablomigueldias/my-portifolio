# Full-Stack Professional Portfolio | Python & React Ecosystem

This repository contains the complete infrastructure for my professional portfolio and technical blog. The project was designed to demonstrate the integration of a **Serverless** ecosystem with a **RESTful architecture**, following modern software development best practices such as **Clean Architecture**, **SOLID principles**, and **CI/CD** pipelines.


## Architecture & Technical Decisions

The system is decoupled into two independent cores communicating via a structured API:

### **Backend (The Core)**
* **Engine:** **FastAPI** (Python 3.12+), selected for high performance and native asynchronous support with **Pydantic** for data validation.
* **Environment:** Strict dependency management using **Poetry**, ensuring build reproducibility and environment isolation.
* **Persistence:** **PostgreSQL** (via Neon Serverless) utilizing **SQLAlchemy** (ORM) and **Alembic** for robust database schema migrations.
* **Automation:** Integration with **python-slugify** for SEO-friendly URLs and **Cloudinary** for dynamic asset management.

### **Frontend (The Interface)**
* **Tech Stack:** **React 19** + **Vite**, focused on optimized rendering and ultra-fast build times.
* **UI/UX:** Advanced styling with **Tailwind CSS** and fluid animations via **Framer Motion**.
* **Communication:** **Axios** with centralized instances to dynamically manage base URLs across development and production environments.

---

## 🚀 Key Features

* **Dynamic API:** Automatic documentation via **Swagger UI** (OpenAPI) available at `/docs` in the production environment.
* **Technical Blog Engine:** Native **Markdown** and **Syntax Highlighting** support, allowing for technical articles to be served directly from the database.
* **Advanced Filtering:** Real-time project filtering system (Data Science, Backend, Fullstack) with state persistence.
* **Hybrid Environment:** Intelligent configuration that toggles between `localhost:8000` (development) and the production server (Render) via environment variables.

---

## 🛠️ Setup & Installation

### **Prerequisites**
* Python 3.12+
* Node.js 20+
* Poetry (Python package manager)

### **Backend Execution**
```bash
cd backend
poetry install
poetry run alembic upgrade head
poetry run uvicorn app.main:app --reload
```

### **Frontend Execution**
```bash
cd frontend
npm install
npm run dev
```
