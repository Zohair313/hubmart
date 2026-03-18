import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loadingState, setLoadingState] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoadingState(true);

        try {
            const res = await login(email, password, true); // true for isAdminLogin
            if (res.success) {
                navigate('/admin/dashboard');
            } else {
                setError(res.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoadingState(false);
        }
    };

    return (
        <div className="login-page fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="login-card glass" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}>
                        <Shield size={36} color="#d4af37" />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Restricted <span className="text-gradient">Access</span></h1>
                    <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>HubMart Administration Portal</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444', padding: '1rem', marginBottom: '2rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.9 }}>Admin Email</label>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type="email" 
                                placeholder="Enter Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '8px', color: 'var(--input-text)' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.9 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type="password" 
                                placeholder="Enter Administrator Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '8px', color: 'var(--input-text)' }}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loadingState}
                        style={{ 
                            background: '#d4af37', color: '#0f172a', padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', border: 'none', cursor: 'pointer', marginTop: '1rem',
                            transition: '0.3s'
                        }}
                        className="hover-lift"
                    >
                        {loadingState ? <Loader className="spin" size={20} /> : 'Secure Login'} 
                        {!loadingState && <ArrowRight size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
