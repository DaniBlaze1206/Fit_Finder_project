import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // client-side check
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="card-anim">

        <h1 style={styles.logo} className="fade-in">FitFinder</h1>
        <p style={styles.subtitle} className="fade-in-slow">Create Your Premium Account</p>

        <form onSubmit={handleRegister} style={styles.form} className="fade-in-slower">

          {/* USERNAME */}
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              style={styles.input}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-anim"
            />
          </div>

          {/* EMAIL */}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-anim"
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-anim"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              style={styles.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-anim"
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <button type="submit" style={styles.button} className="button-anim">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p style={styles.bottomText} className="fade-in-slowest">
          Already have an account?
          <Link to="/login" style={styles.link}> Login</Link>
        </p>
      </div>

      <style>{`

        /* Card entrance animation */
        .card-anim {
          opacity: 0;
          transform: translateY(20px);
          animation: popIn 0.9s ease forwards;
        }

        @keyframes popIn {
          0% { opacity: 0; transform: translateY(25px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Fade sequences */
        .fade-in { animation: fade 1s ease forwards; opacity: 0; }
        .fade-in-slow { animation: fade 1.3s ease forwards; opacity: 0; }
        .fade-in-slower { animation: fade 1.6s ease forwards; opacity: 0; }
        .fade-in-slowest { animation: fade 1.9s ease forwards; opacity: 0; }

        @keyframes fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Input focus glow */
        .input-anim {
          transition: 0.25s ease;
        }
        .input-anim:focus {
          border: 1px solid #D4AF37;
          box-shadow: 0 0 10px rgba(212,175,55,0.35);
          transform: scale(1.02);
        }

        /* Button hover animation */
        .button-anim {
          transition: all 0.25s ease;
        }
        .button-anim:hover {
          background-color: #c6a32f;
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(212,175,55,0.55);
        }

      `}</style>
    </div>
  );
}

/* ---------------- Luxury Styling System ---------------- */

const styles = {
  page: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0A0A0A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "38px 34px",
    borderRadius: "14px",
    backgroundColor: "#141414",
    border: "1px solid rgba(212,175,55,0.3)",
    boxShadow: "0 0 20px rgba(0,0,0,0.7)",
    textAlign: "center",
  },
  logo: {
    color: "#D4AF37",
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#BBBBBB",
    fontSize: "14px",
    marginBottom: "26px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  field: {
    textAlign: "left",
  },
  label: {
    color: "#D4AF37",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1F1F1F",
    border: "1px solid #333",
    borderRadius: "6px",
    color: "#FFF",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    backgroundColor: "#D4AF37",
    borderRadius: "6px",
    color: "#0A0A0A",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
  error: {
    color: "#FF5C5C",
    fontSize: "14px",
    textAlign: "center",
  },
  success: {
    color: "#88FF88",
    fontSize: "14px",
    textAlign: "center",
  },
  bottomText: {
    marginTop: "18px",
    color: "#AAAAAA",
  },
  link: {
    color: "#D4AF37",
    marginLeft: "4px",
    textDecoration: "none",
  },
};
