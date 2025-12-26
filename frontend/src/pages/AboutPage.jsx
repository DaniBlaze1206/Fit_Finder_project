import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import ProfileAvatarButton from "../components/ProfileAvatarButton.jsx";

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

export default function AboutPage() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);

  return (
    <div style={styles.page}>
      {/* NAVBAR (same as your shared navbar) */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          FITFINDER
        </Link>

        <div style={styles.navLinks}>
          <Link to="/search" style={styles.navLink} className="nav-tab">
            Explore
          </Link>

          <Link to="/gyms" style={styles.navLink} className="nav-tab">
            Gyms
          </Link>

          <Link to="/coaches" style={styles.navLink} className="nav-tab">
            Coaches
          </Link>

          {/* Active underline handled by "active-tab" class for About */}
          <Link to="/about" style={styles.navLink} className="nav-tab active-tab">
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

      {/* HERO */}
      <section style={styles.hero}>
        <Reveal>
          <h1 style={styles.heroTitle}>About FitFinder</h1>
        </Reveal>

        <Reveal>
          <p style={styles.heroText}>
            FitFinder is built to connect people who want to train with the right gyms and coaches —
            while giving gym managers and coaches the tools to grow their business and manage their work.
          </p>
        </Reveal>

        <Reveal>
          <div style={styles.heroButtons}>
            <Link to="/search" className="button-anim" style={styles.primaryBtn}>
              Explore
            </Link>
            <Link to="/register" className="button-anim" style={styles.secondaryBtn}>
              Create Account
            </Link>
          </div>
        </Reveal>
      </section>

      {/* MISSION */}
      <section style={styles.section}>
        <Reveal>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
        </Reveal>
        <Reveal>
          <div className="card" style={styles.sectionCard}>
            <p style={styles.paragraph}>
              We want fitness to be simpler: discover the best places to train, book sessions fast,
              and build long-term progress. FitFinder brings search, booking, and management into one platform.
            </p>
          </div>
        </Reveal>
      </section>

      {/* WHO IT'S FOR */}
      <section style={styles.sectionAlt}>
        <Reveal>
          <h2 style={styles.sectionTitle}>Who We Serve</h2>
        </Reveal>

        <div style={styles.grid3} className="grid-3">
          <Reveal>
            <div className="card" style={styles.featureCard}>
              <div style={styles.icon}>👤</div>
              <h3 style={styles.cardTitle}>Users</h3>
              <p style={styles.cardText}>
                Search gyms and coaches, compare options, and book sessions quickly.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.featureCard}>
              <div style={styles.icon}>🏢</div>
              <h3 style={styles.cardTitle}>Gym Managers</h3>
              <p style={styles.cardText}>
                Showcase your gym, manage reservations, and grow your community.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.featureCard}>
              <div style={styles.icon}>🎯</div>
              <h3 style={styles.cardTitle}>Coaches</h3>
              <p style={styles.cardText}>
                Build your profile, attract clients, and manage your sessions with ease.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section style={styles.section}>
        <Reveal>
          <h2 style={styles.sectionTitle}>Contact</h2>
        </Reveal>

        <Reveal>
          <div className="card" style={styles.sectionCard}>
            <p style={styles.paragraph}>
              This is a student project version. If you want to add a contact form later, we can connect it
              to your backend JSON storage or an email service.
            </p>
            <div style={styles.contactRow}>
              <span style={styles.contactLabel}>Email:</span>
              <span style={styles.contactValue}>support@fitfinder.local</span>
            </div>
            <div style={styles.contactRow}>
              <span style={styles.contactLabel}>Location:</span>
              <span style={styles.contactValue}>Iran</span>
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
              <Link to="/" style={styles.footerLink}>Home</Link>
              <Link to="/search" style={styles.footerLink}>Users</Link>
              <Link to="/about" style={styles.footerLink}>About Us</Link>
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
        .nav-tab:hover {
          color: #D4AF37;
        }
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
        .nav-tab:hover::after {
          width: 100%;
        }
        /* ✅ active underline for About page */
        .active-tab {
          color: #D4AF37;
        }
        .active-tab::after {
          width: 100%;
        }

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
        .button-anim:hover::after {
          animation: shine-gold 0.6s ease;
        }
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
          .grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: { width: "100%", backgroundColor: "#0A0A0A", color: "white" },

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

  hero: { padding: "80px 20px 50px", textAlign: "center", backgroundColor: "#0D0D0D" },

  heroTitle: { fontSize: "54px", fontWeight: "900", marginBottom: "10px" },

  heroText: {
    maxWidth: "900px",
    margin: "0 auto 26px",
    color: "#CCCCCC",
    lineHeight: 1.7,
    fontSize: "16px",
  },

  heroButtons: { display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" },

  primaryBtn: {
    backgroundColor: "#D4AF37",
    padding: "12px 18px",
    borderRadius: "8px",
    fontWeight: "800",
    color: "#000",
    textDecoration: "none",
  },

  secondaryBtn: {
    backgroundColor: "transparent",
    padding: "12px 18px",
    borderRadius: "8px",
    fontWeight: "800",
    color: "#D4AF37",
    border: "1px solid rgba(212,175,55,0.45)",
    textDecoration: "none",
  },

  section: { padding: "70px 20px", textAlign: "center" },

  sectionAlt: { padding: "70px 20px", textAlign: "center", backgroundColor: "#111" },

  sectionTitle: { fontSize: "34px", fontWeight: "800", marginBottom: "30px" },

  sectionCard: {
    maxWidth: "980px",
    margin: "0 auto",
    padding: "22px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
    textAlign: "left",
  },

  paragraph: { margin: 0, color: "#CCCCCC", lineHeight: 1.8 },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 300px))",
    justifyContent: "center",
    gap: "25px",
    alignItems: "stretch",
  },

  featureCard: {
    padding: "26px",
    background: "linear-gradient(145deg, #0F0F0F, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
    textAlign: "center",
  },

  icon: { fontSize: "40px", marginBottom: "12px" },

  cardTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "10px", color: "#FFFFFF" },

  cardText: { fontSize: "15px", color: "#CCCCCC", lineHeight: 1.7 },

  contactRow: { display: "flex", gap: "10px", marginTop: "12px" },

  contactLabel: { color: "#888", minWidth: "80px" },

  contactValue: { color: "#D4AF37", fontWeight: "700" },

  footer: { backgroundColor: "#000", padding: "60px 40px 20px", marginTop: "20px" },

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

  footerLink: { color: "#CCCCCC", fontSize: "14px", display: "block", marginBottom: "8px", textDecoration: "none" },

  footerBottom: {
    borderTop: "1px solid rgba(212,175,55,0.25)",
    paddingTop: "15px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
