import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/* -------------------- SCROLL REVEAL CODE -------------------- */

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
    <div
      ref={ref}
      className="reveal"
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ */

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      alert("Registration failed: ", err);
    }
  }

  return (
    <div style={styles.page}>
      {/* ANIMATION + BUTTON HOVER CSS */}
      <style>{`
        /* Scroll reveal base */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
          transition-delay: var(--reveal-delay, 0ms);
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Premium gold hover animation */
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

        /* Shine effect */
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
            rgba(255,255,255,0.5),
            transparent
          );
          transform: skewX(-20deg);
        }

        .button-anim:hover::after {
          animation: shine 0.6s ease;
        }

        @keyframes shine {
          0% { left: -80%; }
          100% { left: 130%; }
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
                style={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Reveal>

            <Reveal delay={130}>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Reveal>

            <Reveal delay={200}>
              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Reveal>

            <Reveal delay={270}>
              <input
                style={styles.input}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Reveal>

            <Reveal delay={340}>
              <button style={styles.button} className="button-anim">
                Register
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
    backgroundColor: "#111",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 0 18px rgba(212,175,55,0.15)",
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
    gap: "16px",
    marginBottom: "20px",
  },

  input: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "white",
  },

  button: {
    backgroundColor: "#D4AF37",
    padding: "14px",
    borderRadius: "8px",
    fontWeight: "700",
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
    fontWeight: "600",
    textDecoration: "none",
  },
};
