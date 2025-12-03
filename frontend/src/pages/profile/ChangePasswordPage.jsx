import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/* -------------------- Reveal (scroll-triggered) -------------------- */
function Reveal({ children, delay = 0 }) {
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal" style={{ "--reveal-delay": `${delay}ms` }}>
      {children}
    </div>
  );
}
/* ------------------------------------------------------------------ */

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("token"), []);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" }); // {type:'ok'|'err', text:''}

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setMsg({ type: "err", text: "Please fill in all fields." });
      return;
    }

    if (newPassword.length < 6) {
      setMsg({ type: "err", text: "New password must be at least 6 characters." });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMsg({ type: "err", text: "New passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        "http://localhost:5000/users/me/password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg({ type: "ok", text: "Password updated successfully." });
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      const status = err?.response?.status;

      // token invalid or expired
      if (status === 401) {
        logout();
        return;
      }

      setMsg({
        type: "err",
        text:
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Could not update password.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <style>{`
        /* Reveal (GPU safe) */
        .reveal{
          opacity:0;
          transform: translate3d(0, 18px, 0);
          will-change: opacity, transform;
          transition: opacity .6s ease, transform .6s ease;
          transition-delay: var(--reveal-delay, 0ms);
        }
        .reveal-visible{
          opacity:1;
          transform: translate3d(0,0,0);
        }

        /* Navbar underline ONLY */
        .nav-tab{
          position: relative;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
        }
        .nav-tab::after{
          content:"";
          position:absolute;
          bottom:-6px;
          left:0;
          width:0%;
          height:2px;
          background-color:#D4AF37;
          transition: width 0.25s ease;
        }
        .nav-tab:hover::after{ width:100%; }

        /* Premium button shine */
        .button-anim{
          position: relative;
          display:inline-block;
          overflow:hidden;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .button-anim:hover{
          transform: translateY(-2px);
          box-shadow: 0 0 12px rgba(212,175,55,.45);
        }
        .button-anim::after{
          content:"";
          position:absolute;
          top:0; left:-80%;
          width:50%; height:100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.55), transparent);
          transform: skewX(-20deg);
          pointer-events:none;
        }
        .button-anim:hover::after{ animation: shine .6s ease; }
        @keyframes shine{ 0%{left:-80%} 100%{left:130%} }

        /* Card */
        .card{
          border: 1px solid rgba(212,175,55,0.18);
          background: linear-gradient(145deg, rgba(18,18,18,0.95), rgba(8,8,8,0.95));
          border-radius: 16px;
          box-shadow: 0 22px 70px rgba(0,0,0,0.55);
        }

        /* Inputs */
        .input{
          width: 100%;
          padding: 14px 14px;
          font-size: 15px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #fff;
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
        }
        .input:focus{
          border-color: rgba(212,175,55,0.55);
          box-shadow: 0 0 0 4px rgba(212,175,55,0.12);
          transform: translateY(-1px);
        }

        .hint{
          color: rgba(255,255,255,0.62);
          font-size: 13px;
          line-height: 1.6;
        }

        .msgOk{
          border: 1px solid rgba(212,175,55,0.35);
          background: rgba(212,175,55,0.08);
          color: rgba(255,255,255,0.92);
          padding: 12px 14px;
          border-radius: 12px;
          font-weight: 700;
        }
        .msgErr{
          border: 1px solid rgba(255,90,90,0.35);
          background: rgba(255,90,90,0.08);
          color: rgba(255,255,255,0.92);
          padding: 12px 14px;
          border-radius: 12px;
          font-weight: 700;
        }

        .btnDisabled{
          opacity: 0.7;
          cursor: not-allowed !important;
          transform: none !important;
          box-shadow: none !important;
        }
      `}</style>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.brand}>FITFINDER</div>

        <div style={styles.topBarRight}>
          <Link className="nav-tab" to="/dashboard">Dashboard</Link>
          <Link className="nav-tab" to="/profile">Profile</Link>
          <Link className="nav-tab" to="/gyms">Gyms</Link>

          <button onClick={logout} className="button-anim" style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.container}>
        <Reveal>
          <div style={styles.header}>
            <div style={styles.kicker}>SECURITY</div>
            <h1 style={styles.title}>Change password</h1>
            <p style={styles.subtitle}>
              Keep your account secure. Your new password must be at least 6 characters.
            </p>
          </div>
        </Reveal>

        <div style={styles.grid}>
          <Reveal delay={80}>
            <div className="card" style={styles.card}>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                  <div style={styles.label}>OLD PASSWORD</div>
                  <input
                    className="input"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Your current password"
                    autoComplete="current-password"
                  />
                </div>

                <div>
                  <div style={styles.label}>NEW PASSWORD</div>
                  <input
                    className="input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    autoComplete="new-password"
                  />
                </div>

                <div>
                  <div style={styles.label}>CONFIRM NEW PASSWORD</div>
                  <input
                    className="input"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />
                </div>

                {msg.text && (
                  <div className={msg.type === "ok" ? "msgOk" : "msgErr"}>
                    {msg.text}
                  </div>
                )}

                <button
                  type="submit"
                  className={`button-anim ${loading ? "btnDisabled" : ""}`}
                  style={styles.primaryBtn}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>

                <div className="hint" style={{ marginTop: 8 }}>
                  Tip: don’t reuse old passwords. Use a mix of letters, numbers, and symbols.
                </div>
              </form>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card" style={styles.sideCard}>
              <div style={styles.sideTitle}>Quick links</div>
              <div className="hint" style={{ marginTop: 8 }}>
                Want to review your details first?
              </div>

              <div style={styles.sideBtns}>
                <Link to="/profile" className="button-anim" style={styles.secondaryBtn}>
                  Back to Profile
                </Link>
                <Link to="/profile/edit" className="button-anim" style={styles.secondaryBtn}>
                  Edit Profile
                </Link>
              </div>

              <div style={styles.sideHint}>
                <div style={styles.hintDot} />
                <div className="hint" style={{ fontSize: 13 }}>
                  If you forget your password later, we’ll add “Forgot password” in Sprint 6+.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "radial-gradient(circle at 15% 10%, #1a1a1a, #0A0A0A 55%)",
    color: "#fff",
  },
  topBar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(0, 0, 0, 0.82)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(212,175,55,0.15)",
    padding: "16px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    color: "#D4AF37",
    fontWeight: 900,
    letterSpacing: "2px",
    fontSize: "18px",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logoutBtn: {
    border: "1px solid rgba(212,175,55,0.35)",
    background: "transparent",
    color: "#D4AF37",
    borderRadius: "10px",
    padding: "10px 14px",
    fontWeight: 800,
    cursor: "pointer",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "28px 22px 60px",
  },
  header: { marginBottom: "18px" },
  kicker: {
    color: "rgba(212,175,55,0.9)",
    fontWeight: 900,
    letterSpacing: "2px",
    fontSize: "12px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "44px",
    margin: 0,
    lineHeight: 1.05,
    letterSpacing: "-0.3px",
  },
  subtitle: {
    marginTop: "10px",
    color: "rgba(255,255,255,0.72)",
    maxWidth: "760px",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "18px",
    alignItems: "start",
    marginTop: "14px",
  },
  card: { padding: "22px" },
  sideCard: { padding: "22px" },

  label: {
    color: "rgba(255,255,255,0.55)",
    fontSize: "12px",
    letterSpacing: "1.3px",
    fontWeight: 800,
    marginBottom: 8,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  primaryBtn: {
    width: "100%",
    textDecoration: "none",
    background: "#D4AF37",
    color: "#000",
    fontWeight: 900,
    padding: "12px 14px",
    borderRadius: "12px",
    textAlign: "center",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: 4,
  },
  secondaryBtn: {
    textDecoration: "none",
    background: "transparent",
    color: "#D4AF37",
    fontWeight: 900,
    padding: "12px 14px",
    borderRadius: "12px",
    textAlign: "center",
    border: "1px solid rgba(212,175,55,0.35)",
  },

  sideTitle: { fontSize: 18, fontWeight: 900 },
  sideBtns: {
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  sideHint: {
    marginTop: 16,
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "12px",
    borderRadius: "14px",
    background: "rgba(212,175,55,0.06)",
    border: "1px solid rgba(212,175,55,0.14)",
  },
  hintDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "#D4AF37",
    marginTop: 6,
  },

  /* responsive */
  "@media (maxWidth: 900px)": {},
};
