import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
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

export default function GymOwnerLandingPage() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);

  return (
    <div style={styles.page}>
      {/* NAVBAR (same tags; underline shows current page) */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          FITFINDER
        </Link>

        <div style={styles.navLinks}>
          <NavLink
            to="/search"
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
            style={styles.navLink}
          >
            Explore
          </NavLink>

          <NavLink
            to="/gyms"
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
            style={styles.navLink}
          >
            Gyms
          </NavLink>

          <NavLink
            to="/coaches"
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
            style={styles.navLink}
          >
            Coaches
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
            style={styles.navLink}
          >
            About Us
          </NavLink>
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

      {/* HERO */}
      <section style={styles.heroSection}>
        <Reveal>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              LIST
              <br />
              YOUR GYM
              <br />
              GROW
            </h1>

            <p style={styles.heroSubtitle}>
              Bring your gym online. Accept reservations, manage schedules, and
              attract more members — all with FitFinder’s manager tools.
            </p>

            <div style={styles.heroCtas}>
              <Link to="/register" className="button-anim" style={styles.primaryCta}>
                Become a Manager
              </Link>

              <Link to="/login" className="button-anim" style={styles.secondaryCta}>
                Manager Login
              </Link>
            </div>

            <div style={styles.note}>
              Already a manager? After login, you’ll be redirected to your dashboard automatically.
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={styles.heroRight}>
            <div className="card" style={styles.heroCard}>
              <div style={styles.heroCardTitle}>What you get</div>

              <div style={styles.bulletRow}>
                <span style={styles.bulletIcon}>✅</span>
                <span>Gym profile page with photos & details</span>
              </div>

              <div style={styles.bulletRow}>
                <span style={styles.bulletIcon}>✅</span>
                <span>Reservation management (coming from your backend)</span>
              </div>

              <div style={styles.bulletRow}>
                <span style={styles.bulletIcon}>✅</span>
                <span>Visibility to users searching in your city</span>
              </div>

              <div style={styles.bulletRow}>
                <span style={styles.bulletIcon}>✅</span>
                <span>Simple tools — no database needed yet (JSON storage)</span>
              </div>

              <Link to="/register" className="button-anim" style={styles.cardCta}>
                Start Setup
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEATURES (equal-height cards) */}
      <section style={styles.featuresSection}>
        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🏢</div>
            <h3 style={styles.featureTitle}>Showcase Your Gym</h3>
            <p style={styles.featureText}>
              Add gym details, services, and pricing so users can choose confidently.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>📅</div>
            <h3 style={styles.featureTitle}>Manage Reservations</h3>
            <p style={styles.featureText}>
              Review bookings, approve requests, and organize your daily schedule.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>📈</div>
            <h3 style={styles.featureTitle}>Grow Your Community</h3>
            <p style={styles.featureText}>
              Reach more people searching for gyms and build long-term members.
            </p>
          </div>
        </Reveal>
      </section>

      {/* HOW IT WORKS (equal-height cards) */}
      <section style={styles.howSection}>
        <Reveal>
          <h2 style={styles.sectionTitle}>How It Works</h2>
        </Reveal>

        <div style={styles.howGrid}>
          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>1. Register</h3>
              <p style={styles.howText}>
                Create an account. Start as a normal user, then upgrade to manager in your dashboard.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>2. Add Your Gym</h3>
              <p style={styles.howText}>
                Create your gym listing: name, city, services, photos, and basic info.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>3. Manage & Grow</h3>
              <p style={styles.howText}>
                Accept reservations, update details, and grow your gym’s visibility.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <Reveal>
          <div className="card" style={styles.ctaCard}>
            <h2 style={styles.ctaTitle}>Ready to list your gym?</h2>
            <p style={styles.ctaText}>
              Upgrade to a manager account and start setting up your gym profile in minutes.
            </p>

            <div style={styles.ctaRow}>
              <Link to="/register" className="button-anim" style={styles.primaryCta}>
                Get Started
              </Link>
              <Link to="/search" className="button-anim" style={styles.secondaryCta}>
                Explore as User
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <Reveal>
          <div style={styles.footerTop}>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>FitFinder</h3>
              <p style={styles.footerText}>
                Connecting users, coaches, and gyms through innovation.
              </p>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerSubTitle}>Explore</h4>
              <Link to="/search" style={styles.footerLink}>
                Users
              </Link>
              <Link to="/gyms" style={styles.footerLink}>
                For Gym Managers
              </Link>
              <Link to="/coaches" style={styles.footerLink}>
                For Coaches
              </Link>
              <Link to="/about" style={styles.footerLink}>
                About Us
              </Link>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerSubTitle}>Support</h4>
              <span style={styles.footerLink}>Help Center</span>
              <span style={styles.footerLink}>Terms of Use</span>
              <span style={styles.footerLink}>Privacy Policy</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={styles.footerBottom}>
            © {new Date().getFullYear()} FitFinder — All Rights Reserved.
          </div>
        </Reveal>
      </footer>

      <style>{`
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
        @keyframes shine-gold {
          0% { left: -80%; }
          100% { left: 130%; }
        }

        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 25px rgba(212,175,55,0.25);
        }

        @media (max-width: 980px) {
          .how-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* -------------------- STYLES -------------------- */
const styles = {
  page: { width: "100%", backgroundColor: "#0A0A0A", color: "white" },

  navbar: {
    width: "100%",
    padding: "20px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
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

  heroSection: {
    display: "flex",
    padding: "90px 60px 60px",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "28px",
  },

  heroLeft: { maxWidth: "560px", marginBottom: "10px" },

  heroTitle: {
    fontSize: "72px",
    lineHeight: "1",
    fontWeight: "900",
    marginBottom: "18px",
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#CCCCCC",
    marginBottom: "18px",
    lineHeight: 1.7,
  },

  heroCtas: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" },

  primaryCta: {
    backgroundColor: "#D4AF37",
    padding: "14px 22px",
    borderRadius: "8px",
    fontWeight: "800",
    fontSize: "16px",
    color: "#000",
    textDecoration: "none",
  },

  secondaryCta: {
    backgroundColor: "transparent",
    padding: "14px 22px",
    borderRadius: "8px",
    fontWeight: "800",
    fontSize: "16px",
    color: "#D4AF37",
    textDecoration: "none",
    border: "1px solid rgba(212, 175, 55, 0.45)",
  },

  note: { marginTop: "14px", color: "#999", fontSize: "13px", lineHeight: 1.5 },

  heroRight: { maxWidth: "460px", width: "100%" },

  heroCard: {
    padding: "22px",
    minHeight: "320px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "14px",
    border: "1px solid rgba(212, 175, 55, 0.18)",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  heroCardTitle: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#D4AF37",
    marginBottom: "6px",
  },

  bulletRow: { display: "flex", gap: "10px", alignItems: "flex-start", color: "#DDD", lineHeight: 1.6 },

  bulletIcon: { color: "#D4AF37", fontWeight: 900 },

  cardCta: {
    marginTop: "auto",
    backgroundColor: "#D4AF37",
    padding: "12px 14px",
    borderRadius: "10px",
    fontWeight: "900",
    color: "#000",
    textDecoration: "none",
    width: "100%",
  },

  featuresSection: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    gap: "25px",
    backgroundColor: "#111",
    flexWrap: "wrap",
    alignItems: "stretch",
  },

  featureCard: {
    width: "300px",
    minHeight: "240px",
    padding: "26px",
    background: "linear-gradient(145deg, #0F0F0F, #0A0A0A)",
    borderRadius: "12px",
    border: "1px solid rgba(212, 175, 55, 0.18)",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },

  featureIcon: { fontSize: "40px", marginBottom: "12px" },

  featureTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "10px" },

  featureText: { fontSize: "15px", color: "#CCCCCC", lineHeight: 1.7, marginBottom: "auto" },

  howSection: { padding: "70px 20px", backgroundColor: "#0D0D0D", textAlign: "center" },

  sectionTitle: { fontSize: "34px", fontWeight: "900", marginBottom: "30px" },

  howGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    alignItems: "stretch",
  },

  howCard: {
    width: "300px",
    minHeight: "170px",
    padding: "24px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212, 175, 55, 0.15)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
  },

  howStep: { fontSize: "18px", fontWeight: "900", marginBottom: "8px", color: "#D4AF37" },

  howText: { fontSize: "14px", color: "#CCCCCC", lineHeight: 1.7, marginBottom: "auto" },

  ctaSection: { padding: "70px 20px", textAlign: "center" },

  ctaCard: {
    maxWidth: "980px",
    margin: "0 auto",
    padding: "28px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "14px",
    border: "1px solid rgba(212, 175, 55, 0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
  },

  ctaTitle: { fontSize: "30px", fontWeight: "900", marginBottom: "10px" },

  ctaText: { color: "#CCCCCC", maxWidth: "760px", margin: "0 auto 18px", lineHeight: 1.7 },

  ctaRow: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },

  footer: { backgroundColor: "#000", padding: "60px 40px 20px", marginTop: "30px" },

  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
    marginBottom: "30px",
  },

  footerColumn: { maxWidth: "250px" },

  footerTitle: { fontSize: "24px", fontWeight: "800", color: "#D4AF37", marginBottom: "12px" },

  footerSubTitle: { fontSize: "18px", fontWeight: "700", color: "#D4AF37", marginBottom: "10px" },

  footerText: { color: "#CCCCCC", fontSize: "14px", marginBottom: "10px" },

  footerLink: {
    color: "#CCCCCC",
    fontSize: "14px",
    display: "block",
    marginBottom: "8px",
    textDecoration: "none",
  },

  footerBottom: {
    borderTop: "1px solid rgba(212, 175, 55, 0.25)",
    paddingTop: "15px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
