import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from "../api/axios";
import { toast } from "react-toastify";
import ParticleField from "../components/ParticleField";

function Register() {
    const navigate = useNavigate();

    const[formData, setFromData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFromData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/auth/register", formData);

            navigate("/login");
            toast.success("Registration successful. Please login.");
        } catch {
            toast.error("Registration failed");
        }
        setLoading(false);
    };

    return (
        <div
            className='d-flex justify-content-center align-items-center vh-100'
            style={{ position: "relative", overflow: "hidden" }}
        >
            <ParticleField count={25} />

            {/* Animated blobs */}
            <div
                style={{
                    position: "absolute",
                    top: "-80px",
                    right: "-80px",
                    width: "400px",
                    height: "400px",
                    background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
                    animation: "morphBlob 14s ease-in-out infinite, floatSlow 9s ease-in-out infinite",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-120px",
                    left: "-80px",
                    width: "450px",
                    height: "450px",
                    background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
                    animation: "morphBlob 18s ease-in-out infinite reverse, floatSlow 11s ease-in-out infinite",
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
                                    filter: "drop-shadow(0 4px 12px rgba(167,139,250,0.3))",
                                }}
                            >
                                ✨
                            </div>
                            <h3
                                className="glow-text-purple"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 700,
                                    marginTop: "8px",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Create Account
                            </h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                                Join BookStore and start exploring
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 fade-in-up stagger-1">
                                <label className="glass-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control glass-input"
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 fade-in-up stagger-2">
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
                            <div className="mb-4 fade-in-up stagger-3">
                                <label className="glass-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control glass-input"
                                    placeholder="Create a password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="fade-in-up stagger-4">
                                <button
                                    className='glow-btn glow-btn-green w-100'
                                    style={{ padding: "13px", fontSize: "1rem" }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Creating account...
                                        </span>
                                    ) : (
                                        <>
                                            <i className="bi bi-person-plus me-2"></i>
                                            Create Account
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4 fade-in-up stagger-5">
                            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>
                                Already have an account?{" "}
                                <Link to="/login" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>
                                    Sign In
                                </Link>
                            </p>
                            <Link
                                to="/"
                                style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;