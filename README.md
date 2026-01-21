# Full-Stack Todo Web App

A simple full-stack todo web application with React, TypeScript and Express.
Add, complete, and delete todos with localStorage persistence.

## Table of Contents

1. [Live Site](#live-site)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Run Locally](#run-locally)
5. [Project Maintenance](#project-maintenance)
6. [License](#license)

## Live Site

Coming soon...

## Features

- Add todos
- Mark todos as complete/incomplete
- Delete todos
- Data persists in localStorage

## Tech Stack

- React
- TypeScript
- Vite
- CSS Modules
- Node.js
- Express
- Swagger for API documentation
- Docker & Docker Compose
- PostgreSQL

## Run Locally

### Prerequisites

- Node.js v20+ (LTS)
- Docker v4.55+ (Bundles Docker Engine v29 and Compose v2)

### Steps

```bash
  git clone

  cd client
  npm install
  npm run dev

  cd ../server
  # Create .env file
  cp .env.example .env
  # Fill the .env file with DATABASE_URL and other configs
  # Start PostgreSQL Docker container
  docker-compose up -d
  npm install
  # Create tables
  npx prisma migrate dev
  # Generate Prisma Client
  npx prisma generate
  # Seed database
  npx prisma db seed
  # Run the server
  npm run dev
```

Client availabe at http://localhost:5173
Api v1 available at http://localhost:3000/api/v1
Api docs available at http://localhost:3000/api-docs/v1

## Project Maintenance

[Server]: Dependency Hygiene

A temporary override was added to patch a vulnerability in Prisma’s internal use of Hono.
Once Prisma shipped their official fix (7.3.0), the override will be removed.

## License

MIT License
