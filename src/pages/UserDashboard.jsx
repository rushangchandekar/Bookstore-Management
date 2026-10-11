import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { Link } from "react-router-dom";
import AnimatedCounter from "../components/AnimatedCounter";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await api.get("/Product");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const quickActions = [
    {
      icon: "bi-book",
      title: "Browse Books",
      desc: "Explore the full catalog",
      to: "/products",
      color: "var(--accent-blue)",
      glowColor: "rgba(96,165,250,0.15)",
    },
    {
      icon: "bi-robot",
      title: "AI Chat",
      desc: "Ask for recommendations",
      to: "/ai-chat",
      color: "var(--accent-purple)",
      glowColor: "rgba(167,139,250,0.15)",
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        <Navbar />

        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "0",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
            animation: "morphBlob 18s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div className="page-content" style={{ position: "relative", zIndex: 1 }}>
          {/* Welcome Section */}
          <div
            className="glass-card-static p-4 mb-4 fade-in-up"
            style={{
              background: "linear-gradient(135deg, rgba(96,165,250,0.08), rgba(167,139,250,0.04))",
              borderColor: "rgba(96,165,250,0.15)",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  fontSize: "2.8rem",
                  display: "inline-block",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                👋
              </span>
              <div>
                <h3
                  className="mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
                >
                  Welcome to <span className="glow-text">BookStore</span>
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
                  Explore our collection and use AI Chat for personalized suggestions.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row g-4 mb-4">
            {quickActions.map((action, i) => (
              <div className="col-md-6" key={i}>
                <Link to={action.to} className="text-decoration-none">
                  <div
                    className="glass-card p-4 d-flex align-items-center gap-3 fade-in-up"
                    style={{
                      animationDelay: `${0.2 + i * 0.15}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "var(--radius-md)",
                        background: action.glowColor,
                        border: `1px solid ${action.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.35s",
                      }}
                    >
                      <i
                        className={`bi ${action.icon}`}
                        style={{ fontSize: "1.5rem", color: action.color }}
                      ></i>
                    </div>
                    <div>
                      <h5 className="mb-1" style={{ fontWeight: 600, color: "var(--text-heading)" }}>
                        {action.title}
                      </h5>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: 0 }}>
                        {action.desc}
                      </p>
                    </div>
                    <i
                      className="bi bi-arrow-right ms-auto"
                      style={{
                        fontSize: "1.3rem",
                        color: "var(--text-muted)",
                        transition: "transform 0.3s, color 0.3s",
                      }}
                    ></i>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="row g-4">
            <div className="col-md-4">
              <div className="stat-card blue fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
                <div className="stat-icon">
                  <i className="bi bi-collection"></i>
                </div>
                <div className="stat-value">
                  {loading ? "—" : <AnimatedCounter value={products.length} />}
                </div>
                <div className="stat-label">Books Available</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card green fade-in-up" style={{ animationDelay: "0.55s", animationFillMode: "both" }}>
                <div className="stat-icon">
                  <i className="bi bi-bar-chart-line"></i>
                </div>
                <div className="stat-value">
                  {loading ? "—" : <AnimatedCounter value={products.reduce((sum, p) => sum + (p.stock || 0), 0)} />}
                </div>
                <div className="stat-label">Total Stock</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card gold fade-in-up" style={{ animationDelay: "0.7s", animationFillMode: "both" }}>
                <div className="stat-icon">
                  <i className="bi bi-stars" style={{ animation: "neonPulse 2s ease-in-out infinite" }}></i>
                </div>
                <div className="stat-value" style={{ color: "var(--accent-gold)" }}>AI</div>
                <div className="stat-label">Powered Search</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
