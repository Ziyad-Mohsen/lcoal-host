# Local Cloud

A full-stack local cloud application with Express backend and React frontend.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Development

Run both frontend and backend in parallel:

```bash
npm run dev
```

Or run separately:

```bash
npm run dev:frontend  # Frontend only (Vite on http://localhost:5173)
npm run dev:backend   # Backend only (Express on http://localhost:3000)
```

### Building

Build both:

```bash
npm run build
```

Or individually:

```bash
npm run build:frontend
npm run build:backend
```

### Production

Start the backend server:

```bash
cd backend && npm start
```

The backend runs on http://localhost:3000 and provides API endpoints.
The frontend must be deployed separately or run with `npm run dev:frontend`

## Project Structure

```
├── backend/          # Express API server
│   ├── src/
│   │   └── index.ts
│   ├── dist/        # Compiled output
│   ├── package.json
│   └── tsconfig.json
├── frontend/        # React + Vite client
│   ├── src/
│   ├── dist/       # Built output
│   ├── package.json
│   └── vite.config.ts
└── package.json     # Root workspace scripts
```

## Architecture

- **Backend**: Runs independently on port 3000, provides JSON API endpoints
- **Frontend**: Runs independently on port 5173, consumes backend API
- No static file serving - each runs on its own port

## Available Scripts

- `npm run dev` - Start both frontend and backend in parallel
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build both frontend and backend
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only
- `npm run start` - Build backend and start server
- `npm run lint` - Lint both projects
- `npm run lint:frontend` - Lint frontend only
- `npm run lint:backend` - Lint backend only

## Notes

- Frontend builds to `frontend/dist/`
- Backend compiles to `backend/dist/`
- Frontend and backend run independently
- Configure API endpoints in frontend to point to `http://localhost:3000` (or production URL)
