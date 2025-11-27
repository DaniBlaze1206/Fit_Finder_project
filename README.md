# 🏋️‍♂️ FitFinder
A modern, full-stack fitness platform built with **Node.js**, **Express**, and **React**.  
FitFinder helps users discover gyms, book reservations, find coaches, manage profiles, leave reviews, and more — all with a premium black-and-gold UI.

This project is built using **Agile methodology** with multiple sprints focusing on authentication, user roles, gym search, reservations, reviews, and UI/UX development.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (User, Coach, Manager, Admin)
- Protected routes for sensitive endpoints

### 👤 User Profiles
- View profile
- Edit personal information
- Change password
- Role-specific dashboard routing

### 🏋️ Gym System
- Search gyms by name, location, or sport type
- Gym details pages
- Managers can create, edit, and manage gyms
- Gym reservations and viewing reservation history

### ⭐ Reviews
- Users can leave reviews for gyms
- View all reviews
- Admin moderation

### 🎨 UI / UX
- Premium black-and-gold luxury theme
- Smooth animations, hover interactions, scroll reveal
- Fully responsive layout
- Custom Landing Page, Login, and Register pages

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- React Router
- CSS-in-JS (Inline styles + global.css)
- Custom animations & scroll observers

### **Backend**
- Node.js
- Express.js
- JWT Authentication
- bcrypt for password hashing
- File-based JSON storage (users, gyms, reviews, reservations)

### **Other Tools**
- dotenv
- express-validator

---

## 📦 Project Structure



FitFinder/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── roles.js
│ │ ├── controllers/
│ │ │ └── userController.js
│ │ ├── middleware/
│ │ │ ├── authMiddleware.js
│ │ │ └── roleMiddleware.js
│ │ ├── models/
│ │ │ ├── User.js
│ │ │ ├── Gym.js
│ │ │ ├── Review.js
│ │ │ └── Reservation.js
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ ├── userRoutes.js
│ │ │ ├── gymRoutes.js
│ │ │ ├── reservationRoutes.js
│ │ │ └── reviewRoutes.js
│ │ └── data/
│ │ ├── users.json
│ │ ├── gyms.json
│ │ ├── reservations.json
│ │ └── reviews.json
│ └── server.js
│
└── frontend/
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── global.css
│ ├── assets/
│ └── pages/
│ ├── LandingPage.jsx
│ ├── auth/
│ │ ├── LoginPage.jsx
│ │ └── RegisterPage.jsx
│ ├── dashboard/
│ ├── gyms/
│ ├── reservations/
│ ├── reviews/
│ └── admin/
└── index.html



---

## 🔧 Installation & Setup

Backend Setup (Node + Express)
Install dependencies:
cd backend
npm install


Create .env file:
JWT_TOKEN=your_secret_key
JWT_EXPIRES_IN=1h


Start backend server:
npm start


Server runs on:

http://localhost:5000

Frontend Setup (React + Vite)
Install dependencies:
cd frontend
npm install

Start dev server:
npm run dev


Frontend runs on:

http://localhost:5173

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/fitfinder.git
cd fitfinder
