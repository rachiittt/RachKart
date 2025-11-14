# RachKart — E-commerce Fullstack Application

RachKart is a modern e-commerce starter built with React, Vite, Tailwind CSS on the frontend and Express + Prisma on the backend. This repository is prepared for local development and ready to be pushed to a new GitHub repository.

## Project Structure

```
RachKart/
├── frontend/          # React + Vite + Tailwind CSS (UI)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/           # Express + Prisma (API)
    ├── src/
    ├── prisma/
    ├── package.json
    └── .env.example
```

## Getting Started (local)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend defaults to `http://localhost:3001` in local development (adjust `VITE_API_BASE_URL` in `frontend/.env` if needed).

### Backend
```bash
cd backend
npm install
npm run dev
```

The backend defaults to `http://localhost:5001` (update `.env` as needed).

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Express.js, Prisma ORM
- **Database**: SQLite (or PostgreSQL) via Prisma

## Useful Scripts

- Frontend: `npm run dev` (start dev server), `npm run build`, `npm run preview`
- Backend: `npm run dev` (nodemon), `npm start`, `npm run prisma:generate`, `npm run prisma:migrate`

## Configuration

Copy `backend/.env.example` to `backend/.env` and update values. Example values:

```
DATABASE_URL="file:./dev.db"
PORT=5001
NODE_ENV=development
JWT_SECRET=supersecret
```

For the frontend, set the API base URL in `frontend/src/config/env.js` or `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:5001
```

## Preparing to push to a new GitHub repo

1. Remove any existing origin and add your new repository URL:

```bash
git remote remove origin
git remote add origin git@github.com:YOUR_USERNAME/YOUR_NEW_REPO.git
```

2. Commit any changes and push:

```bash
git add .
git commit -m "Rebrand project to RachKart — prepare for public repo"
git push -u origin main
```

3. If you prefer HTTPS replace the `git@github.com:...` URL with the HTTPS URL.

## Next steps (suggested)

- Wire the frontend product mock data to a Prisma-backed products table
- Add cart persistence and a checkout flow (Stripe/PayPal)
- Create product detail and category pages

---

Happy building — if you want, I can also create a `LICENSE`, tweak `package.json` metadata, or set up a GitHub Actions workflow.
