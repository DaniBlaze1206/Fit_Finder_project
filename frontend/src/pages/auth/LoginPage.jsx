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

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password: ", err);
    }
  }

  return (
    <div style={styles.page}>
      {/* ANIMATION STYLES */}
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

        /* Visible state */
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Premium button hover animation */
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
            <h2 style={styles.title}>Welcome Back</h2>
          </Reveal>

          <form onSubmit={handleLogin} style={styles.form}>

            <Reveal delay={80}>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Reveal>

            <Reveal delay={160}>
              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Reveal>

            <Reveal delay={240}>
              <button style={styles.button} className="button-anim">
                Login
              </button>
            </Reveal>
          </form>

          <Reveal delay={300}>
            <p style={styles.linkText}>
              Don’t have an account?{" "}
              <Link to="/register" style={styles.link}>Register</Link>
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
