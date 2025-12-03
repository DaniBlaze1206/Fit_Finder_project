import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* -------------------- Reveal (scroll-triggered) -------------------- */
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
      { threshold: 0.2 }
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
/* ------------------------------------------------------------------ */

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("token"), []);

  const [me] = useState(() => {
    try {
      const cached = localStorage.getItem("user");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

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

        /* Navbar underline ONLY (no color change) */
        .nav-tab{
          position: relative;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          transition: none;
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
        .nav-tab:hover::after{
          width:100%;
        }

        /* Button shine (for buttons only) */
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

        /* Cards (smooth hover) */
        .dash-card{
          border: 1px solid rgba(212,175,55,0.18);
          background: linear-gradient(145deg, rgba(18,18,18,0.95), rgba(8,8,8,0.95));
          border-radius: 16px;
          box-shadow: 0 22px 70px rgba(0,0,0,0.55);
          transition: transform .25s ease, box-shadow .25s ease;
          will-change: transform, box-shadow;
        }
        .dash-card:hover{
          transform: translateY(-3px);
          box-shadow: 0 22px 70px rgba(0,0,0,0.55), 0 0 22px rgba(212,175,55,0.16);
        }

        /* Role pill hover + pointer cursor */
        .role-pill{
          cursor: pointer;
          user-select: none;
          transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease;
        }
        .role-pill:hover{
          transform: translateY(-1px);
          box-shadow: 0 0 14px rgba(212,175,55,0.35);
          background-color: rgba(212,175,55,0.08);
        }

        /* ✅ NEW CARD GRID APPROACH (stable and responsive) */
        .action-grid{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        /* ✅ Ensures perfect equal height + button bottom */
        .action-card{
          height: 260px;
          padding: 22px;
          display:flex;
          flex-direction:column;
        }
        .card-body{
          flex: 1;
        }
        .card-cta{
          margin-top: 14px;
        }
      `}</style>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.brand}>FITFINDER</div>

        <div style={styles.topBarRight}>
          <Link className="nav-tab" to="/gyms">Gyms</Link>
          <Link className="nav-tab" to="/coaches">Coaches</Link>
          <Link className="nav-tab" to="/profile">Profile</Link>

          <button onClick={handleLogout} className="button-anim" style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.container}>
        <Reveal>
          <div style={styles.header}>
            <div>
              <div style={styles.kicker}>USER DASHBOARD</div>
              <h1 style={styles.title}>
                Welcome{me?.username ? `, ${me.username}` : ""}.
              </h1>
              <p style={styles.subtitle}>
                Search gyms, discover coaches, manage your reservations, and track your activity.
              </p>
            </div>

            <div style={styles.profileChip} className="dash-card">
              <div style={styles.chipLabel}>Signed in as</div>
              <div>
                <div style={styles.chipName}>{me?.username || "User"}</div>
                <div style={styles.chipMeta}>{me?.email || "—"}</div>
              </div>

              <div
                className="role-pill"
                style={styles.rolePill}
                title="Your role (from the backend)"
                onClick={() => alert(`Your role is: ${me?.role || "user"}`)}
              >
                {(me?.role || "user").toUpperCase()}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ✅ Quick Actions (NEW stable grid) */}
        <div className="action-grid">
          <Reveal delay={60}>
            <div className="dash-card action-card">
              <div className="card-body">
                <div style={styles.cardIcon}>🔎</div>
                <div style={styles.cardTitle}>Search Gyms</div>
                <div style={styles.cardText}>
                  Filter gyms by location, services, and pricing. View details and reserve.
                </div>
              </div>

              <Link to="/gyms" className="button-anim card-cta" style={styles.primaryBtn}>
                Go to Gyms
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="dash-card action-card">
              <div className="card-body">
                <div style={styles.cardIcon}>🧑‍🏫</div>
                <div style={styles.cardTitle}>Search Coaches</div>
                <div style={styles.cardText}>
                  Find coaches by specialization and location.
                </div>
              </div>

              <Link to="/coaches" className="button-anim card-cta" style={styles.primaryBtn}>
                Explore Coaches
              </Link>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="dash-card action-card">
              <div className="card-body">
                <div style={styles.cardIcon}>📅</div>
                <div style={styles.cardTitle}>My Reservations</div>
                <div style={styles.cardText}>
                  View your bookings and reservation history.
                </div>
              </div>

              <Link
                to="/reservations/me"
                className="button-anim card-cta"
                style={styles.primaryBtn}
              >
                View Reservations
              </Link>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="dash-card action-card">
              <div className="card-body">
                <div style={styles.cardIcon}>👤</div>
                <div style={styles.cardTitle}>My Profile</div>
                <div style={styles.cardText}>
                  Edit your info and change your password anytime.
                </div>
              </div>

              <Link to="/profile" className="button-anim card-cta" style={styles.primaryBtn}>
                Open Profile
              </Link>
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

  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "18px",
    alignItems: "stretch",
    flexWrap: "wrap",
    marginBottom: "22px",
  },
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
    maxWidth: "620px",
    lineHeight: 1.6,
  },

  profileChip: {
    minWidth: "310px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "10px",
  },
  chipLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "12px",
  },
  chipName: { fontWeight: 900, fontSize: "18px" },
  chipMeta: { color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "2px" },
  rolePill: {
    alignSelf: "flex-start",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(212,175,55,0.35)",
    color: "#D4AF37",
    fontWeight: 900,
    fontSize: "12px",
    letterSpacing: "1px",
    backgroundColor: "transparent",
  },

  cardIcon: { fontSize: "26px" },
  cardTitle: { fontWeight: 900, fontSize: "18px", marginTop: "4px" },
  cardText: { color: "rgba(255,255,255,0.72)", lineHeight: 1.6, marginTop: "6px" },

  primaryBtn: {
    textDecoration: "none",
    background: "#D4AF37",
    color: "#000",
    fontWeight: 900,
    padding: "12px 14px",
    borderRadius: "10px",
    textAlign: "center",
  },
};
