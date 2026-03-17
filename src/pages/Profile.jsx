import React, { useState, useEffect } from 'react';
import { User, Mail, Package, Calendar, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeListings: 0,
        recentAdditions: []
    });

    useEffect(() => {
        // Load local products for stats
        const localProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
        setStats({
            totalProducts: localProducts.length,
            activeListings: localProducts.filter(p => p.is_active).length,
            recentAdditions: localProducts.slice(0, 4) // Set to 4
        });
    }, []);

    if (!user) {
        return (
            <div className="container profile-empty">
                <h2>Please Login to see your profile</h2>
                <Link to="/login" className="btn-primary">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="profile-page container fade-in">
            <header className="profile-header">
                <div className="header-content">
                    <Link to="/" className="back-link"><ArrowLeft size={18} /> Home</Link>
                    <h1>User <span>Dashboard</span></h1>
                </div>
            </header>

            <div className="profile-grid">
                {/* Profile Info Sidebar */}
                <aside className="profile-sidebar glass">
                    <div className="user-avatar-large">
                        <User size={64} />
                        <span className="status-badge">Online</span>
                    </div>
                    <div className="user-details">
                        <h2>{user.first_name} {user.last_name || 'Member'}</h2>
                        <p className="user-role">Premium Artisanal Partner</p>
                        
                        <div className="info-list">
                            <div className="info-item">
                                <Mail size={16} />
                                <span>{user.email}</span>
                            </div>
                            <div className="info-item">
                                <Calendar size={16} />
                                <span>Joined March 2026</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="sidebar-actions">
                        <button className="btn-secondary full-width"><Settings size={18} /> Settings</button>
                        <button 
                            className="btn-outline full-width logout-btn" 
                            onClick={() => { logout(); navigate('/'); }}
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </aside>

                {/* Statistics & Activity */}
                <main className="profile-main">
                    <div className="stats-row">
                        <div className="stat-card glass">
                            <Package size={32} className="stat-icon" />
                            <div className="stat-content">
                                <h3>{stats.totalProducts}</h3>
                                <p>Products Added</p>
                            </div>
                        </div>
                        <div className="stat-card glass">
                            <div className="stat-icon-circle">✅</div>
                            <div className="stat-content">
                                <h3>{stats.activeListings}</h3>
                                <p>Live Listings</p>
                            </div>
                        </div>
                    </div>

                    <section className="recent-activity glass">
                        <div className="section-header">
                            <h3><Package size={20} /> My Recent Listings</h3>
                            <Link to="/admin/products" className="add-btn-small">Add More</Link>
                        </div>
                        
                        <div className="products-list-simple">
                            {stats.recentAdditions.length === 0 ? (
                                <p className="empty-msg">You haven't listed any items yet.</p>
                            ) : (
                                stats.recentAdditions.map(product => (
                                    <div key={product.id} className="simple-product-item">
                                        <div className="product-thumb">
                                            <img src="/img.jpg" alt={product.name} />
                                        </div>
                                        <div className="product-details">
                                            <h4>{product.name}</h4>
                                            <p>£{product.price} • {product.stock_quantity} in stock</p>
                                        </div>
                                        <span className={`status-tag ${product.is_active ? 'active' : 'inactive'}`}>
                                            {product.is_active ? 'LIVE' : 'DRAFT'}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Profile;
