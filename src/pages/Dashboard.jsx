import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import AnimatedCounter from "../components/AnimatedCounter";

function Dashboard() {
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

    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const lowStock = products.filter((p) => p.stock < 5 && p.stock > 0).length;

    const stats = [
        {
            label: "Total Products",
            value: totalProducts,
            icon: "bi-box-seam",
            color: "blue",
        },
        {
            label: "Total Stock",
            value: totalStock,
            icon: "bi-bar-chart-line",
            color: "green",
        },
        {
            label: "Low Stock",
            value: lowStock,
            icon: "bi-exclamation-triangle",
            color: "gold",
        },
    ];

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar />

                {/* Subtle background glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        right: "-5%",
                        width: "400px",
                        height: "400px",
                        background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
                        animation: "morphBlob 20s ease-in-out infinite",
                        pointerEvents: "none",
                    }}
                />

                <div className="page-content" style={{ position: "relative", zIndex: 1 }}>
                    <h3 className="page-title">
                        <i className="bi bi-speedometer2" style={{ color: "var(--accent-blue)", animation: "pulseGlow 3s ease-in-out infinite" }}></i>
                        <span className="glow-text">Dashboard</span>
                    </h3>

                    {/* Stats Row */}
                    <div className="row g-4 mb-4">
                        {stats.map((s, i) => (
                            <div className="col-md-4" key={i}>
                                <div
                                    className={`stat-card ${s.color} fade-in-up`}
                                    style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}
                                >
                                    <div className="stat-icon">
                                        <i className={`bi ${s.icon}`}></i>
                                    </div>
                                    <div className="stat-value">
                                        {loading ? "—" : <AnimatedCounter value={s.value} duration={1500} />}
                                    </div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Products Table */}
                    <div className="glass-table-wrapper fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
                        <div className="p-4 d-flex align-items-center gap-2" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                            <span
                                style={{
                                    fontSize: "1.3rem",
                                    display: "inline-block",
                                    animation: "float 3s ease-in-out infinite",
                                }}
                            >
                                📚
                            </span>
                            <h5 className="mb-0" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                                Recent Products
                            </h5>
                            <span className="glass-badge glass-badge-blue ms-2" style={{ fontSize: "0.7rem" }}>
                                Latest {Math.min(5, products.length)}
                            </span>
                        </div>

                        <table className="table glass-table text-center">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products
                                    .sort(
                                        (a, b) =>
                                            new Date(b.createdDate) - new Date(a.createdDate),
                                    )
                                    .slice(0, 5)
                                    .map((p, idx) => (
                                        <tr
                                            key={p.id}
                                            className="fade-in-up"
                                            style={{
                                                animationDelay: `${0.6 + idx * 0.08}s`,
                                                animationFillMode: "both",
                                            }}
                                        >
                                            <td style={{ fontWeight: 500 }}>{p.title}</td>
                                            <td style={{ color: "var(--text-secondary)" }}>{p.author}</td>
                                            <td>
                                                <span className="glass-badge glass-badge-green">${p.price}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`glass-badge ${
                                                        p.stock < 5 ? "glass-badge-red" : "glass-badge-blue"
                                                    }`}
                                                >
                                                    {p.stock}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {products.length === 0 && !loading && (
                            <div className="empty-state">
                                <div className="empty-icon">📦</div>
                                <h5>No products yet</h5>
                                <p>Add your first product to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;