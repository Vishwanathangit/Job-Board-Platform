
# 💼 Job Board Platform

The **Job Board Platform** is a full-stack web application that connects employers and job seekers. Employers can post job openings, manage applications, and approve listings. Job seekers can browse, search, and apply for jobs with personalized profiles and application tracking. Admins can oversee and manage the entire system.

Built using **Node.js, Express, Sequelize, PostgreSQL, Node Cron** for the backend, and **React.js, Tailwind CSS, Axios, React Router DOM** for the frontend. Also integrates **Zod** for validation and **JWT-based auth** with **role-based access control**.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## ✨ Features

- 👥 **Authentication & Authorization**
  - JWT-based login/register
  - Role-based access: `admin`, `employer`, `candidate`

- 📝 **Job Listings**
  - Create, edit, delete jobs
  - Search/filter jobs by title, type, salary, location
  - Approve jobs (admin-only)

- 📄 **Applications**
  - Apply with cover letter
  - Prevent duplicate applications
  - View jobs you applied to

- 🧑‍💼 **User Management**
  - Admin can manage all users
  - Employers can see applicants for their jobs

- 📈 **Activity Logging**
  - Logs key actions like creating jobs or applying

- 📦 **Database Seeding**
  - Import `dummyJobs.json` data on server startup (via cron)

---

## 🧰 Tech Stack

### Backend

- Node.js
- Node Cron
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT for authentication
- Zod for validation
- dotenv for env management

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Zustand (optional)
- React Hook Form (optional)

---

## 🗂 Project Structure

### 📁 Backend

```bash
backend/
├── config/
├── controllers/
├── data/
├── logs/
├── middleware/
├── migrations/
├── models/
├── routes/
├── services/
├── utils/
├── server.js
└── .env
```

### 📁 Frontend

```bash
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── .env
├── index.html
└── vite.config.js
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js v18+
- PostgreSQL installed and running
- A PostgreSQL DB named `jobboard`

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Job-Board-Platform.git
cd Job-Board-Platform
```

---

## 🔐 Environment Variables

### Backend `.env`

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
DATABASE_PASSWORD=your_postgres_password
DATABASE_URL=your_production_pg_url_if_any
NODE_ENV=development
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 📦 Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 🔄 Run Migrations

```bash
cd backend
npx sequelize-cli db:migrate
```

---

## ▶️ Start the App

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

> Backend: http://localhost:5000  
> Frontend: http://localhost:5173

---

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login`    | Log in user |
| GET    | `/api/v1/auth/me`       | Get current logged-in user info |

### 👤 User Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/v1/users`         | Get all users (admin only) |
| DELETE | `/api/v1/users/:id`     | Delete a user (admin only) |

### 📄 Job Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/v1/jobs`                | Get all jobs |
| GET    | `/api/v1/jobs/:id`            | Get single job |
| POST   | `/api/v1/jobs`                | Create a job (employer only) |
| PUT    | `/api/v1/jobs/:id`            | Update a job |
| DELETE | `/api/v1/jobs/:id`            | Delete a job |
| PUT    | `/api/v1/jobs/approve/:id`    | Approve a job (admin only) |
| GET    | `/api/v1/jobs/applications-count/:id` | Get application count |

### 📝 Application Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api/v1/applications`           | Apply for a job |
| GET    | `/api/v1/applications/user/:id`  | Get user’s job applications |
| GET    | `/api/v1/applications/job/:id`   | Get applicants for a job (employer only) |

---

## 🗃️ Database Models

- **User**
- **Job**
- **Application**
- **ActivityLog**

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit (`git commit -m "feat: add new feature"`)
4. Push (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Open an issue or connect via GitHub if you have any questions, ideas, or feedback.

---

> Built with ❤️ using Node.js,Node Cron, Express, Sequelize, PostgreSQL, React, and Tailwind CSS.
