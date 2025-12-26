import { Navigate } from "react-router-dom";
import { useMemo } from "react";
import GymOwnerLandingPage from "../gyms/GymOwnerLandingPage.jsx";

export default function GymEntryPage() {
  const { isLoggedIn, role } = useMemo(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return {
      isLoggedIn: Boolean(token),
      role: (user.role || "").toLowerCase(),
    };
  }, []);

  // backend role might be "club-manager"
  const isManager = role === "club-manager" || role === "manager";

  if (isLoggedIn && isManager) {
    return <Navigate to="/dashboard/manager" replace />;
  }

  return <GymOwnerLandingPage />;
}
