import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import athleteHero from "../assets/ChatGPT Image Nov 27, 2025, 03_53_48 AM.png";
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

export default function LandingPage() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          FITFINDER
        </Link>

        <div style={styles.navLinks}>
          <NavLink
            to="/search"
            style={styles.navLink}
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
          >
            Explore
          </NavLink>

          <NavLink
            to="/gyms"
            style={styles.navLink}
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
          >
            Gyms
          </NavLink>

          <NavLink
            to="/coaches"
            style={styles.navLink}
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
          >
            Coaches
          </NavLink>

          <NavLink
            to="/about"
            style={styles.navLink}
            className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}
          >
            About
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
              CONNECT<br />
              TRAIN<br />
              GROW
            </h1>

            <p style={styles.heroSubtitle}>
              FitFinder connects users, coaches, and gyms through one powerful
              platform — discover gyms, find trainers, book sessions, and manage
              everything from one place.
            </p>

            <div style={styles.heroButtons}>
              <Link to="/register" className="button-anim" style={styles.ctaButton}>
                Get Started
              </Link>

              <Link to="/search" className="button-anim" style={styles.secondaryButton}>
                Explore
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={styles.heroRight}>
            <img src={athleteHero} alt="athlete" style={styles.heroImage} />
          </div>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section style={styles.featuresSection}>
        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🧭</div>
            <h3 style={styles.featureTitle}>Discover</h3>
            <p style={styles.featureText}>
              Find gyms and coaches in your city, compare ratings, and explore what fits your goals.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>📅</div>
            <h3 style={styles.featureTitle}>Book</h3>
            <p style={styles.featureText}>
              Reserve sessions and plans in a few clicks — no calls, no waiting, no confusion.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🚀</div>
            <h3 style={styles.featureTitle}>Grow</h3>
            <p style={styles.featureText}>
              Coaches and gym managers get tools to manage schedules, customers, and visibility.
            </p>
          </div>
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howSection}>
        <Reveal>
          <h2 style={styles.sectionTitle}>How FitFinder Works</h2>
        </Reveal>

        <div style={styles.howGrid}>
          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>1. Create an account</h3>
              <p style={styles.howText}>
                Everyone starts as a normal user. Later you can upgrade to Coach or Gym Manager.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>2. Explore options</h3>
              <p style={styles.howText}>
                Search gyms and coaches, read profiles, and pick what matches your needs.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>3. Connect & grow</h3>
              <p style={styles.howText}>
                Book sessions, manage your schedule, and build a stronger fitness journey.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AUDIENCE */}
      <section style={styles.audienceSection}>
        <Reveal>
          <h2 style={styles.sectionTitle}>Who Is FitFinder For?</h2>
        </Reveal>

        <div style={styles.audienceGrid} className="audience-grid">
          <Reveal>
            <div className="card" style={styles.audienceCard}>
              <h3 style={styles.audienceTitle}>Users</h3>
              <p style={styles.audienceText}>
                Find gyms, book sessions, explore programs, and track your journey.
              </p>
              <Link to="/search" className="button-anim" style={styles.smallCta}>
                Explore
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.audienceCard}>
              <h3 style={styles.audienceTitle}>Gym Managers</h3>
              <p style={styles.audienceText}>
                List your gym, manage reservations, and grow your community.
              </p>
              <Link to="/gyms" className="button-anim" style={styles.smallCta}>
                Gyms
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.audienceCard}>
              <h3 style={styles.audienceTitle}>Coaches</h3>
              <p style={styles.audienceText}>
                Build your profile, attract clients, and manage sessions easily.
              </p>
              <Link to="/coaches" className="button-anim" style={styles.smallCta}>
                Coaches
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={styles.ctaStrip}>
        <Reveal>
          <div className="card" style={styles.ctaStripCard}>
            <h2 style={styles.ctaStripTitle}>Start your fitness journey today</h2>
            <p style={styles.ctaStripText}>
              Whether you’re looking for a gym, training clients, or managing a facility — FitFinder gives you the tools to grow.
            </p>

            <div style={styles.ctaStripRow}>
              <Link to="/register" className="button-anim" style={styles.ctaButton}>
                Create Account
              </Link>

              <Link to="/search" className="button-anim" style={styles.secondaryButton}>
                Explore
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
              <Link to="/search" style={styles.footerLink}>Explore</Link>
              <Link to="/gyms" style={styles.footerLink}>For Gyms</Link>
              <Link to="/coaches" style={styles.footerLink}>For Coaches</Link>
              <Link to="/about" style={styles.footerLink}>About</Link>
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

  @media (max-width: 980px) {
    .audience-grid {
      grid-template-columns: repeat(1, minmax(0, 360px));
    }
  }
`;

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
  navLink: { fontSize: "16px", color: "white", textDecoration: "none" },
  navRight: { display: "flex", alignItems: "center", gap: "10px" },

  navButton: {
    backgroundColor: "#D4AF37",
    padding: "10px 22px",
    borderRadius: "6px",
    fontWeight: "700",
    color: "#000",
    textDecoration: "none",
  },

  heroSection: {
    display: "flex",
    padding: "90px 60px 60px",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "40px",
  },

  heroLeft: { maxWidth: "520px" },

  heroTitle: {
    fontSize: "72px",
    lineHeight: "1",
    fontWeight: "900",
    marginBottom: "18px",
  },

  heroSubtitle: { fontSize: "18px", color: "#CCCCCC", marginBottom: "26px", lineHeight: 1.7 },

  heroButtons: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" },

  ctaButton: {
    backgroundColor: "#D4AF37",
    padding: "14px 26px",
    borderRadius: "8px",
    fontWeight: "900",
    fontSize: "16px",
    color: "#000",
    textDecoration: "none",
  },

  secondaryButton: {
    backgroundColor: "transparent",
    padding: "14px 26px",
    borderRadius: "8px",
    fontWeight: "900",
    fontSize: "16px",
    color: "#D4AF37",
    textDecoration: "none",
    border: "1px solid rgba(212,175,55,0.45)",
  },

  heroRight: { maxWidth: "520px", width: "100%" },

  heroImage: {
    width: "100%",
    borderRadius: "12px",
    filter: "brightness(0.9)",
    objectFit: "cover",
  },

  featuresSection: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    gap: "25px",
    backgroundColor: "#111",
    flexWrap: "wrap",
  },

  featureCard: {
    width: "300px",
    padding: "26px",
    background: "linear-gradient(145deg, #0F0F0F, #0A0A0A)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    textAlign: "center",
  },

  featureIcon: { fontSize: "40px", marginBottom: "12px", color: "#D4AF37" },
  featureTitle: { fontSize: "22px", fontWeight: "800", marginBottom: "10px" },
  featureText: { fontSize: "15px", color: "#CCCCCC", lineHeight: 1.7 },

  howSection: { padding: "70px 20px", backgroundColor: "#0D0D0D", textAlign: "center" },
  sectionTitle: { fontSize: "34px", fontWeight: "900", marginBottom: "30px" },

  howGrid: { display: "flex", justifyContent: "center", gap: "25px", flexWrap: "wrap" },

  howCard: {
    width: "300px",
    padding: "24px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.15)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
    textAlign: "left",
  },

  howStep: { fontSize: "18px", fontWeight: "900", marginBottom: "8px", color: "#D4AF37" },
  howText: { fontSize: "14px", color: "#CCCCCC", lineHeight: 1.7 },

  audienceSection: { padding: "70px 20px", textAlign: "center" },

  audienceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 300px))",
    justifyContent: "center",
    gap: "25px",
    alignItems: "stretch",
  },

  audienceCard: {
    height: "100%",
    padding: "24px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.15)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
  },

  audienceTitle: { margin: 0, fontSize: "20px", fontWeight: 900, color: "#FFFFFF" },

  audienceText: {
    margin: 0,
    color: "#CCCCCC",
    lineHeight: 1.7,
    flex: 1,
  },

  smallCta: {
    marginTop: "10px",
    backgroundColor: "transparent",
    padding: "12px 14px",
    borderRadius: "10px",
    fontWeight: "900",
    color: "#D4AF37",
    textDecoration: "none",
    border: "1px solid rgba(212,175,55,0.45)",
    width: "fit-content",
  },

  ctaStrip: { padding: "60px 20px", textAlign: "center" },

  ctaStripCard: {
    maxWidth: "980px",
    margin: "0 auto",
    padding: "30px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "14px",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
  },

  ctaStripTitle: { fontSize: "30px", fontWeight: "900", marginBottom: "10px" },
  ctaStripText: { color: "#CCCCCC", lineHeight: 1.7, maxWidth: "800px", margin: "0 auto 18px" },

  ctaStripRow: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },

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

  footerLink: { color: "#CCCCCC", fontSize: "14px", display: "block", marginBottom: "8px", textDecoration: "none" },

  footerBottom: {
    borderTop: "1px solid rgba(212,175,55,0.25)",
    paddingTop: "15px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
