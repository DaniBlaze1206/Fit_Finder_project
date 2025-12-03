// frontend/src/pages/profile/EditProfilePage.jsx
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

export default function EditProfilePage() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("token"), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [me, setMe] = useState(null);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    let alive = true;

    async function loadMe() {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const res = await axios.get("http://localhost:5000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!alive) return;

        setMe(res.data);
        setUsername(res.data?.username || "");
        setBio(res.data?.bio || "");
        setProfilePicUrl(res.data?.profilePicUrl || "");

        // keep localStorage in sync
        let existing = null;
        try {
          existing = JSON.parse(localStorage.getItem("user") || "null");
        } catch {
          existing = null;
        }
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...(existing || {}),
            id: res.data?.id,
            username: res.data?.username,
            email: res.data?.email,
            role: res.data?.role,
            bio: res.data?.bio || "",
            profilePicUrl: res.data?.profilePicUrl || "",
          })
        );
      } catch (err) {
        if (!alive) return;

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
            "Failed to load your profile."
        );
        console.error("EditProfile load error:", err?.response?.data || err);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadMe();
    return () => {
      alive = false;
    };
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        username: username.trim(),
        bio: bio,
        profilePicUrl: profilePicUrl,
      };

      const res = await axios.patch("http://localhost:5000/users/me", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = res.data;
      setMe(updated);

      // sync localStorage
      let existing = null;
      try {
        existing = JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        existing = null;
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...(existing || {}),
          id: updated?.id,
          username: updated?.username,
          email: updated?.email,
          role: updated?.role,
          bio: updated?.bio || "",
          profilePicUrl: updated?.profilePicUrl || "",
        })
      );

      setSuccess("Profile updated successfully.");
      setTimeout(() => navigate("/profile"), 650);
    } catch (err) {
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
          "Failed to update profile."
      );
      console.error("EditProfile save error:", err?.response?.data || err);
    } finally {
      setSaving(false);
    }
  }

  // UI-only for now: upgradable request button (we’ll add backend after)
  function requestUpgrade(targetRole) {
    if (!me) return;
    if ((me.role || "user") !== "user") {
      alert("Only normal users can request an upgrade in this flow.");
      return;
    }
    alert(
      `Upgrade request to "${targetRole}" recorded (UI only). Next step: we add a backend endpoint to store/approve this.`
    );
  }

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
        .reveal-visible{ opacity:1; transform: translate3d(0,0,0); }

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

        /* Button shine */
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

        .card{
          border: 1px solid rgba(212,175,55,0.18);
          background: linear-gradient(145deg, rgba(18,18,18,0.95), rgba(8,8,8,0.95));
          border-radius: 16px;
          box-shadow: 0 22px 70px rgba(0,0,0,0.55);
        }

        .label{
          color: rgba(255,255,255,0.58);
          font-size: 12px;
          letter-spacing: 1.3px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .input{
          width: 100%;
          padding: 14px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: white;
          outline: none;
          font-size: 15px;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .input:focus{
          border-color: rgba(212,175,55,0.55);
          box-shadow: 0 0 0 4px rgba(212,175,55,0.12);
        }

        .textarea{
          min-height: 110px;
          resize: vertical;
          line-height: 1.6;
        }

        .muted{ color: rgba(255,255,255,0.72); }

        .pfp{
          width: 68px;
          height: 68px;
          border-radius: 16px;
          object-fit: cover;
          border: 1px solid rgba(212,175,55,0.22);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 22px rgba(212,175,55,0.08);
        }

        .role-pill{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(212,175,55,0.35);
          color: #D4AF37;
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 1px;
          background: rgba(212,175,55,0.05);
          cursor: default;
        }

        .lockedBox{
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.78);
          overflow-wrap: anywhere;
        }
      `}</style>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.brand}>FITFINDER</div>

        <div style={styles.topBarRight}>
          <Link className="nav-tab" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-tab" to="/profile">
            Profile
          </Link>
          <Link className="nav-tab" to="/gyms">
            Gyms
          </Link>

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
            <div style={styles.kicker}>EDIT PROFILE</div>
            <h1 style={styles.title}>Your public presence</h1>
            <p style={styles.subtitle}>
              Update username, bio, and profile photo. Email is locked for
              security.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <Reveal delay={80}>
            <div className="card" style={styles.loadingCard}>
              <div style={styles.spinner} />
              <div className="muted">Loading...</div>
            </div>
          </Reveal>
        ) : (
          <div style={styles.grid}>
            <Reveal delay={80}>
              <div className="card" style={styles.formCard}>
                <div style={styles.identityRow}>
                  <img
                    className="pfp"
                    src={
                      profilePicUrl ||
                      "https://dummyimage.com/160x160/111/aaaaaa.png&text=FF"
                    }
                    alt="profile"
                  />

                  <div style={{ minWidth: 0 }}>
                    <div style={styles.nameLine}>
                      <div style={styles.nameText}>{me?.username || "User"}</div>
                      <div className="role-pill" title="Your role">
                        {String(me?.role || "user").toUpperCase()}
                      </div>
                    </div>
                    <div
                      className="muted"
                      style={styles.emailLine}
                      title={me?.email}
                    >
                      {me?.email}
                    </div>
                  </div>
                </div>

                <div style={styles.divider} />

                <form onSubmit={handleSave}>
                  {/* Username */}
                  <div style={{ marginBottom: 16 }}>
                    <div className="label">USERNAME</div>
                    <input
                      className="input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your username"
                      autoComplete="username"
                      required
                    />
                  </div>

                  {/* Profile photo URL */}
                  <div style={{ marginBottom: 16 }}>
                    <div className="label">PROFILE PHOTO (URL)</div>
                    <input
                      className="input"
                      value={profilePicUrl}
                      onChange={(e) => setProfilePicUrl(e.target.value)}
                      placeholder="Paste image URL"
                    />
                    <div
                      className="muted"
                      style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5 }}
                    >
                      For now, we store a URL in users.json. Later we can add
                      uploads.
                    </div>
                  </div>

                  {/* Bio */}
                  <div style={{ marginBottom: 14 }}>
                    <div className="label">BIO</div>
                    <textarea
                      className="input textarea"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell people who you are..."
                      maxLength={240}
                    />
                    <div className="muted" style={{ marginTop: 8, fontSize: 13 }}>
                      {bio.length}/240
                    </div>
                  </div>

                  {error && (
                    <div style={styles.alertError}>
                      <div style={{ fontWeight: 900 }}>Update failed</div>
                      <div style={{ marginTop: 6 }} className="muted">
                        {error}
                      </div>
                    </div>
                  )}

                  {success && (
                    <div style={styles.alertSuccess}>
                      <div style={{ fontWeight: 900 }}>Success</div>
                      <div style={{ marginTop: 6 }} className="muted">
                        {success}
                      </div>
                    </div>
                  )}

                  <div style={styles.actionsRow}>
                    <Link
                      to="/profile"
                      className="button-anim"
                      style={styles.secondaryBtn}
                    >
                      Cancel
                    </Link>

                    <button
                      className="button-anim"
                      style={{
                        ...styles.primaryBtn,
                        opacity: saving ? 0.75 : 1,
                        cursor: saving ? "not-allowed" : "pointer",
                      }}
                      disabled={saving}
                      type="submit"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="card" style={styles.sideCard}>
                <div style={styles.sideTitle}>Upgrade your account</div>
                <div className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                  Become a <b>Coach</b> or a <b>Club Manager</b> to unlock pro
                  tools. (We will add backend approval soon.)
                </div>

                <div style={styles.divider} />

                <div style={styles.upgradeList}>
                  <button
                    type="button"
                    className="button-anim"
                    style={styles.upgradeBtn}
                    onClick={() => requestUpgrade("coach")}
                  >
                    Upgrade to Coach
                  </button>

                  <button
                    type="button"
                    className="button-anim"
                    style={styles.upgradeBtn}
                    onClick={() => requestUpgrade("club-manager")}
                  >
                    Upgrade to Club Manager
                  </button>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div className="label">EMAIL (LOCKED)</div>
                  <div className="lockedBox">{me?.email}</div>
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
    maxWidth: "760px",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "18px",
    alignItems: "start",
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

  formCard: { padding: "22px" },
  sideCard: { padding: "22px" },
  sideTitle: { fontSize: 18, fontWeight: 900 },

  identityRow: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    minWidth: 0,
  },
  nameLine: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },
  nameText: {
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: "-0.2px",
  },
  emailLine: {
    marginTop: 6,
    fontSize: 14,
    overflowWrap: "anywhere",
  },

  divider: {
    height: 1,
    background: "rgba(212,175,55,0.14)",
    margin: "16px 0",
  },

  alertError: {
    marginTop: 10,
    borderRadius: 14,
    padding: "12px",
    background: "rgba(255, 75, 75, 0.08)",
    border: "1px solid rgba(255, 75, 75, 0.25)",
  },
  alertSuccess: {
    marginTop: 10,
    borderRadius: 14,
    padding: "12px",
    background: "rgba(60, 220, 140, 0.08)",
    border: "1px solid rgba(60, 220, 140, 0.25)",
  },

  actionsRow: {
    marginTop: 16,
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#D4AF37",
    color: "#000",
    fontWeight: 900,
    padding: "12px 14px",
    borderRadius: "10px",
    border: "none",
    minWidth: "160px",
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
    minWidth: "140px",
  },

  upgradeList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  upgradeBtn: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(212,175,55,0.08)",
    border: "1px solid rgba(212,175,55,0.25)",
    color: "#D4AF37",
    fontWeight: 900,
    cursor: "pointer",
  },
};
