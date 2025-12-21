import { useParams, Link } from "react-router-dom";

export default function GymDetailsPage() {
  const { id } = useParams();

  return (
    <div style={{ background: "#0A0A0A", color: "white", minHeight: "100vh", padding: 30 }}>
      <h1 style={{ color: "#D4AF37", fontWeight: 900 }}>Gym Details</h1>
      <p style={{ color: "#CCC" }}>Gym id: {id}</p>

      <Link to="/gyms" style={{ color: "#D4AF37" }}>
        ← Back to gyms
      </Link>
    </div>
  );
}
