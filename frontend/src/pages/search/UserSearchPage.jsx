import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ProfileAvatarButton from "../../components/ProfileAvatarButton.jsx";

export default function UserSearchPage() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);

  // ✅ /search uses state-based tab (not URL-based)
  const [activeTab, setActiveTab] = useState("gyms"); // "gyms" | "coaches"

  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]); // gyms OR coaches
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // If your backend uses /api, change here once:
  const GYMS_ENDPOINT = `${API_BASE}/gyms`;
  const COACHES_ENDPOINT = `${API_BASE}/coaches`;

  function normalizeGym(raw) {
    return {
      id:
        raw?.id ??
        raw?._id ??
        raw?.gymId ??
        (crypto?.randomUUID ? crypto.randomUUID() : String(Math.random())),
      title: raw?.name ?? raw?.gymName ?? "Unnamed Gym",
      subtitle: raw?.city ?? raw?.location ?? "Unknown city",
      rating:
        typeof raw?.rating === "number"
          ? raw.rating
          : typeof raw?.avgRating === "number"
          ? raw.avgRating
          : null,
      tags: Array.isArray(raw?.tags) ? raw.tags : [],
      raw,
    };
  }

  function normalizeCoach(raw) {
    const first = raw?.firstName ?? raw?.firstname ?? "";
    const last = raw?.lastName ?? raw?.lastname ?? "";
    const fullName = (raw?.name ?? `${first} ${last}`)?.trim() || "Unnamed Coach";

    return {
      id:
        raw?.id ??
        raw?._id ??
        raw?.coachId ??
        (crypto?.randomUUID ? crypto.randomUUID() : String(Math.random())),
      title: fullName,
      subtitle: raw?.city ?? raw?.location ?? raw?.specialty ?? "Coach",
      rating:
        typeof raw?.rating === "number"
          ? raw.rating
          : typeof raw?.avgRating === "number"
          ? raw.avgRating
          : null,
      tags: Array.isArray(raw?.skills)
        ? raw.skills
        : Array.isArray(raw?.tags)
        ? raw.tags
        : raw?.specialties && Array.isArray(raw.specialties)
        ? raw.specialties
        : [],
      raw,
    };
  }

  function applyFilter(list) {
    const qLower = q.trim().toLowerCase();
    const cityLower = city.trim().toLowerCase();

    return list.filter((x) => {
      const titleOk = qLower ? x.title.toLowerCase().includes(qLower) : true;
      const cityOk = cityLower ? (x.subtitle || "").toLowerCase().includes(cityLower) : true;
      return titleOk && cityOk;
    });
  }

  async function fetchActiveTabData() {
    setLoading(true);
    setError("");

    try {
      const endpoint = activeTab === "gyms" ? GYMS_ENDPOINT : COACHES_ENDPOINT;

      const res = await fetch(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        throw new Error(`Failed to load ${activeTab} (${res.status})`);
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.items ?? data?.gyms ?? data?.coaches ?? [];

      const normalized =
        activeTab === "gyms" ? list.map(normalizeGym) : list.map(normalizeCoach);

      setItems(applyFilter(normalized));
    } catch (err) {
      console.error("Fetch failed:", err);

      // Fallback data so UI always works
      const fallbackGyms = [
        { id: 1, name: "Gold Flex Gym", city: "Tehran", rating: 4.7, tags: ["Weights", "Cardio"] },
        { id: 2, name: "Iron Core Studio", city: "Shiraz", rating: 4.4, tags: ["CrossFit", "HIIT"] },
        { id: 3, name: "Pulse Fitness Center", city: "Tabriz", rating: 4.8, tags: ["Classes", "Yoga"] },
      ].map(normalizeGym);

      const fallbackCoaches = [
        { id: 1, name: "Arman J.", city: "Tehran", rating: 4.9, skills: ["Strength", "Nutrition"] },
        { id: 2, name: "Sara K.", city: "Shiraz", rating: 4.6, skills: ["HIIT", "Mobility"] },
        { id: 3, name: "Nima R.", city: "Tabriz", rating: 4.7, skills: ["CrossFit", "Endurance"] },
      ].map(normalizeCoach);

      const fallback = activeTab === "gyms" ? fallbackGyms : fallbackCoaches;
      setItems(applyFilter(fallback));

      setError(
        err?.message
          ? `Backend error: ${err.message} — showing sample ${activeTab}.`
          : `Backend unavailable — showing sample ${activeTab}.`
      );
    } finally {
      setLoading(false);
    }
  }

  // ✅ Re-fetch when tab changes
  useEffect(() => {
    fetchActiveTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  function onSubmit(e) {
    e.preventDefault();
    fetchActiveTabData();
  }

  function goTab(tab) {
    // ✅ Stay on /search, just switch dataset
    setActiveTab(tab);
  }

  const heading = activeTab === "gyms" ? "Explore Gyms" : "Explore Coaches";
  const placeholder = activeTab === "gyms" ? "Gym name..." : "Coach name...";

  // If you DON'T have /coaches/:id route yet, set this to false for now.
  const HAS_COACH_DETAILS = false;

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          FITFINDER
        </Link>

        <div style={styles.navLinks}>
          <Link to="/search" style={styles.navLink} className="nav-tab">
            Explore
          </Link>
          <Link to="/about" style={styles.navLink} className="nav-tab">
            About
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

      {/* HEADER */}
      <section style={styles.header}>
        <h1 style={styles.title}>{heading}</h1>
        <p style={styles.subtitle}>
          Search by name and optionally filter by city. Switch tabs to browse both gyms and coaches.
        </p>

        {/* TABS */}
        <div style={styles.tabsWrap}>
          <button
            type="button"
            onClick={() => goTab("gyms")}
            className="tab-btn"
            style={{
              ...styles.tabBtn,
              ...(activeTab === "gyms" ? styles.tabBtnActive : {}),
            }}
          >
            Gyms
          </button>

          <button
            type="button"
            onClick={() => goTab("coaches")}
            className="tab-btn"
            style={{
              ...styles.tabBtn,
              ...(activeTab === "coaches" ? styles.tabBtnActive : {}),
            }}
          >
            Coaches
          </button>
        </div>

        {/* SEARCH FORM (NO hover on container) */}
        <form onSubmit={onSubmit} style={styles.searchCard}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            style={styles.input}
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City..."
            style={styles.input}
          />

          <button type="submit" className="button-anim" style={styles.searchButton}>
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            className="button-anim"
            style={styles.resetButton}
            onClick={() => {
              setQ("");
              setCity("");
              fetchActiveTabData();
            }}
            disabled={loading}
          >
            Reset
          </button>
        </form>

        {error ? <div style={styles.errorBox}>{error}</div> : null}
      </section>

      {/* RESULTS */}
      <section style={styles.resultsSection}>
        <div style={styles.grid}>
          {items.map((x) => {
            const to =
              activeTab === "gyms"
                ? `/gyms/${x.id}`
                : HAS_COACH_DETAILS
                ? `/coaches/${x.id}`
                : "/dashboard/coach";

            return (
              <Link key={x.id} to={to} className="card" style={styles.card}>
                <div style={styles.cardTop}>
                  <div style={styles.cardTitle}>{x.title}</div>
                  <div style={styles.rating}>{x.rating != null ? `⭐ ${x.rating}` : "—"}</div>
                </div>

                <div style={styles.metaRow}>
                  <span style={styles.metaLabel}>Info:</span>
                  <span style={styles.metaValue}>{x.subtitle}</span>
                </div>

                <div style={styles.tagsRow}>
                  {(x.tags || []).slice(0, 4).map((t) => (
                    <span key={t} style={styles.tag}>
                      {t}
                    </span>
                  ))}
                  {!x.tags?.length ? <span style={styles.tagMuted}>No tags</span> : null}
                </div>

                <div style={styles.cardHint}>View details →</div>
              </Link>
            );
          })}
        </div>

        {!loading && items.length === 0 ? (
          <div style={styles.empty}>No results found. Try another search.</div>
        ) : null}
      </section>

      <style>{sharedCss}</style>
    </div>
  );
}

const sharedCss = `
  .nav-tab {
    position: relative;
    transition: color 0.25s ease;
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
    text-decoration: none;
    color: inherit;
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

  navLinks: { display: "flex", gap: "30px" },

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

  header: { padding: "70px 20px 40px", backgroundColor: "#0D0D0D", textAlign: "center" },

  title: { fontSize: "42px", fontWeight: "900", marginBottom: "10px" },

  subtitle: {
    color: "#CCCCCC",
    fontSize: "16px",
    maxWidth: "820px",
    margin: "0 auto 18px",
    lineHeight: 1.6,
  },

  tabsWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "18px",
  },

  tabBtn: {
    backgroundColor: "transparent",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.16)",
    fontWeight: 900,
  },

  tabBtnActive: {
    color: "#000",
    backgroundColor: "#D4AF37",
    border: "1px solid rgba(212,175,55,0.55)",
  },

  searchCard: {
    maxWidth: "980px",
    margin: "0 auto",
    padding: "18px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
  },

  input: {
    minWidth: "240px",
    padding: "12px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(212,175,55,0.18)",
    backgroundColor: "#0A0A0A",
    color: "white",
    outline: "none",
  },

  searchButton: {
    backgroundColor: "#D4AF37",
    padding: "12px 18px",
    borderRadius: "8px",
    fontWeight: "800",
    color: "#000",
  },

  resetButton: {
    backgroundColor: "transparent",
    padding: "12px 18px",
    borderRadius: "8px",
    fontWeight: "800",
    color: "#D4AF37",
    border: "1px solid rgba(212,175,55,0.45)",
  },

  errorBox: {
    maxWidth: "980px",
    margin: "18px auto 0",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,120,120,0.35)",
    backgroundColor: "rgba(255,120,120,0.08)",
    color: "#ffb3b3",
    textAlign: "left",
  },

  resultsSection: { padding: "40px 20px 80px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 340px))",
    gap: "22px",
    justifyContent: "center",
  },

  card: {
    padding: "18px",
    borderRadius: "12px",
    background: "linear-gradient(145deg, #0F0F0F, #090909)",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
    minHeight: "160px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  cardTop: { display: "flex", justifyContent: "space-between", gap: "12px" },
  cardTitle: { fontSize: "18px", fontWeight: "900", color: "#FFFFFF" },
  rating: { color: "#D4AF37", fontWeight: "800" },

  metaRow: { display: "flex", gap: "8px", alignItems: "center" },
  metaLabel: { color: "#888", fontSize: "14px" },
  metaValue: { color: "#CCCCCC", fontSize: "14px" },

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

  cardHint: { marginTop: "auto", color: "#D4AF37", fontWeight: "800" },

  empty: { marginTop: "22px", textAlign: "center", color: "#AAAAAA" },
};
