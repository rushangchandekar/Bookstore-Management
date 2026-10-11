import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        Title: "",
        Author: "",
        Price: "",
        Stock: "",
        ImageUrl: "",
    });

    const [preview, setPreview] = useState("");

    const getProduct = async() => {
        try {
            const res = await api.get(`/product/${id}`);

            const data = res.data;

            setProduct({
                Title: data.title || "",
                Author: data.author || "",
                Price: data.price || "",
                Stock: data.stock || "",
                ImageUrl: data.imageUrl || "",
            });

            setPreview(data.imageUrl || "");
        } catch (error) {
            console.error(error);
            toast.error("Failed to load product");
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({...prev, [name]:value }));

        if (name === "ImageUrl") setPreview(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updateProduct = {
                ...product,
                Price: parseFloat(product.Price),
                Stock: parseInt(product.Stock),
            };

            await api.put(`/product/${id}`, updateProduct);

            toast.success("Product updated successfully!");
            navigate("/products");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar />

                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "5%",
                        width: "350px",
                        height: "350px",
                        background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
                        animation: "morphBlob 18s ease-in-out infinite",
                        pointerEvents: "none",
                    }}
                />

                <div className="page-content" style={{ position: "relative", zIndex: 1 }}>
                    <h3 className="page-title">
                        <i className="bi bi-pencil-square" style={{ color: "var(--accent-gold)" }}></i>
                        Edit Product
                    </h3>

                    <div className="row g-4">
                        {/* Form */}
                        <div className="col-md-6">
                            <div className="glow-border-card fade-in-left" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
                                <div className="glow-border-card-inner">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="glass-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                name="Title"
                                                value={product.Title || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="glass-label">Author</label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                name="Author"
                                                value={product.Author || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="row g-3 mb-3">
                                            <div className="col-6">
                                                <label className="glass-label">Price ($)</label>
                                                <input
                                                    type="number"
                                                    className="form-control glass-input"
                                                    name="Price"
                                                    value={product.Price || ""}
                                                    onChange={handleChange}
                                                    required
                                                    step={0.01}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="glass-label">Stock</label>
                                                <input
                                                    type="number"
                                                    className="form-control glass-input"
                                                    name="Stock"
                                                    value={product.Stock || ""}
                                                    onChange={handleChange}
                                                    required
                                                    min="0"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="glass-label">Image URL</label>
                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                name="ImageUrl"
                                                value={product.ImageUrl || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <button 
                                                type="button"
                                                className="glow-btn glow-btn-outline"
                                                onClick={() => navigate("/products")}
                                            >
                                                <i className="bi bi-arrow-left me-1"></i>
                                                Back
                                            </button>
                                            <button type="submit" className="glow-btn glow-btn-blue">
                                                <i className="bi bi-check-lg me-1"></i>
                                                Update Product
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="col-md-6">
                            <div className="glass-card-static p-4 fade-in-right" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                                <h5
                                    className="mb-3 d-flex align-items-center gap-2"
                                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}
                                >
                                    <i className="bi bi-image" style={{ color: "var(--accent-blue)" }}></i>
                                    Image Preview
                                </h5>
                                {preview ? (
                                    <img 
                                        src={preview}
                                        alt="Product Preview"
                                        className="img-fluid rounded scale-in"
                                        style={{
                                            maxHeight: "400px",
                                            border: "1px solid var(--glass-border)",
                                            borderRadius: "var(--radius-md)",
                                        }}
                                    />
                                ) : (
                                    <div className="empty-state" style={{ padding: "60px 24px" }}>
                                        <div className="empty-icon">🖼️</div>
                                        <p>Image preview will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;