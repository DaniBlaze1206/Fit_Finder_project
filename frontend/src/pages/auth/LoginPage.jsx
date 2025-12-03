import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/* ---------- Scroll Reveal Hook (safe: GPU transform) ---------- */
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

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return alert("Please enter email and password.");

    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid email or password. Please try again.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={styles.page}>
      <style>{`
        /* Reveal (GPU; prevents layout/scroll glitches) */
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

        /* Button hover shine (same vibe as Landing) */
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
          animation: shine-gold 0.6s ease;
        }
        @keyframes shine-gold {
          0% { left: -80%; }
          100% { left: 130%; }
        }

        /* Disabled button feel */
        .btn-disabled {
          opacity: 0.7;
          cursor: not-allowed;
          filter: grayscale(0.15);
        }

        /* Input focus */
        .lux-input:focus {
          outline: none;
          border-color: rgba(212,175,55,0.55);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }
      `}</style>

      <Reveal>
        <div style={styles.card}>
          <Reveal delay={0}>
            <h2 style={styles.title}>Welcome Back</h2>
          </Reveal>

          <form onSubmit={handleLogin} style={styles.form}>
            <Reveal delay={80}>
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

            <Reveal delay={160}>
              <input
                className="lux-input"
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Reveal>

            <Reveal delay={240}>
              <button
                type="submit"
                style={styles.button}
                className={`button-anim ${submitting ? "btn-disabled" : ""}`}
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login"}
              </button>
            </Reveal>
          </form>

          <Reveal delay={300}>
            <p style={styles.linkText}>
              Don’t have an account?{" "}
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </p>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}

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
    letterSpacing: "0.5px",
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
