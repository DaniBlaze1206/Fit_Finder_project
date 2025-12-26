import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import ProfileAvatarButton from "../../components/ProfileAvatarButton.jsx";

/* -------------------- REVEAL ANIMATION -------------------- */
function Reveal({ children }) {
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
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

export default function CoachDetailsPage() {
  const { id } = useParams();

  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);

  const [loading, setLoading] = useState(true);
  const [coach, setCoach] = useState(null);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const COACHES_ENDPOINT = `${API_BASE}/coaches`;

  function normalizeCoach(raw) {
    const first = raw?.firstName ?? raw?.firstname ?? "";
    const last = raw?.lastName ?? raw?.lastname ?? "";
    const fullName = (raw?.name ?? `${first} ${last}`)?.trim() || "Unnamed Coach";

    return {
      id: raw?.id ?? raw?._id ?? raw?.coachId ?? id,
      name: fullName,
      city: raw?.city ?? raw?.location ?? "Unknown city",
      rating:
        typeof raw?.rating === "number"
          ? raw.rating
          : typeof raw?.avgRating === "number"
          ? raw.avgRating
          : null,
      bio:
        raw?.bio ??
        "This coach hasn’t added a bio yet. FitFinder helps coaches build their profile and attract new clients.",
      specialties: Array.isArray(raw?.skills)
        ? raw.skills
        : Array.isArray(raw?.specialties)
        ? raw.specialties
        : Array.isArray(raw?.tags)
        ? raw.tags
        : [],
      price: raw?.price ?? raw?.sessionPrice ?? null,
      experience: raw?.experience ?? raw?.yearsExperience ?? null,
      raw,
    };
  }

  async function fetchCoach() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${COACHES_ENDPOINT}/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error(`Failed to load coach (${res.status})`);

      const data = await res.json();
      setCoach(normalizeCoach(data));
    } catch (err) {
      console.error("Coach fetch failed:", err);

      // fallback sample coach so UI always works
      const fallback = normalizeCoach({
        id,
        name: "Sample Coach",
        city: "Tehran",
        rating: 4.8,
        bio: "This is sample data because the backend coach endpoint is unavailable.",
        skills: ["Strength", "Nutrition", "HIIT", "Mobility"],
        sessionPrice: 25,
        yearsExperience: 5,
      });

      setCoach(fallback);
      setError(
        err?.message
          ? `Backend error: ${err.message} — showing sample coach.`
          : "Backend unavailable — showing sample coach."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoach();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div style={styles.page}>
      {/* NAVBAR (same style as other pages) */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          FITFINDER
        </Link>

        <div style={styles.navLinks}>
          <Link to="/search" style={styles.navLink} className="nav-tab">
            Users
          </Link>

          <Link to="/gyms" style={styles.navLink} className="nav-tab">
            For Gym Managers
          </Link>

          <Link to="/coaches" style={styles.navLink} className="nav-tab active">
            For Coaches
          </Link>

          <Link to="/about" style={styles.navLink} className="nav-tab">
            About Us
          </Link>
        </div>

        <div style={styles.navRight}>
          {isLoggedIn ? (
            <ProfileAvatarButton size={40} />
          ) : (
            <Link to="/register" className="button-anim" style={styles.navButton}>
              Get Started
            </Link>
          )}
        </div>
      </nav>

      {/* CONTENT */}
      <section style={styles.section}>
        <Reveal>
          <div style={styles.header}>
            <Link to="/search" style={styles.backLink} className="nav-tab">
              ← Back to Explore
            </Link>

            <h1 style={styles.title}>
              {loading ? "Loading coach..." : coach?.name || "Coach"}
            </h1>

            {coach ? (
              <p style={styles.subtitle}>
                {coach.city} •{" "}
                {coach.rating != null ? (
                  <span style={{ color: "#D4AF37", fontWeight: 900 }}>
                    ⭐ {coach.rating}
                  </span>
                ) : (
                  "No rating"
                )}
              </p>
            ) : null}
          </div>
        </Reveal>

        {error ? (
          <Reveal>
            <div style={styles.errorBox}>{error}</div>
          </Reveal>
        ) : null}

        {!loading && coach ? (
          <div style={styles.grid}>
            {/* LEFT CARD */}
            <Reveal>
              <div className="card" style={styles.card}>
                <h2 style={styles.cardTitle}>About</h2>
                <p style={styles.text}>{coach.bio}</p>

                <div style={styles.row}>
                  <div style={styles.kpiBox}>
                    <div style={styles.kpiLabel}>Experience</div>
                    <div style={styles.kpiValue}>
                      {coach.experience != null ? `${coach.experience} yrs` : "—"}
                    </div>
                  </div>

                  <div style={styles.kpiBox}>
                    <div style={styles.kpiLabel}>Session Price</div>
                    <div style={styles.kpiValue}>
                      {coach.price != null ? `$${coach.price}` : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT CARD */}
            <Reveal>
              <div className="card" style={styles.card}>
                <h2 style={styles.cardTitle}>Specialties</h2>

                <div style={styles.tagsRow}>
                  {coach.specialties?.length ? (
                    coach.specialties.slice(0, 12).map((t) => (
                      <span key={t} style={styles.tag}>
                        {t}
                      </span>
                    ))
                  ) : (
                    <span style={styles.tagMuted}>No specialties yet</span>
                  )}
                </div>

                <div style={styles.actions}>
                  <Link to="/login" className="button-anim" style={styles.primaryBtn}>
                    Book a Session
                  </Link>

                  <Link to="/register" className="button-anim" style={styles.secondaryBtn}>
                    Create Account
                  </Link>
                </div>

                <div style={styles.note}>
                  Booking will be enabled after we connect coach scheduling + reservations.
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          <Reveal>
            <div style={styles.loadingBox}>
              {loading ? "Loading..." : "Coach not found."}
            </div>
          </Reveal>
        )}
      </section>

      <style>{sharedCss}</style>
    </div>
  );
}

const sharedCss = `
  .reveal {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
    will-change: opacity, transform;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .reveal-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .nav-tab {
    position: relative;
    transition: color 0.25s ease;
    text-decoration: none;
  }
  .nav-tab:hover { color: #D4AF37; }
  .nav-tab::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #D4AF37;
    transition: width 0.25s ease;
  }
  .nav-tab:hover::after { width: 100%; }
  .nav-tab.active { color: #D4AF37; }
  .nav-tab.active::after { width: 100%; }

  .button-anim {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    transform: translateZ(0);
    white-space: nowrap;
    border: none;
    cursor: pointer;
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
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
    transform: skewX(-20deg);
    pointer-events: none;
  }
  .button-anim:hover::after { animation: shine-gold 0.6s ease; }
  @keyframes shine-gold { 0% { left: -80%; } 100% { left: 130%; } }

  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgba(212,175,55,0.25);
  }
`;

const styles = {
  page: { width: "100%", backgroundColor: "#0A0A0A", color: "white", minHeight: "100vh" },

  navbar: {
    width: "100%",
    padding: "20px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    borderBottom: "1px solid rgba(212,175,55,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  logo: {
    fontSize: "26px",
    fontWeight: "900",
    color: "#D4AF37",
    letterSpacing: "2px",
    textDecoration: "none",
  },

  navLinks: { display: "flex", gap: "30px", flexWrap: "wrap" },

  navLink: {
    fontSize: "16px",
    color: "white",
    cursor: "pointer",
    textDecoration: "none",
  },

  navRight: { display: "flex", alignItems: "center", gap: "10px" },

  navButton: {
    backgroundColor: "#D4AF37",
    padding: "10px 22px",
    borderRadius: "6px",
    fontWeight: "600",
    color: "#000",
    textDecoration: "none",
  },

  section: { padding: "70px 20px 90px", backgroundColor: "#0D0D0D" },

  header: { maxWidth: "980px", margin: "0 auto 22px", textAlign: "center" },

  backLink: { display: "inline-block", marginBottom: "16px", color: "#CCC" },

  title: { fontSize: "46px", fontWeight: "900", marginBottom: "6px" },

  subtitle: { color: "#CCCCCC", fontSize: "16px", margin: 0 },

  errorBox: {
    maxWidth: "980px",
    margin: "0 auto 18px",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,120,120,0.35)",
    backgroundColor: "rgba(255,120,120,0.08)",
    color: "#ffb3b3",
    textAlign: "left",
  },

  grid: {
    maxWidth: "980px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
    alignItems: "stretch",
  },

  card: {
    padding: "22px",
    borderRadius: "12px",
    background: "linear-gradient(145deg, #0F0F0F, #090909)",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minHeight: "280px",
  },

  cardTitle: { fontSize: "20px", fontWeight: "900", color: "#D4AF37", margin: 0 },

  text: { color: "#CCCCCC", lineHeight: 1.8, margin: 0, fontSize: "15px" },

  row: { display: "flex", gap: "12px", flexWrap: "wrap" },

  kpiBox: {
    flex: 1,
    minWidth: "160px",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  kpiLabel: { color: "#999", fontSize: "12px", fontWeight: 700, marginBottom: "4px" },

  kpiValue: { color: "white", fontSize: "18px", fontWeight: 900 },

  tagsRow: { display: "flex", gap: "8px", flexWrap: "wrap" },

  tag: {
    fontSize: "12px",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(212,175,55,0.25)",
    color: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.06)",
  },

  tagMuted: {
    fontSize: "12px",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#AAA",
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  actions: {
    marginTop: "auto",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    backgroundColor: "#D4AF37",
    padding: "12px 16px",
    borderRadius: "10px",
    fontWeight: "900",
    color: "#000",
    textDecoration: "none",
  },

  secondaryBtn: {
    backgroundColor: "transparent",
    padding: "12px 16px",
    borderRadius: "10px",
    fontWeight: "900",
    color: "#D4AF37",
    textDecoration: "none",
    border: "1px solid rgba(212,175,55,0.45)",
  },

  note: { color: "#999", fontSize: "13px", lineHeight: 1.5 },

  loadingBox: {
    maxWidth: "980px",
    margin: "24px auto 0",
    padding: "18px",
    textAlign: "center",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#CCC",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
};
