# Fullstack Quiz App

A simple full-stack quiz application with a Node/Express backend and a separate frontend client. This README gives step‑by‑step instructions to set up and run the project locally, explains the repository structure, and provides example environment variables and common API routes.

If you want me to commit this file to the repository or open a PR with it, tell me and I can prepare the change.

## Table of Contents
•⁠  ⁠[About](#about)
•⁠  ⁠[Features](#features)
•⁠  ⁠[Tech stack](#tech-stack)
•⁠  ⁠[Repository structure](#repository-structure)
•⁠  ⁠[Prerequisites](#prerequisites)
•⁠  ⁠[Quick start](#quick-start)
  - [Backend](#backend)
  - [Frontend](#frontend)
•⁠  ⁠[Environment variables](#environment-variables)
•⁠  ⁠[Common API endpoints (expected)](#common-api-endpoints-expected)
•⁠  ⁠[Development tips](#development-tips)
•⁠  ⁠[Contributing](#contributing)
•⁠  ⁠[License](#license)
•⁠  ⁠[Contact](#contact)

## About
This project contains two main folders:
•⁠  ⁠⁠ backend/ ⁠ — Node.js + Express API, routes, controllers, models and server entry (server.js).
•⁠  ⁠⁠ frontend/ ⁠ — client application (likely React or similar).

The app supports creating quizzes, serving quiz data to the frontend, submitting answers, and storing results. Authentication is commonly implemented using JWT, but verify implementation in backend code.

## Features
•⁠  ⁠Create, read, update and delete quizzes (CRUD)
•⁠  ⁠User registration and login
•⁠  ⁠Take quizzes and save results
•⁠  ⁠RESTful API for frontend consumption

## Tech stack
•⁠  ⁠Backend: Node.js, Express
•⁠  ⁠Frontend: JavaScript (likely React)
•⁠  ⁠Database: (commonly MongoDB or another DB) — check backend models/config to confirm

## Repository structure
High-level overview:
•⁠  ⁠backend/
  - server.js
  - package.json
  - package-lock.json
  - config/        (configuration helpers)
  - controllers/   (request handlers)
  - middleware/    (auth, error handlers)
  - models/        (DB models / schemas)
  - routes/        (API route definitions)
•⁠  ⁠frontend/
  - (frontend app files like package.json, src/, public/)

Note: Inspect the actual ⁠ frontend/package.json ⁠ and ⁠ backend/package.json ⁠ for script names and dependencies.

## Prerequisites
•⁠  ⁠Node.js (v14+ recommended)
•⁠  ⁠npm or yarn
•⁠  ⁠A running database (e.g., MongoDB) if the backend persists data
•⁠  ⁠Git (to clone repository)

## Quick start

Clone the repository:
•⁠  ⁠git clone https://github.com/ArpaanDey/fullstack-quiz-app.git
•⁠  ⁠cd fullstack-quiz-app

Backend
1.⁠ ⁠Change to the backend folder:
   - cd backend
2.⁠ ⁠Install dependencies:
   - npm install
3.⁠ ⁠Create an ⁠ .env ⁠ file (see template below).
4.⁠ ⁠Start the backend:
   - npm start
   - or node server.js
   - or npm run dev (if a dev script with nodemon exists)
5.⁠ ⁠Server default port: check ⁠ backend/server.js ⁠ or config (commonly 5000).

Frontend
1.⁠ ⁠Open a new terminal and change into the frontend directory:
   - cd frontend
2.⁠ ⁠Install dependencies:
   - npm install
3.⁠ ⁠Create a frontend ⁠ .env ⁠ if needed (see template below).
4.⁠ ⁠Start dev server:
   - npm start
   - or npm run dev (if applicable)
5.⁠ ⁠By default React apps run on port 3000 — configure the API base URL in the frontend ⁠ .env ⁠ to point to the backend (for local dev, e.g. http://localhost:5000).

## Environment variables

Example backend ⁠ .env ⁠ (create in ⁠ backend/ ⁠):
PORT=5000
MONGO_URI=mongodb://localhost:27017/quiz-app
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development

Example frontend ⁠ .env ⁠ (create in ⁠ frontend/ ⁠ if required):
REACT_APP_API_URL=http://localhost:5000/api

Adjust variable names to match what the code expects — check ⁠ backend/config ⁠ and code where process.env.* are used.

## Common API endpoints (expected)
Look in ⁠ backend/routes/ ⁠ for exact endpoints. Typical endpoints for a quiz app include:
•⁠  ⁠POST /api/auth/register — Register new user
•⁠  ⁠POST /api/auth/login — Authenticate and receive token
•⁠  ⁠GET /api/quizzes — Get list of quizzes
•⁠  ⁠GET /api/quizzes/:id — Get details for single quiz
•⁠  ⁠POST /api/quizzes — Create a new quiz (protected)
•⁠  ⁠PUT /api/quizzes/:id — Update quiz (protected)
•⁠  ⁠DELETE /api/quizzes/:id — Delete quiz (protected)
•⁠  ⁠POST /api/quizzes/:id/submit — Submit quiz answers and save results
•⁠  ⁠GET /api/results — Get user quiz results (protected)

Verify request/response shapes by inspecting controllers and route handlers in the backend.

## Development tips
•⁠  ⁠Add a ⁠ dev ⁠ script in backend/package.json for nodemon:
  - "dev": "nodemon server.js"
•⁠  ⁠Use ⁠ concurrently ⁠ or run frontend/backend in separate terminals during development.
•⁠  ⁠Seed data: create a small seed script to populate sample quizzes and users for local testing.
•⁠  ⁠Protect secrets: never commit ⁠ .env ⁠ to the repo; add it to ⁠ .gitignore ⁠.

## Contributing
•⁠  ⁠Fork the repository
•⁠  ⁠Create feature branch: git checkout -b feat/your-feature
•⁠  ⁠Commit changes and open a pull request with a clear description and testing steps
•⁠  ⁠Ensure code style matches project conventions

## License
No license file detected. If you plan to open source this project, add a LICENSE (for example MIT) at the repository root.

## Contact
Open an issue on the repository for bugs, feature requests, or questions. Include reproduction steps and any relevant logs.