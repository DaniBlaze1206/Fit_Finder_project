import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";

export default function DashboardRouterPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: true, message: "Checking your account..." });

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        setStatus({ loading: true, message: "Verifying your session..." });

        const res = await fetch(`${API_BASE}/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // Token invalid/expired or server says no
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        const me = await res.json();
        localStorage.setItem("user", JSON.stringify(me));

        const role = (me.role || "").toLowerCase();

        // Your backend roles: user, coach, club-manager, admin
        if (role === "admin") return navigate("/dashboard/admin", { replace: true });
        if (role === "coach") return navigate("/dashboard/coach", { replace: true });
        if (role === "club-manager") return navigate("/dashboard/manager", { replace: true });
        return navigate("/dashboard/user", { replace: true });
      } catch (err) {
        console.error("DashboardRouter error:", err);
        setStatus({ loading: false, message: "Connection error. Please try again." });
      }
    };

    run();
  }, [navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card} className="lux-card">
        <div style={styles.logo}>FITFINDER</div>
        <div style={styles.title}>{status.loading ? "Loading" : "Oops"}</div>
        <div style={styles.text}>{status.message}</div>

        {!status.loading && (
          <button
            className="button-anim"
            style={styles.button}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        )}
      </div>

      <style>{`
        .lux-card{
          position: relative;
          border-radius: 16px;
          border: 1px solid rgba(212,175,55,0.18);
          background: linear-gradient(145deg, rgba(15,15,15,0.92), rgba(0,0,0,0.92));
          box-shadow: 0 25px 80px rgba(0,0,0,0.55);
          overflow: hidden;
        }

        .lux-card::before{
          content:"";
          position:absolute;
          inset:-2px;
          background: radial-gradient(circle at 20% 20%, rgba(212,175,55,0.12), transparent 50%),
                      radial-gradient(circle at 80% 60%, rgba(255,255,255,0.06), transparent 55%);
          pointer-events:none;
        }

        .button-anim{
          position: relative;
          display: inline-block;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .button-anim:hover{
          transform: translateY(-2px);
          box-shadow: 0 0 12px rgba(212,175,55,0.45);
        }
        .button-anim::after{
          content:"";
          position:absolute;
          top:0;
          left:-80%;
          width:50%;
          height:100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          pointer-events:none;
        }
        .button-anim:hover::after{
          animation: shine-gold 0.6s ease;
        }
        @keyframes shine-gold{
          0%{ left:-80%; }
          100%{ left:130%; }
        }

        @media (max-width: 520px){
          .lux-card{ width: 92vw !important; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "radial-gradient(circle at 15% 10%, #1a1a1a, #0A0A0A 55%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    color: "#fff",
  },
  card: {
    width: "440px",
    padding: "34px 28px",
    textAlign: "center",
  },
  logo: {
    color: "#D4AF37",
    fontWeight: 900,
    letterSpacing: "2px",
    fontSize: "22px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "28px",
    fontWeight: 900,
    marginBottom: "10px",
  },
  text: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "15px",
    lineHeight: 1.6,
  },
  button: {
    marginTop: "18px",
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(212,175,55,0.35)",
    background: "#D4AF37",
    color: "#000",
    fontWeight: 800,
    cursor: "pointer",
  },
};
