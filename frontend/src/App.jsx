import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from "./pages/LandingPage.jsx";

import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';

import DashboardRouterPage from './pages/dashboard/DashboardRouterPage.jsx';
import UserDashboardPage from './pages/dashboard/UserDashboardPage.jsx';
import CoachDashboardPage from './pages/dashboard/CoachDashboardPage.jsx';
import ManagerDashboardPage from './pages/dashboard/ManagerDashboardPage.jsx';
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage.jsx';

import ProfilePage from './pages/profile/ProfilePage.jsx';
import EditProfilePage from './pages/profile/EditProfilePage.jsx';
import ChangePasswordPage from './pages/profile/ChangePasswordPage.jsx';

import GymSearchPage from './pages/gyms/GymSearchPage.jsx';
import GymDetailsPage from './pages/gyms/GymDetailsPage.jsx';
import MakeReservationPage from './pages/gyms/MakeReservationPage.jsx';

import ManagerGymsPage from './pages/gyms/ManagerGymsPage.jsx';
import CreateGymPage from './pages/gyms/CreateGymPage.jsx';
import EditGymPage from './pages/gyms/EditGymPage.jsx';
import ManagerGymReservationsPage from './pages/gyms/ManagerGymReservationsPage.jsx';

import CoachSearchPage from './pages/coaches/CoachSearchPage.jsx';

import MyReservationsPage from './pages/reservations/MyReservationsPage.jsx';
import AdminReservationsPage from './pages/reservations/AdminReservationsPage.jsx';

import MyReviewsPage from './pages/reviews/MyReviewsPage.jsx';
import AdminReviewsPage from './pages/reviews/AdminReviewsPage.jsx';

import AdminUsersPage from './pages/admin/AdminUsersPage.jsx';
import AdminGymsPage from './pages/admin/AdminGymsPage.jsx';

import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard router (chooses dashboard by role later) */}
      <Route path="/dashboard" element={<DashboardRouterPage />} />
      <Route path="/dashboard/user" element={<UserDashboardPage />} />
      <Route path="/dashboard/coach" element={<CoachDashboardPage />} />
      <Route path="/dashboard/manager" element={<ManagerDashboardPage />} />
      <Route path="/dashboard/admin" element={<AdminDashboardPage />} />

      {/* Profile */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
      <Route path="/profile/password" element={<ChangePasswordPage />} />

      {/* Gyms */}
      <Route path="/gyms" element={<GymSearchPage />} />
      <Route path="/gyms/:id" element={<GymDetailsPage />} />
      <Route path="/gyms/:id/reserve" element={<MakeReservationPage />} />

      {/* Manager gym management */}
      <Route path="/manager/gyms" element={<ManagerGymsPage />} />
      <Route path="/manager/gyms/new" element={<CreateGymPage />} />
      <Route path="/manager/gyms/:id/edit" element={<EditGymPage />} />
      <Route path="/manager/gyms/:id/reservations" element={<ManagerGymReservationsPage />} />

      {/* Coaches */}
      <Route path="/coaches" element={<CoachSearchPage />} />
      {/* <Route path="/coaches/:id" element={<CoachDetailsPage />} /> later */}

      {/* Reservations */}
      <Route path="/reservations/me" element={<MyReservationsPage />} />
      <Route path="/admin/reservations" element={<AdminReservationsPage />} />

      {/* Reviews */}
      <Route path="/reviews/me" element={<MyReviewsPage />} />
      <Route path="/admin/reviews" element={<AdminReviewsPage />} />

      {/* Admin */}
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/gyms" element={<AdminGymsPage />} />


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
