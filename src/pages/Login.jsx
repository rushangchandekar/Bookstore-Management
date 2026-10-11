import React from "react"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ParticleField from "../components/ParticleField";

function Login() { 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/auth/login", formData);

            const token = res.data.token;

            sessionStorage.setItem("token", token);

            const decoded = jwtDecode(token);

            const role = 
            decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] || decoded.role;

            if(role === "Admin") {
                navigate("/dashboard");
            } else {
                navigate("/user-dashboard");
            }

            toast.success("Login successful");
        } catch (err) {
            console.error(err);
            toast.error("Invalid credentials");
        }
        setLoading(false);
    };

    return ( 
        <div 
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ position: "relative", overflow: "hidden" }}
        >
            <ParticleField count={25} />

            {/* Animated blobs */}
            <div
                style={{
                    position: "absolute",
                    top: "-120px",
                    left: "-100px",
                    width: "400px",
                    height: "400px",
                    background: "radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)",
                    animation: "morphBlob 12s ease-in-out infinite, floatSlow 8s ease-in-out infinite",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-120px",
                    right: "-80px",
                    width: "450px",
                    height: "450px",
                    background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
                    animation: "morphBlob 16s ease-in-out infinite reverse, floatSlow 10s ease-in-out infinite",
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                <div className="glow-border-card scale-in">
                    <div
                        className="glow-border-card-inner"
                        style={{ width: "400px", maxWidth: "90vw" }}
                    >
                        <div className="text-center mb-4">
                            <div
                                style={{
                                    fontSize: "2.5rem",
                                    display: "inline-block",
                                    animation: "float 3s ease-in-out infinite",
                                    filter: "drop-shadow(0 4px 12px rgba(96,165,250,0.3))",
                                }}
                            >
                                📚
                            </div>
                            <h3
                                className="glow-text"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 700,
                                    marginTop: "8px",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Welcome Back
                            </h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                                Sign in to your BookStore account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 fade-in-up stagger-1">
                                <label className="glass-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control glass-input"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4 fade-in-up stagger-2">
                                <label className="glass-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control glass-input"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="fade-in-up stagger-3">
                                <button
                                    className="glow-btn glow-btn-blue w-100"
                                    style={{ padding: "13px", fontSize: "1rem" }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Signing in...
                                        </span>
                                    ) : (
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Sign In
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4 fade-in-up stagger-4">
                            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>
                                Don't have an account?{" "}
                                <RouterLink to="/register" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>
                                    Register
                                </RouterLink>
                            </p>
                            <RouterLink
                                to="/"
                                style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
                            >
                                ← Back to Home
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    ); 
}
 
export default Login;