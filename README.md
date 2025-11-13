# Finnews - Fullstack Application

A modern fullstack application built with React, Express, Prisma, and Tailwind CSS used to show and update abot the latest financial news and articles.

## Project Structure

```
finnews/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/           # Express + Prisma + Nodemon
    ├── src/
    ├── prisma/
    ├── package.json
    └── .env.example
```

## Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

The backend will be available at `http://localhost:5000`

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Express.js, Prisma ORM
- **Development**: Nodemon for auto-reload
- **Styling**: Tailwind CSS with PostCSS

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with Nodemon
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations

## Configuration

### Backend Environment Variables
Copy `.env.example` to `.env` and update with your configuration:
```
DATABASE_URL="postgresql://user:password@localhost:5432/finnews"
PORT=5000
NODE_ENV=development
```

## Notes

- Frontend API requests are proxied to backend at `/api`
- Both servers run on separate ports (Frontend: 3000, Backend: 5000)
- Database requires PostgreSQL setup
# FinNews
