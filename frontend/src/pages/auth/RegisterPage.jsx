import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/* -------------------- SCROLL REVEAL (GPU-SAFE) -------------------- */
function useRevealOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref} className="reveal" style={{ "--reveal-delay": `${delay}ms` }}>
      {children}
    </div>
  );
}
/* ----------------------------------------------------------------- */

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      return alert("Please fill in all fields.");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      alert("Registered successfully! Please login.");
      navigate("/login", { replace: true });
    } catch (err) {
      // ✅ show real backend error
      const msg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors?.[0]?.msg
          ? `Validation: ${err.response.data.errors[0].msg}`
          : null) ||
        "Registration failed. Please try again.";

      alert(msg);
      console.error("Register error:", err?.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* ANIMATION + BUTTON HOVER CSS */}
      <style>{`
        /* Reveal (GPU optimized) */
        .reveal {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          will-change: opacity, transform;
          transition: opacity 0.6s ease, transform 0.6s ease;
          transition-delay: var(--reveal-delay, 0ms);
        }
        .reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* Button hover shine (same as landing/login) */
        .button-anim {
          position: relative;
          display: inline-block;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .button-anim:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 12px rgba(212,175,55,0.45);
        }
        .button-anim::after {
          content: "";
          position: absolute;
          top: 0;
          left: -80%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.55),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
        }
        .button-anim:hover::after {
          animation: shine 0.6s ease;
        }
        @keyframes shine {
          0% { left: -80%; }
          100% { left: 130%; }
        }

        .btn-disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .lux-input:focus {
          outline: none;
          border-color: rgba(212,175,55,0.55);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }
      `}</style>

      <Reveal>
        <div style={styles.card}>
          <Reveal delay={0}>
            <h2 style={styles.title}>Create Account</h2>
          </Reveal>

          <form onSubmit={handleRegister} style={styles.form}>
            <Reveal delay={60}>
              <input
                className="lux-input"
                style={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Reveal>

            <Reveal delay={130}>
              <input
                className="lux-input"
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Reveal>

            <Reveal delay={200}>
              <input
                className="lux-input"
                style={styles.input}
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Reveal>

            <Reveal delay={270}>
              <input
                className="lux-input"
                style={styles.input}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Reveal>

            <Reveal delay={340}>
              <button
                type="submit"
                style={styles.button}
                className={`button-anim ${submitting ? "btn-disabled" : ""}`}
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Register"}
              </button>
            </Reveal>
          </form>

          <Reveal delay={400}>
            <p style={styles.linkText}>
              Already have an account?{" "}
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </p>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}

/* --------------------------- STYLES --------------------------- */
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0A0A0A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },

  card: {
    width: "380px",
    background: "linear-gradient(145deg, #111, #0A0A0A)",
    borderRadius: "14px",
    padding: "32px",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 24px rgba(0,0,0,0.55)",
    textAlign: "center",
  },

  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "white",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    backgroundColor: "#141414",
    color: "white",
  },

  button: {
    width: "100%",
    backgroundColor: "#D4AF37",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "800",
    fontSize: "18px",
    color: "#000",
    cursor: "pointer",
    border: "none",
  },

  linkText: {
    marginTop: "10px",
    color: "#CCCCCC",
    fontSize: "14px",
  },

  link: {
    color: "#D4AF37",
    fontWeight: "700",
    textDecoration: "none",
  },
};
