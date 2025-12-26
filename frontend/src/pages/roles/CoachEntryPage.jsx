import { Navigate } from "react-router-dom";
import { useMemo } from "react";
import CoachLandingPage from "../coaches/CoachLandingPage.jsx";

export default function CoachEntryPage() {
  const { isLoggedIn, role } = useMemo(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return {
      isLoggedIn: Boolean(token),
      role: (user.role || "").toLowerCase(),
    };
  }, []);

  const isCoach = role === "coach";

  if (isLoggedIn && isCoach) {
    return <Navigate to="/dashboard/coach" replace />;
  }

  return <CoachLandingPage />;
}
