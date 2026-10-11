import { useNavigate } from "react-router-dom";
import { getRole } from "../utils/auth";
import { toast } from "react-toastify";

function Navbar() {
    const navigate = useNavigate();
    const role = getRole();

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
        toast.info("Logged out successfully");
    };

    return (
        <nav className="navbar navbar-expand-lg px-4 glass-nav">
            <span
                className="navbar-brand fw-bold d-flex align-items-center gap-2"
                style={{ cursor: "pointer", color: "var(--text-heading)" }}
                onClick={() =>
                    navigate(role === "Admin" ? "/dashboard" : "/user-dashboard")
                }
            >
                <span style={{ fontSize: "1.3rem" }}>📦</span>
                <span>{role === "Admin" ? "MyStore Admin" : "MyStore"}</span>
            </span>

            <div className="ms-auto d-flex align-items-center gap-3">
                <span className="glass-badge glass-badge-purple">{role}</span>
                <button
                    className="glow-btn glow-btn-outline"
                    style={{ padding: "6px 18px", fontSize: "0.85rem" }}
                    onClick={logout}
                >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;