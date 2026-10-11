import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import api from "../api/axios";
import { getRole } from "../utils/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const role = getRole();

    const getProducts = async() => {
        try {
            const res = await api.get("/product");
            setProducts(res.data);
        } catch(error) {
            alert("Failed to fetch products");
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleDelete = async() => {
        try {
            await api.delete(`/product/${selectedId}`);

            setProducts(products.filter((p) => p.id !== selectedId));

            toast.success("Product deleted successfully");
            setShowModal(false);
        } catch (error) {
            toast.error("Delete failed");
            console.error(error);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar />

                {/* Background ambience */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "400px",
                        height: "400px",
                        background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)",
                        animation: "morphBlob 22s ease-in-out infinite",
                        pointerEvents: "none",
                    }}
                />

                <div className="page-content" style={{ position: "relative", zIndex: 1 }}>
                    <div className="d-flex justify-content-between align-items-center mb-4 fade-in-down">
                        <h3 className="page-title mb-0">
                            <i className="bi bi-box-seam" style={{ color: "var(--accent-blue)" }}></i>
                            Products
                            <span className="glass-badge glass-badge-blue ms-2" style={{ fontSize: "0.7rem" }}>
                                {products.length} items
                            </span>
                        </h3>

                        {role === "Admin" && (
                            <Link
                                to="/add-product"
                                className="glow-btn glow-btn-green d-flex align-items-center gap-2"
                            >
                                <i className="bi bi-plus-lg"></i>
                                Add Product
                            </Link>
                        )}
                    </div>

                    {loading ? (
                        <Loader />
                    ): (
                        <div className="glass-table-wrapper">
                            <table className="table glass-table align-middle mb-0">
                                <thead className="text-center">
                                    <tr>
                                        <th>Sr No</th>
                                        <th style={{ textAlign: "left" }}>Book</th>
                                        <th>Price</th>
                                        {role === "Admin" && (
                                            <>
                                                <th>Actions</th>
                                                <th>DB ID</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {products.map((p, index) => (
                                        <tr
                                            key={p.id}
                                            className="fade-in-up"
                                            style={{
                                                animationDelay: `${index * 0.06}s`,
                                                animationFillMode: "both",
                                            }}
                                        >
                                            <td style={{ fontWeight: 600, color: "var(--text-muted)" }}>
                                                {index + 1}
                                            </td>

                                            <td>
                                                <div className="d-flex align-items-center gap-3 text-start">
                                                    <img
                                                        src={p.imageUrl}
                                                        alt={p.title}
                                                        style={{
                                                            width: "45px",
                                                            height: "55px",
                                                            objectFit: "cover",
                                                            borderRadius: "10px",
                                                            border: "1px solid var(--glass-border)",
                                                            transition: "transform 0.3s, box-shadow 0.3s",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = "scale(1.15)";
                                                            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = "scale(1)";
                                                            e.target.style.boxShadow = "none";
                                                        }}
                                                    />
                                                    <div>
                                                        <div style={{ fontWeight: 600 }}>{p.title}</div>
                                                        <small style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                                            {p.author}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="glass-badge glass-badge-green">
                                                    ${p.price}
                                                </span>
                                            </td>

                                            {role === "Admin" && (
                                                <>
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Link
                                                                to={`/edit-product/${p.id}`}
                                                                className="glow-btn glow-btn-gold"
                                                                style={{ padding: "5px 14px", fontSize: "0.8rem" }}
                                                            >
                                                                <i className="bi bi-pencil-square me-1"></i>
                                                                Edit
                                                            </Link>

                                                            <button
                                                                onClick={() => {
                                                                    setSelectedId(p.id);
                                                                    setShowModal(true);
                                                                }}
                                                                className="glow-btn glow-btn-red"
                                                                style={{ padding: "5px 14px", fontSize: "0.8rem" }}
                                                            >
                                                                <i className="bi bi-trash3 me-1"></i>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <small style={{ color: "var(--text-muted)", fontSize: "0.65rem", fontFamily: "monospace" }}>
                                                            {p.id}
                                                        </small>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {products.length === 0 && !loading && (
                                <div className="empty-state">
                                    <div className="empty-icon">📦</div>
                                    <h5>No products found</h5>
                                    <p>Start by adding your first product</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <>
                    <div className="modal fade show d-block glass-modal" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header" style={{ borderBottom: "1px solid rgba(248,113,113,0.15)" }}>
                                    <h5 className="modal-title d-flex align-items-center gap-2">
                                        <i className="bi bi-exclamation-triangle" style={{ color: "var(--accent-red)", animation: "pulse 1.5s ease-in-out infinite" }}></i>
                                        Confirm Delete
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body text-center py-4">
                                    <div
                                        style={{
                                            fontSize: "3.5rem",
                                            marginBottom: "12px",
                                            display: "inline-block",
                                            animation: "float 2s ease-in-out infinite",
                                        }}
                                    >
                                        🗑️
                                    </div>
                                    <p style={{ fontSize: "1.05rem", marginBottom: "4px" }}>
                                        Are you sure you want to delete this product?
                                    </p>
                                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                                        This action cannot be undone
                                    </p>
                                </div>

                                <div className="modal-footer justify-content-center gap-3">
                                    <button
                                        className="glow-btn glow-btn-outline px-4"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button 
                                        className="glow-btn glow-btn-red px-4"
                                        onClick={handleDelete}
                                    >
                                        <i className="bi bi-trash3 me-1"></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>
    );
}

export default Products;