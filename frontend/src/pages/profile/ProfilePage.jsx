// frontend/src/pages/profile/ProfilePage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileAvatarButton from "../../components/ProfileAvatarButton.jsx";

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

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function initialsFrom(name = "User") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "FF";
  const a = parts[0]?.[0] || "F";
  const b = parts[1]?.[0] || parts[0]?.[1] || "F";
  return (a + b).toUpperCase();
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("token"), []);

  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    let isMounted = true;

    async function loadMe() {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get("http://localhost:5000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!isMounted) return;

        setMe(res.data);

        const existing = safeParse(localStorage.getItem("user") || "null");
        const merged = {
          ...(existing || {}),
          id: res.data?.id,
          username: res.data?.username,
          email: res.data?.email,
          role: res.data?.role,
          bio: res.data?.bio || "",
          profilePicUrl: res.data?.profilePicUrl || "",
        };
        localStorage.setItem("user", JSON.stringify(merged));
      } catch (err) {
        if (!isMounted) return;

        const status = err?.response?.status;

        if (status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Failed to load profile."
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadMe();

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const roleLabel = String(me?.role || "user")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .toUpperCase();

  const avatarUrl = me?.profilePicUrl || "";
  const avatarFallback = initialsFrom(me?.username || "User");

  return (
    <div style={styles.page}>
      <style>{`
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

        .button-anim{
          position: relative;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
          transition: transform .2s ease, box-shadow .2s ease;
          transform: translateZ(0);
          white-space: nowrap;
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
        @keyframes spin{to{transform:rotate(360deg)}}

        .dash-card{
          border: 1px solid rgba(212,175,55,0.18);
          background: linear-gradient(145deg, rgba(18,18,18,0.95), rgba(8,8,8,0.95));
          border-radius: 16px;
          box-shadow: 0 22px 70px rgba(0,0,0,0.55);
        }

        .profile-grid{
          display:grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 18px;
          align-items: start;
        }
        @media (max-width: 900px){
          .profile-grid{ grid-template-columns: 1fr; }
        }

        .muted{ color: rgba(255,255,255,0.72); }
        .label{ color: rgba(255,255,255,0.55); font-size: 12px; letter-spacing: 1.3px; font-weight: 800; }
        .value{ font-size: 16px; font-weight: 800; margin-top: 6px; }

        /* Username row (name + role chip) */
        .name-row{
          display:flex;
          align-items:center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Role chip next to username */
        .role-chip{
          position: relative;
          display:inline-flex;
          align-items:center;
          gap: 8px;
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid rgba(212,175,55,0.35);
          color: #D4AF37;
          background: rgba(212,175,55,0.06);
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 1px;
          cursor: default;
          user-select: none;
          overflow: hidden;
          transform: translateZ(0);
          transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
        }
        .role-chip::before{
          content:"";
          position:absolute;
          inset:-2px;
          background: radial-gradient(circle at 30% 20%, rgba(212,175,55,0.25), transparent 55%);
          opacity: 0;
          transition: opacity .25s ease;
          pointer-events:none;
        }
        .role-chip::after{
          content:"";
          position:absolute;
          top:0; left:-80%;
          width: 55%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.42), transparent);
          transform: skewX(-20deg);
          pointer-events:none;
        }
        .role-chip:hover{
          transform: translateY(-1px);
          box-shadow: 0 0 14px rgba(212,175,55,0.28);
          background: rgba(212,175,55,0.09);
        }
        .role-chip:hover::before{ opacity: 1; }
        .role-chip:hover::after{ animation: chipShine .75s ease; }
        @keyframes chipShine{ 0% { left:-80%; } 100% { left:130%; } }

        /* Email overflow fix */
        .email-text{
          margin-top: 8px;
          font-size: 15px;
          line-height: 1.4;
          color: rgba(255,255,255,0.72);
          max-width: 100%;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        /* Avatar */
        .avatar{
          width: 72px;
          height: 72px;
          border-radius: 18px;
          object-fit: cover;
          border: 1px solid rgba(212,175,55,0.22);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 22px rgba(212,175,55,0.08);
          flex: 0 0 auto;
        }
        .avatar-fallback{
          display:flex;
          align-items:center;
          justify-content:center;
          width: 72px;
          height: 72px;
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,0.22);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 22px rgba(212,175,55,0.08);
          color:#D4AF37;
          font-weight: 900;
          letter-spacing: 1px;
          flex: 0 0 auto;
        }

        .identity-row{
          display:flex;
          gap: 14px;
          align-items: center;
          min-width: 0;
        }

        .bio{
          margin-top: 14px;
          padding: 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.78);
          line-height: 1.6;
          overflow-wrap: anywhere;
        }
      `}</style>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.brand}>FITFINDER</div>

        <div style={styles.topBarRight}>
          <Link className="nav-tab" to="/dashboard">Dashboard</Link>
          <Link className="nav-tab" to="/gyms">Gyms</Link>
          <Link className="nav-tab" to="/coaches">Coaches</Link>

          {/* Avatar replaces "Profile" */}
          <div className="button-anim" style={{ borderRadius: 999, overflow: "hidden" }}>
            <ProfileAvatarButton size={38} />
          </div>

          <button
            onClick={handleLogout}
            className="button-anim"
            style={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={styles.container}>
        <Reveal>
          <div style={styles.header}>
            <div style={styles.kicker}>PROFILE</div>
            <h1 style={styles.title}>Your account</h1>
            <p style={styles.subtitle}>
              View your details. You can edit your profile or change your password any time.
            </p>
          </div>
        </Reveal>

        {loading && (
          <Reveal delay={80}>
            <div className="dash-card" style={styles.loadingCard}>
              <div style={styles.spinner} />
              <div className="muted">Loading profile...</div>
            </div>
          </Reveal>
        )}

        {!loading && error && (
          <Reveal delay={80}>
            <div className="dash-card" style={styles.errorCard}>
              <div style={styles.errorTitle}>Couldn’t load profile</div>
              <div className="muted" style={{ marginTop: 8 }}>{error}</div>
              <button
                className="button-anim"
                style={{ ...styles.secondaryBtn, marginTop: 14 }}
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </Reveal>
        )}

        {!loading && !error && me && (
          <div className="profile-grid">
            <Reveal delay={80}>
              <div className="dash-card" style={styles.bigCard}>
                <div style={styles.bigCardHeader}>
                  <div className="identity-row">
                    {avatarUrl ? (
                      <img className="avatar" src={avatarUrl} alt="profile" />
                    ) : (
                      <div className="avatar-fallback" title="No profile photo yet">
                        {avatarFallback}
                      </div>
                    )}

                    <div style={{ minWidth: 0 }}>
                      <div className="name-row">
                        <div style={styles.name}>{me.username}</div>
                        <div className="role-chip" title="Your role">
                          {roleLabel}
                        </div>
                      </div>

                      <div className="email-text">{me.email}</div>
                    </div>
                  </div>
                </div>

                {me.bio ? <div className="bio">{me.bio}</div> : null}

                <div style={styles.divider} />

                <div style={styles.fieldGrid}>
                  <div style={styles.field}>
                    <div className="label">USER ID</div>
                    <div className="value">{me.id}</div>
                  </div>

                  <div style={styles.field}>
                    <div className="label">USERNAME</div>
                    <div className="value">{me.username}</div>
                  </div>

                  <div style={styles.field}>
                    <div className="label">EMAIL</div>
                    <div className="value" style={{ overflowWrap: "anywhere" }}>
                      {me.email}
                    </div>
                  </div>

                  <div style={styles.field}>
                    <div className="label">CREATED AT</div>
                    <div className="value">
                      {me.createdAt ? new Date(me.createdAt).toLocaleString() : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="dash-card" style={styles.sideCard}>
                <div style={styles.sideTitle}>Quick actions</div>
                <div className="muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
                  Keep your account up-to-date and secure.
                </div>

                <div style={styles.sideBtns}>
                  <Link to="/profile/edit" className="button-anim" style={styles.primaryBtn}>
                    Edit Profile
                  </Link>

                  <Link to="/profile/password" className="button-anim" style={styles.secondaryBtn}>
                    Change Password
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        )}
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
    maxWidth: "700px",
    lineHeight: 1.6,
  },
  loadingCard: {
    padding: "22px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  spinner: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.15)",
    borderTopColor: "rgba(212,175,55,0.85)",
    animation: "spin 0.9s linear infinite",
  },
  errorCard: { padding: "22px" },
  errorTitle: { fontSize: 18, fontWeight: 900 },

  bigCard: { padding: "22px" },
  bigCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  name: { fontSize: 26, fontWeight: 900 },

  divider: {
    height: 1,
    background: "rgba(212,175,55,0.14)",
    margin: "18px 0",
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    marginTop: 10,
  },
  field: {
    padding: "14px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    minWidth: 0,
  },

  sideCard: { padding: "22px" },
  sideTitle: { fontSize: 18, fontWeight: 900 },
  sideBtns: {
    marginTop: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  primaryBtn: {
    textDecoration: "none",
    background: "#D4AF37",
    color: "#000",
    fontWeight: 900,
    padding: "12px 14px",
    borderRadius: "10px",
    textAlign: "center",
  },
  secondaryBtn: {
    textDecoration: "none",
    background: "transparent",
    color: "#D4AF37",
    fontWeight: 900,
    padding: "12px 14px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid rgba(212,175,55,0.35)",
  },
};
