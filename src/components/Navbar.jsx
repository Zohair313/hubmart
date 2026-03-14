import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu, Home, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    Hub<span>Mart</span>.uk
                </Link>

                <div className="search-bar">
                    <input type="text" placeholder="Search premium selections..." />
                    <button className="search-btn"><Search size={20} /></button>
                </div>

                <div className="nav-links">
                    <Link to="/" className="nav-item"><Home size={20} /> Home</Link>
                    <Link to="/products" className="nav-item"><Layers size={20} /> Products</Link>

                    <Link to="/cart" className="cart-item">
                        <ShoppingCart size={24} />
                        {items.length > 0 && <span className="cart-badge">{items.length}</span>}
                    </Link>

                    {user && user.is_staff && (
                        <Link to="/admin/products" className="nav-item"><Layers size={20} /> Admin</Link>
                    )}

                    {user ? (

                        <div className="user-menu">
                            <Link to="/profile" className="nav-item user-profile">
                                <User size={24} /> {user.first_name || user.username}
                            </Link>
                            <button onClick={() => { logout(); navigate('/'); }} className="logout-btn">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-primary">Sign In</Link>
                    )}

                    <button className="mobile-menu"><Menu size={24} /></button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
