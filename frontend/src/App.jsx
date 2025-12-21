import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

import DashboardRouterPage from "./pages/dashboard/DashboardRouterPage.jsx";
import UserDashboardPage from "./pages/dashboard/UserDashboardPage.jsx";
import CoachDashboardPage from "./pages/dashboard/CoachDashboardPage.jsx";
import ManagerDashboardPage from "./pages/dashboard/ManagerDashboardPage.jsx";
import AdminDashboardPage from "./pages/dashboard/AdminDashboardPage.jsx";

import ProfilePage from "./pages/profile/ProfilePage.jsx";
import EditProfilePage from "./pages/profile/EditProfilePage.jsx";
import ChangePasswordPage from "./pages/profile/ChangePasswordPage.jsx";

// ✅ Unified Search (canonical)
import UserSearchPage from "./pages/search/UserSearchPage.jsx";

// Gyms (details & actions)
import GymDetailsPage from "./pages/gyms/GymDetailsPage.jsx";
import MakeReservationPage from "./pages/gyms/MakeReservationPage.jsx";

// Manager gym management
import ManagerGymsPage from "./pages/gyms/ManagerGymsPage.jsx";
import CreateGymPage from "./pages/gyms/CreateGymPage.jsx";
import EditGymPage from "./pages/gyms/EditGymPage.jsx";
import ManagerGymReservationsPage from "./pages/gyms/ManagerGymReservationsPage.jsx";

// Reservations
import MyReservationsPage from "./pages/reservations/MyReservationsPage.jsx";
import AdminReservationsPage from "./pages/reservations/AdminReservationsPage.jsx";

// Reviews
import MyReviewsPage from "./pages/reviews/MyReviewsPage.jsx";
import AdminReviewsPage from "./pages/reviews/AdminReviewsPage.jsx";

// Admin
import AdminUsersPage from "./pages/admin/AdminUsersPage.jsx";
import AdminGymsPage from "./pages/admin/AdminGymsPage.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ✅ Canonical explore/search */}
      <Route path="/search" element={<UserSearchPage />} />

      {/* ✅ Backward-compatible redirects (optional but recommended) */}
      <Route path="/gyms" element={<Navigate to="/search" replace />} />
      <Route path="/coaches" element={<Navigate to="/search" replace />} />

      {/* Dashboard router */}
      <Route path="/dashboard" element={<DashboardRouterPage />} />
      <Route path="/dashboard/user" element={<UserDashboardPage />} />
      <Route path="/dashboard/coach" element={<CoachDashboardPage />} />
      <Route path="/dashboard/manager" element={<ManagerDashboardPage />} />
      <Route path="/dashboard/admin" element={<AdminDashboardPage />} />

      {/* Profile */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
      <Route path="/profile/password" element={<ChangePasswordPage />} />

      {/* Gyms (details & actions) */}
      <Route path="/gyms/:id" element={<GymDetailsPage />} />
      <Route path="/gyms/:id/reserve" element={<MakeReservationPage />} />

      {/* Manager gym management */}
      <Route path="/manager/gyms" element={<ManagerGymsPage />} />
      <Route path="/manager/gyms/new" element={<CreateGymPage />} />
      <Route path="/manager/gyms/:id/edit" element={<EditGymPage />} />
      <Route
        path="/manager/gyms/:id/reservations"
        element={<ManagerGymReservationsPage />}
      />

      {/* Reservations */}
      <Route path="/reservations/me" element={<MyReservationsPage />} />
      <Route path="/admin/reservations" element={<AdminReservationsPage />} />

      {/* Reviews */}
      <Route path="/reviews/me" element={<MyReviewsPage />} />
      <Route path="/admin/reviews" element={<AdminReviewsPage />} />

      {/* Admin */}
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/gyms" element={<AdminGymsPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
