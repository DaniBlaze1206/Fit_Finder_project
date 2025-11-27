import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import athleteHero from "../assets/ChatGPT Image Nov 27, 2025, 03_53_48 AM.png";

// Small hook to reveal elements on scroll
function useRevealOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el); // animate once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Wrapper component
function Reveal({ children, delay = 0 }) {
  const ref = useRevealOnScroll();
  return (
    <div
      ref={ref}
      className="reveal"
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>FITFINDER</div>

        <div style={styles.navLinks}>
          <a style={styles.navLink} className="nav-tab">
            Home
          </a>
          <a style={styles.navLink} className="nav-tab">
            About
          </a>
          <a style={styles.navLink} className="nav-tab">
            Services
          </a>
          <a style={styles.navLink} className="nav-tab">
            Contact
          </a>
        </div>

        <Link
          to="/register"
          style={styles.navButton}
          className="button-anim"
        >
          Get Started
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <Reveal>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              BUILD
              <br />
              STRENGTH
            </h1>

            <p style={styles.heroSubtitle}>
              Achieve your fitness goals with our state-of-the-art equipment and
              expert trainers.
            </p>

            <Link
              to="/register"
              style={styles.ctaButton}
              className="button-anim"
            >
              Get Started
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={styles.heroRight}>
           <img
				src={athleteHero}
				alt="athlete"
				style={styles.heroImage}
			/>

          </div>
        </Reveal>
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.featuresSection}>
        <Reveal>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💪</div>
            <h3 style={styles.featureTitle}>Top Notch Equipment</h3>
            <p style={styles.featureText}>
              Train with the latest and most advanced fitness equipment.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🏅</div>
            <h3 style={styles.featureTitle}>Expert Trainers</h3>
            <p style={styles.featureText}>
              Certified trainers ready to push and support you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔥</div>
            <h3 style={styles.featureTitle}>Results Driven</h3>
            <p style={styles.featureText}>
              Achieve real progress and long-term transformation.
            </p>
          </div>
        </Reveal>
      </section>

      {/* WHY CHOOSE US */}
      <section style={styles.whySection}>
        <Reveal>
          <h2 style={styles.whyTitle}>Why Choose Us</h2>
        </Reveal>
      </section>

      {/* Styles for animations & hover */}
      <style>{`
        /* Scroll-reveal base */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
          transition-delay: var(--reveal-delay, 0ms);
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Navbar tab shine */
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

        /* Button hover + shine */
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
            rgba(255,255,255,0.5),
            transparent
          );
          transform: skewX(-20deg);
        }
        .button-anim:hover::after {
          animation: shine 0.6s ease;
        }
        @keyframes shine {
          0% { left: -80%; }
          100% { left: 130%; }
        }
      `}</style>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0A0A0A",
    color: "white",
    // no overflow here – body handles scroll
  },

  /* NAVBAR */
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
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "500",
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
    padding: "90px 60px 60px 60px",
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
    color: "#FFFFFF",
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
    color: "#000",
    fontWeight: "700",
    textDecoration: "none",
    fontSize: "18px",
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
    justifyContent: "space-evenly",
    padding: "40px 20px",
    gap: "20px",
    backgroundColor: "#111",
    flexWrap: "wrap",
  },

  featureCard: {
    width: "280px",
    textAlign: "center",
    padding: "20px",
  },

  featureIcon: {
    fontSize: "40px",
    color: "#D4AF37",
    marginBottom: "12px",
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

  /* WHY SECTION */
  whySection: {
    padding: "80px 20px",
    textAlign: "center",
  },

  whyTitle: {
    fontSize: "34px",
    fontWeight: "800",
    color: "white",
  },
};
