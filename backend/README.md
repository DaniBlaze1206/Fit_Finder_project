# FitFinder Backend - Sprint 1

## Overview
This backend is part of the FitFinder project for the Software Engineering course.  
**Sprint 1 Goal:** Set up the project skeleton, backend folder structure, temporary JSON storage, and basic GET routes for all resources.  

We are using **Node.js + Express** with **CommonJS modules**, and data is stored temporarily in JSON files.  

---

## Project Structure

backend/
├── src/
│ ├── data/ # Temporary JSON storage
│ │ ├── users.json
│ │ ├── gyms.json
│ │ ├── reservations.json
│ │ └── reviews.json
│ ├── controllers/ # Currently empty (used in future sprints)
│ ├── routes/ # GET routes for Sprint 1
│ │ ├── userRoutes.js
│ │ ├── gymRoutes.js
│ │ ├── reservationRoutes.js
│ │ └── reviewRoutes.js
│ ├── models/ # Data model definitions (optional for now)
│ └── server.js # Main Express server
├── package.json
└── README.md



---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/DaniBlaze1206/Fit_Finder_project
cd backend

```
2.Install dependencies:
```bash
npm install
npm run dev
```
Server runs on http://localhost:5000 (or the port set in server.js)


## Routes (GET Only)
Users

GET /users → Returns all users

GET /users/:id → Returns a user by ID

Gyms

GET /gyms → Returns all gyms

GET /gyms/:id → Returns a gym by ID

Reservations

GET /reservations → Returns all reservations

GET /reservations/:id → Returns a reservation by ID

Reviews

GET /reviews → Returns all reviews

GET /reviews/:id → Returns a review by ID

## Notes

Data is currently stored in JSON files (src/data/)

Routes are read-only for Sprint 1

Authentication, JWT, and role-based access will be implemented in Sprint 2

Frontend can use these routes to render the base pages (Home, Login, Register, Dashboard)