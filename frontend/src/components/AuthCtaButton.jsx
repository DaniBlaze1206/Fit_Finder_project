import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function ProfileAvatarButton({ size = 38, style = {} }) {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const src = user?.profilePicUrl || "";
  const username = user?.username || "User";

  // simple fallback initials: "FF"
  const fallbackText = "FF";

  return (
    <Link to="/profile" style={{ ...styles.wrap, width: size, height: size, ...style }} title={username}>
      {src ? (
        <img
          src={src}
          alt="profile"
          style={{ ...styles.img, width: size, height: size }}
          onError={(e) => {
            // If image fails (bad URL), fallback to initials
            e.currentTarget.style.display = "none";
            const parent = e.currentTarget.parentElement;
            if (parent) parent.dataset.broken = "1";
          }}
        />
      ) : null}

      {/* Fallback circle */}
      <div style={{ ...styles.fallback, width: size, height: size }}>
        {fallbackText}
      </div>

      <style>{`
        a[data-broken="1"] img { display: none !important; }
        a[data-broken="1"] div { display: grid !important; }
      `}</style>
    </Link>
  );
}

const styles = {
  wrap: {
    position: "relative",
    display: "inline-grid",
    placeItems: "center",
    borderRadius: "999px",
    overflow: "hidden",
    border: "1px solid rgba(212,175,55,0.35)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 0 0 rgba(212,175,55,0)",
    transition: "transform .2s ease, box-shadow .2s ease",
    textDecoration: "none",
  },
  img: {
    objectFit: "cover",
    display: "block",
  },
  fallback: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    color: "#D4AF37",
    fontWeight: 900,
    letterSpacing: "1px",
    background: "linear-gradient(145deg, rgba(18,18,18,0.95), rgba(8,8,8,0.95))",
  },
};