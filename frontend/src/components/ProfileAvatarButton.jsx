import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

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

  const [imgOk, setImgOk] = useState(Boolean(src));

  return (
    <Link
      to="/profile"
      title={username}
      aria-label="Go to profile"
      style={{ ...styles.wrap, width: size, height: size, ...style }}
    >
      {src && imgOk ? (
        <img
          src={src}
          alt="profile"
          style={{ ...styles.img, width: size, height: size }}
          onError={() => setImgOk(false)}
        />
      ) : (
        <div style={{ ...styles.fallback, width: size, height: size }}>FF</div>
      )}
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
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform .2s ease, box-shadow .2s ease",
  },
  img: {
    objectFit: "cover",
    display: "block",
  },
  fallback: {
    display: "grid",
    placeItems: "center",
    color: "#D4AF37",
    fontWeight: 900,
    letterSpacing: "1px",
    background: "linear-gradient(145deg, rgba(18,18,18,0.95), rgba(8,8,8,0.95))",
  },
};
