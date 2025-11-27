import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import athleteHero from "../assets/ChatGPT Image Nov 27, 2025, 03_53_48 AM.png";

/* -------------------- REVEAL ANIMATION (FIXED) -------------------- */
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

/* -------------------- LANDING PAGE -------------------- */
export default function LandingPage() {
  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>FITFINDER</div>

        <div style={styles.navLinks}>
          <a style={styles.navLink} className="nav-tab">Home</a>
          <a style={styles.navLink} className="nav-tab">How It Works</a>
          <a style={styles.navLink} className="nav-tab">For Gyms</a>
          <a style={styles.navLink} className="nav-tab">For Coaches</a>
        </div>

        <Link to="/register" style={styles.navButton} className="button-anim">
          Get Started
        </Link>
      </nav>

      {/* HERO SECTION */}
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
              platform—book sessions, find trainers, manage gyms, and grow your
              fitness journey.
            </p>

            <Link to="/register" style={styles.ctaButton} className="button-anim">
              Join FitFinder
            </Link>
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
            <h3 style={styles.featureTitle}>Find Gyms & Coaches</h3>
            <p style={styles.featureText}>
              Search nearby gyms, compare trainers, explore classes,
              and book instantly.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Grow as a Coach</h3>
            <p style={styles.featureText}>
              Build your coaching profile, attract new clients,
              and manage sessions easily.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🏢</div>
            <h3 style={styles.featureTitle}>Manage Your Gym</h3>
            <p style={styles.featureText}>
              Showcase your gym, manage reservations, and grow your
              community with modern tools.
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
              <h3 style={styles.howStep}>1. Sign Up</h3>
              <p style={styles.howText}>
                Create your account as a user, coach, or gym owner and set up your profile.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>2. Connect</h3>
              <p style={styles.howText}>
                Explore gyms, find clients, or manage your fitness facility from one dashboard.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.howCard}>
              <h3 style={styles.howStep}>3. Grow</h3>
              <p style={styles.howText}>
                Book sessions, train smarter, build your network, and track your success.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY FITFINDER */}
      <section style={styles.whySection}>
        <Reveal>
          <h2 style={styles.sectionTitle}>Why Choose FitFinder?</h2>
        </Reveal>

        <div style={styles.whyGrid}>
          <Reveal>
            <div className="card" style={styles.whyCard}>
              <h3 style={styles.whyCardTitle}>All-in-One Platform</h3>
              <p>
                Users, coaches, gyms—everything you need in one place.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.whyCard}>
              <h3 style={styles.whyCardTitle}>Verified Community</h3>
              <p>
                Authentic profiles, trusted reviews, and real professionals.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.whyCard}>
              <h3 style={styles.whyCardTitle}>Smart Tools</h3>
              <p>
                Modern tools designed to elevate your training or business.
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

        <div style={styles.audienceGrid}>
          <Reveal>
            <div className="card" style={styles.audienceCard}>
              <h3>Users</h3>
              <p>Find gyms, book sessions, and start your fitness journey.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.audienceCard}>
              <h3>Coaches</h3>
              <p>Grow your business and manage your clients seamlessly.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card" style={styles.audienceCard}>
              <h3>Gyms</h3>
              <p>Increase visibility, manage bookings, and attract new members.</p>
            </div>
          </Reveal>
        </div>
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
              <a style={styles.footerLink}>Home</a>
              <a style={styles.footerLink}>For Gyms</a>
              <a style={styles.footerLink}>For Coaches</a>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerSubTitle}>Support</h4>
              <a style={styles.footerLink}>Help Center</a>
              <a style={styles.footerLink}>Terms of Use</a>
              <a style={styles.footerLink}>Privacy Policy</a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={styles.footerBottom}>
            © {new Date().getFullYear()} FitFinder — All Rights Reserved.
          </div>
        </Reveal>
      </footer>

      {/* FIXED STYLES */}
      <style>{`
        /* REVEAL (GPU OPTIMIZED) */
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

        /* NAV HOVER */
        .nav-tab {
          position: relative;
          transition: color 0.25s ease;
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

        /* ⭐ PREMIUM GOLD BUTTON HOVER — FIXED */
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
            rgba(255,255,255,0.55),
            transparent
          );
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

        /* CARD HOVER */
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 25px rgba(212,175,55,0.25);
        }
      `}</style>

    </div>
  );
}

/* -------------------- MAIN STYLES -------------------- */
const styles = {
  page: {
    width: "100%",
    backgroundColor: "#0A0A0A",
    color: "white",
  },

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
  },

  navLinks: {
    display: "flex",
    gap: "30px",
  },

  navLink: {
    fontSize: "16px",
    color: "white",
    cursor: "pointer",
    textDecoration: "none",
  },

  navButton: {
    backgroundColor: "#D4AF37",
    padding: "10px 22px",
    borderRadius: "6px",
    fontWeight: "600",
    color: "#000",
    textDecoration: "none",
  },

  /* HERO */
  heroSection: {
    display: "flex",
    padding: "90px 60px 60px",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  heroLeft: {
    maxWidth: "480px",
    marginBottom: "40px",
  },

  heroTitle: {
    fontSize: "72px",
    lineHeight: "1",
    fontWeight: "900",
    marginBottom: "18px",
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#CCCCCC",
    marginBottom: "28px",
  },

  ctaButton: {
    backgroundColor: "#D4AF37",
    padding: "14px 26px",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "18px",
    color: "#000",
    textDecoration: "none",
  },

  heroRight: {
    maxWidth: "480px",
  },

  heroImage: {
    width: "100%",
    borderRadius: "10px",
    filter: "brightness(0.85)",
    objectFit: "cover",
  },

  /* FEATURES */
  featuresSection: {
    marginTop: "40px",
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

  featureIcon: {
    fontSize: "40px",
    marginBottom: "12px",
    color: "#D4AF37",
  },

  featureTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  featureText: {
    fontSize: "16px",
    color: "#CCCCCC",
  },

  /* HOW SECTION */
  howSection: {
    padding: "70px 20px",
    backgroundColor: "#0D0D0D",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "30px",
  },

  howGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  howCard: {
    width: "300px",
    padding: "24px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.15)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
  },

  howStep: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#D4AF37",
  },

  howText: {
    fontSize: "15px",
    color: "#CCCCCC",
  },

  /* WHY */
  whySection: {
    padding: "70px 20px",
    backgroundColor: "#111",
    textAlign: "center",
  },

  whyGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  whyCard: {
    width: "300px",
    padding: "26px",
    background: "linear-gradient(145deg, #0F0F0F, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.18)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
  },

  whyCardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#D4AF37",
  },

  /* AUDIENCE */
  audienceSection: {
    padding: "70px 20px",
    textAlign: "center",
  },

  audienceGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  audienceCard: {
    width: "300px",
    padding: "24px",
    background: "linear-gradient(145deg, #111, #090909)",
    borderRadius: "12px",
    border: "1px solid rgba(212,175,55,0.15)",
    boxShadow: "0 0 18px rgba(0,0,0,0.45)",
  },

  /* FOOTER */
  footer: {
    backgroundColor: "#000",
    padding: "60px 40px 20px",
    marginTop: "40px",
  },

  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
    marginBottom: "30px",
  },

  footerColumn: {
    maxWidth: "250px",
  },

  footerTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#D4AF37",
    marginBottom: "12px",
  },

  footerSubTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#D4AF37",
    marginBottom: "10px",
  },

  footerText: {
    color: "#CCCCCC",
    fontSize: "14px",
    marginBottom: "10px",
  },

  footerLink: {
    color: "#CCCCCC",
    fontSize: "14px",
    display: "block",
    marginBottom: "8px",
  },

  footerBottom: {
    borderTop: "1px solid rgba(212,175,55,0.25)",
    paddingTop: "15px",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};
