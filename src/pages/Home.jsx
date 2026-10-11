import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRole } from "../utils/auth";
import { toast } from "react-toastify";
import ParticleField from "../components/ParticleField";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const role = getRole();
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Smart BookStore Management";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);

    // Cursor blink
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    toast.info("Logged out successfully");
  };

  const features = [
    {
      icon: "📦",
      title: "Product Management",
      desc: "Add, edit, and track books with real-time stock control and inventory insights.",
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(96,165,250,0.05))",
      borderColor: "rgba(59,130,246,0.2)",
    },
    {
      icon: "🔐",
      title: "Secure Authentication",
      desc: "JWT-based login with role-based access control for admins and users.",
      gradient: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(196,132,252,0.05))",
      borderColor: "rgba(167,139,250,0.2)",
    },
    {
      icon: "🤖",
      title: "AI Assistant",
      desc: "Smart book suggestions, pricing insights, and conversational AI chat support.",
      gradient: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(110,231,183,0.05))",
      borderColor: "rgba(52,211,153,0.2)",
    },
  ];

  const stats = [
    { value: "AI", label: "Powered", color: "var(--accent-blue)" },
    { value: "24/7", label: "Access", color: "var(--accent-green)" },
    { value: "100%", label: "Secure", color: "var(--accent-purple)" },
    { value: "Fast", label: "Search", color: "var(--accent-gold)" },
  ];

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Animated Particles */}
      <ParticleField count={40} />

      {/* Decorative Animated Blobs */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
          animation: "morphBlob 15s ease-in-out infinite, floatSlow 8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          animation: "morphBlob 20s ease-in-out infinite reverse, floatSlow 10s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)",
          animation: "morphBlob 18s ease-in-out infinite, floatSlow 12s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <nav
        className="glass-nav navbar navbar-expand-lg px-4"
        style={{ position: "relative", zIndex: 10 }}
      >
        <span
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          style={{ color: "var(--text-heading)" }}
        >
          <span style={{ fontSize: "1.3rem" }}>📚</span>
          <span className="glow-text-gold">BookStore</span>
        </span>

        <div className="ms-auto d-flex align-items-center gap-2">
          {role ? (
            <>
              <Link
                to={role === "Admin" ? "/dashboard" : "/user-dashboard"}
                className="glow-btn glow-btn-blue"
                style={{ padding: "7px 20px", fontSize: "0.85rem" }}
              >
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </Link>
              <button
                className="glow-btn glow-btn-outline"
                style={{ padding: "7px 20px", fontSize: "0.85rem" }}
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="glow-btn glow-btn-blue"
                style={{ padding: "7px 20px", fontSize: "0.85rem" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="glow-btn glow-btn-outline"
                style={{ padding: "7px 20px", fontSize: "0.85rem" }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="row align-items-center"
          style={{ minHeight: "75vh", paddingTop: "40px", paddingBottom: "40px" }}
        >
          <div className="col-lg-6">
            {/* Badge */}
            <div className="fade-in-up stagger-1" style={{ marginBottom: "20px" }}>
              <span
                className="glass-badge glass-badge-blue"
                style={{
                  fontSize: "0.8rem",
                  padding: "7px 18px",
                  animation: "pulseGlow 3s ease-in-out infinite",
                }}
              >
                <span style={{ animation: "pulse 2s ease-in-out infinite" }}>✨</span>
                AI-Powered Platform
              </span>
            </div>

            {/* Typewriter Title */}
            <h1
              className="fade-in-up stagger-2"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              {typedText.split("BookStore").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="glow-text">BookStore</span>
                  )}
                </span>
              ))}
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "1em",
                  background: "var(--accent-blue)",
                  marginLeft: "4px",
                  verticalAlign: "baseline",
                  opacity: showCursor ? 1 : 0,
                  transition: "opacity 0.1s",
                  boxShadow: "0 0 8px var(--accent-blue-glow)",
                }}
              />
            </h1>

            {/* Subtitle */}
            <p
              className="fade-in-up stagger-3"
              style={{
                fontSize: "1.15rem",
                color: "var(--text-secondary)",
                maxWidth: "500px",
                lineHeight: 1.7,
                marginBottom: "36px",
              }}
            >
              Manage your inventory, track stock, and explore AI-powered book
              recommendations — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap gap-3 fade-in-up stagger-4">
              {role ? (
                <Link
                  to={role === "Admin" ? "/dashboard" : "/user-dashboard"}
                  className="glow-btn glow-btn-green"
                  style={{ padding: "14px 36px", fontSize: "1.05rem" }}
                >
                  🚀 Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="glow-btn glow-btn-green"
                  style={{ padding: "14px 36px", fontSize: "1.05rem" }}
                >
                  🚀 Get Started
                </Link>
              )}

              <Link
                to="/ai-chat"
                className="glow-btn glow-btn-outline"
                style={{ padding: "14px 36px", fontSize: "1.05rem" }}
              >
                🤖 Try AI
              </Link>
            </div>
          </div>

          {/* Right side — animated glassmorphic showcase */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="fade-in-right stagger-3" style={{ position: "relative" }}>
              {/* Animated glow border card */}
              <div className="glow-border-card floating" style={{ maxWidth: "450px", margin: "0 auto" }}>
                <div className="glow-border-card-inner text-center">
                  {/* Animated book stack */}
                  <div style={{ marginBottom: "24px", position: "relative" }}>
                    <div
                      style={{
                        fontSize: "4rem",
                        display: "inline-block",
                        animation: "float 3s ease-in-out infinite",
                        filter: "drop-shadow(0 10px 20px rgba(96,165,250,0.3))",
                      }}
                    >
                      📚
                    </div>
                    {/* Orbiting dot */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "80px",
                        height: "80px",
                        marginTop: "-40px",
                        marginLeft: "-40px",
                        animation: "spin 6s linear infinite",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--accent-cyan)",
                          boxShadow: "0 0 10px var(--accent-cyan-glow)",
                          transform: "translateX(-50%)",
                        }}
                      />
                    </div>
                  </div>

                  <h4
                    className="glow-text-purple"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      marginBottom: "8px",
                    }}
                  >
                    Your Digital Bookshelf
                  </h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "28px" }}>
                    Organize, discover, and manage with intelligence
                  </p>

                  {/* Stats row */}
                  <div className="d-flex justify-content-center gap-0">
                    {stats.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "0 20px",
                          borderRight: i < stats.length - 1 ? "1px solid var(--glass-border)" : "none",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: 800,
                            fontFamily: "'Outfit', sans-serif",
                            color: s.color,
                          }}
                        >
                          {s.value}
                        </div>
                        <small style={{ color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                          {s.label}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Small floating accent cards */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-15px",
                  padding: "10px 16px",
                  background: "rgba(52,211,153,0.12)",
                  border: "1px solid rgba(52,211,153,0.25)",
                  borderRadius: "var(--radius-md)",
                  backdropFilter: "blur(10px)",
                  animation: "floatSlow 5s ease-in-out infinite",
                  fontSize: "0.8rem",
                  color: "var(--accent-green)",
                  fontWeight: 600,
                }}
              >
                <i className="bi bi-graph-up-arrow me-1"></i> Live Stock
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "-15px",
                  left: "-10px",
                  padding: "10px 16px",
                  background: "rgba(167,139,250,0.12)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  borderRadius: "var(--radius-md)",
                  backdropFilter: "blur(10px)",
                  animation: "floatSlow 7s ease-in-out infinite reverse",
                  fontSize: "0.8rem",
                  color: "var(--accent-purple)",
                  fontWeight: 600,
                }}
              >
                <i className="bi bi-stars me-1"></i> AI Insights
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container pb-5" style={{ position: "relative", zIndex: 1 }}>
        <div className="text-center mb-5">
          <h2
            className="fade-in-up"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
            }}
          >
            Everything you need to{" "}
            <span className="glow-text">manage books</span>
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto" }}>
            Powerful tools for modern bookstore management
          </p>
        </div>

        <div className="row g-4">
          {features.map((f, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="feature-card fade-in-up"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  background: f.gradient,
                  borderColor: f.borderColor,
                }}
              >
                <div className="feature-icon">{f.icon}</div>
                <h5>{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Bar */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid var(--glass-border)",
          borderBottom: "1px solid var(--glass-border)",
          padding: "20px 0",
          marginBottom: "0",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-5 flex-wrap">
            {["React", ".NET Core", "JWT Auth", "AI Chat", "REST API"].map((tech, i) => (
              <span
                key={i}
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center py-4"
        style={{ borderTop: "1px solid var(--glass-border)", position: "relative", zIndex: 1 }}
      >
        <small style={{ color: "var(--text-muted)" }}>
          © 2026 BookStore | React + .NET Core
        </small>
      </div>
    </div>
  );
}

export default Home;
