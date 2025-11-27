import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const redirectMap = {
        user: "/dashboard/user",
        coach: "/dashboard/coach",
        "club-manager": "/dashboard/manager",
        admin: "/dashboard/admin"
      };

      navigate(redirectMap[user.role] || "/dashboard/user");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="card-anim">

        <h1 style={styles.logo}>FitFinder</h1>
        <p style={styles.subtitle}>Luxury Fitness Experience</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button} className="button-anim">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.bottomText}>
          Don’t have an account?
          <Link to="/register" style={styles.link}> Register</Link>
        </p>
      </div>

      <style>{`
        .card-anim {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeSlide 0.9s ease forwards;
        }

        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .button-anim {
          transition: 0.25s ease;
        }

        .button-anim:hover {
          background-color: #c6a32f;
          transform: translateY(-2px);
          box-shadow: 0 0 14px rgba(212,175,55,0.5);
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0A0A0A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",  // prevents scroll
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#141414",
    padding: "35px 32px",
    borderRadius: "14px",
    border: "1px solid rgba(212,175,55,0.25)",
    boxShadow: "0 0 20px rgba(0,0,0,0.7)",
    textAlign: "center",
  },

  logo: {
    color: "#D4AF37",
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#CCCCCC",
    marginBottom: "25px",
    fontSize: "14px",
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  field: {
    width: "100%",
    textAlign: "left",
  },

  label: {
    color: "#D4AF37",
    fontSize: "13px",
    marginBottom: "6px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1F1F1F",
    border: "1px solid #333",
    borderRadius: "6px",
    color: "#FFFFFF",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#D4AF37",
    borderRadius: "6px",
    border: "none",
    color: "#0A0A0A",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  bottomText: {
    marginTop: "18px",
    color: "#AAAAAA",
    fontSize: "14px",
  },

  link: {
    color: "#D4AF37",
    textDecoration: "none",
    marginLeft: "4px",
  },

  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  }
};
