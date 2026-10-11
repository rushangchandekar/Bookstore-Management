import { Link, NavLink } from "react-router-dom";
import { getRole } from "../utils/auth";

function Sidebar() {
  const role = getRole();

  const navItems = [
    {
      to: role === "Admin" ? "/dashboard" : "/user-dashboard",
      icon: "bi-speedometer2",
      label: "Dashboard",
    },
    {
      to: "/products",
      icon: "bi-box-seam",
      label: "Products",
    },
    {
      to: "/ai-chat",
      icon: "bi-robot",
      label: "AI Chat",
    },
  ];

  return (
    <div
      className="d-flex flex-column glass-sidebar"
      style={{ width: "260px", flexShrink: 0 }}
    >
      {/* Brand */}
      <div className="p-4 sidebar-brand">
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
          <span style={{ fontSize: "1.5rem" }}>📚</span>
          <h4 className="mb-0 fw-bold glow-text-gold" style={{ fontSize: "1.25rem" }}>
            BookStore
          </h4>
        </Link>
        <small
          className="d-block mt-1"
          style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.5px" }}
        >
          {role === "Admin" ? "ADMIN PANEL" : "USER PANEL"}
        </small>
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column p-3" style={{ gap: "4px" }}>
        {navItems.map((item) => (
          <li className="nav-item" key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${
                  isActive ? "active-link" : ""
                }`
              }
            >
              <i className={`bi ${item.icon}`} style={{ fontSize: "1.1rem" }}></i>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto p-3" style={{ borderTop: "1px solid var(--glass-border)" }}>
        <small style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
          © 2026 BookStore
        </small>
      </div>
    </div>
  );
}

export default Sidebar;
