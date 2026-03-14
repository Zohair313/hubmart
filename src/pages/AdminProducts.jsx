import React, { useState, useEffect } from 'react';
import { Package, Plus, Save, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminProducts.css';



const AdminProducts = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock_quantity: '',
        low_stock_threshold: '10',
        description: '',
        is_active: true
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && (!user || !user.is_staff)) {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const fetchCategories = async () => {

            try {
                const res = await api.get('/store/categories/');
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Basic slug generation if empty
            const payload = {
                ...formData,
                slug: formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            };

            await api.post('/store/products/', payload);
            setMessage({ type: 'success', text: 'Product added successfully!' });
            setFormData({
                name: '',
                category: '',
                price: '',
                stock_quantity: '',
                low_stock_threshold: '10',
                description: '',
                is_active: true
            });
        } catch (err) {
            console.error("Failed to add product", err);
            setMessage({
                type: 'error',
                text: err.response?.data ? JSON.stringify(err.response.data) : 'Failed to add product. Ensure you are logged in as admin.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-products container fade-in">
            <header className="admin-header">
                <div className="header-top">
                    <Link to="/" className="back-link"><ArrowLeft size={18} /> Back to Store</Link>
                    <h1>Admin <span>Inventory Control</span></h1>
                </div>
                <p>Directly inject new artisanal listings into the HubMart ecosystem.</p>
            </header>

            <div className="admin-layout">
                <div className="form-card glass">
                    <div className="card-header">
                        <Plus size={24} />
                        <h3>Add New Product</h3>
                    </div>

                    {message.text && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-grid">
                            <div className="input-group full-width">
                                <label>Product Name</label>
                                <input
                                    type="text" name="name" placeholder="e.g. Premium Saffron 10g"
                                    required value={formData.name} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Category</label>
                                <select name="category" required value={formData.category} onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Price (£)</label>
                                <input
                                    type="number" step="0.01" name="price" placeholder="29.99"
                                    required value={formData.price} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Initial Stock</label>
                                <input
                                    type="number" name="stock_quantity" placeholder="50"
                                    required value={formData.stock_quantity} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Low Stock Alert Level</label>
                                <input
                                    type="number" name="low_stock_threshold"
                                    required value={formData.low_stock_threshold} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group full-width">
                                <label>Product Description</label>
                                <textarea
                                    name="description" placeholder="Describe the artisanal qualities..."
                                    rows="4" value={formData.description} onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox" id="is_active" name="is_active"
                                    checked={formData.is_active} onChange={handleChange}
                                />
                                <label htmlFor="is_active">Live on storefront</label>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                            {loading ? <><RefreshCw className="spin" size={20} /> Deploying...</> : <><Save size={20} /> Add Product</>}
                        </button>
                    </form>
                </div>

                <aside className="admin-sidebar">
                    <div className="stats-card glass">
                        <h4>System Status</h4>
                        <div className="stat-row">
                            <span>API Status</span>
                            <span className="dot online"></span>
                        </div>
                        <div className="stat-row">
                            <span>Atomic Sync</span>
                            <span className="badge">Active</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AdminProducts;
