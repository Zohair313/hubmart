import React, { useState, useEffect } from 'react';
import { ShieldAlert, UserPlus, Users, Package, ArrowRight, Save, LayoutDashboard, Database } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';

const AdminDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [adminsList, setAdminsList] = useState([]);

    useEffect(() => {
        if (!loading && (!user || !user.is_staff)) {
            navigate('/Hubmaster');
        } else if (user && user.is_staff) {
            loadAdmins();
        }
    }, [user, loading, navigate]);

    const loadAdmins = () => {
        const admins = JSON.parse(localStorage.getItem('hubmart_admins')) || [];
        setAdminsList(admins);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateAdmin = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        const admins = JSON.parse(localStorage.getItem('hubmart_admins')) || [];
        
        if (admins.find(a => a.email === formData.email)) {
            setMessage({ type: 'error', text: 'An admin with this email already exists.' });
            return;
        }

        const newAdmin = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        const updatedAdmins = [...admins, newAdmin];
        localStorage.setItem('hubmart_admins', JSON.stringify(updatedAdmins));
        
        setAdminsList(updatedAdmins);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setMessage({ type: 'success', text: `Admin ${formData.name} created successfully!` });
    };

    if (loading || !user) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container fade-in" style={{ padding: '3rem 1rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <LayoutDashboard size={36} color="#d4af37" />
                        Admin <span className="text-gradient">Control Center</span>
                    </h1>
                    <p style={{ opacity: 0.7 }}>Welcome back, {user.first_name}. Master control initialized.</p>
                </div>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert size={18} color="#d4af37" />
                    <span style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 'bold', letterSpacing: '1px' }}>SYSTEM SECURE</span>
                </div>
            </header>

            {/* BLOCK 1: Create Admin Form & Admins List AT THE TOP */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                {/* Create Admin Form */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                        <UserPlus size={24} color="#d4af37" />
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Provision New Admin</h2>
                    </div>

                    {message.text && (
                        <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', borderLeft: `4px solid ${message.type === 'error' ? '#ef4444' : '#10b981'}` }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleCreateAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>Full Name</label>
                            <input 
                                type="text" name="name" placeholder="John Doe" required
                                value={formData.name} onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>Secure Email</label>
                            <input 
                                type="email" name="email" placeholder="john@hubmart.uk" required
                                value={formData.email} onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>Password</label>
                                <input 
                                    type="password" name="password" placeholder="••••••••" required
                                    value={formData.password} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>Confirm Password</label>
                                <input 
                                    type="password" name="confirmPassword" placeholder="••••••••" required
                                    value={formData.confirmPassword} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
                                />
                            </div>
                        </div>

                        <button type="submit" style={{ 
                            background: '#d4af37', color: '#0f172a', padding: '1rem', borderRadius: '6px', fontWeight: 'bold', marginTop: '1rem',
                            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: '0.3s'
                        }} className="hover-lift">
                            <Save size={18} /> Authorize Admin
                        </button>
                    </form>
                </div>

                {/* Admins List */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                        <Users size={24} color="#d4af37" />
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Active Administrators</h2>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {adminsList.map((admin, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {admin.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{admin.name}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{admin.email}</div>
                                    </div>
                                </div>
                                {admin.email === 'admin@hubmart.uk' && (
                                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                                        ROOT
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BLOCK 2: Quick Action Links / System Metrics AT THE BOTTOM */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Quick Action Links */}
                <Link to="/admin/products" className="glass hover-lift" style={{ textDecoration: 'none', color: 'inherit', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                    <Package size={48} color="#d4af37" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>Product Management</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Add, edit or remove products from the unified storefront ecosystem.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d4af37', fontWeight: 'bold' }}>
                        Access Portal <ArrowRight size={16} />
                    </div>
                </Link>

                <div className="glass" style={{ padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Database size={24} color="#d4af37" />
                        <h3 style={{ margin: 0 }}>System Metrics</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <span style={{ opacity: 0.7 }}>Total Admins</span>
                            <span style={{ fontWeight: 'bold', color: '#d4af37' }}>{adminsList.length}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <span style={{ opacity: 0.7 }}>Environment</span>
                            <span style={{ fontWeight: 'bold', color: '#00D95F' }}>Production Node</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
