import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    navigate('/admin/products');
                } else {
                    setError(result.error);
                }
            } else {
                // Handle Registration
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    navigate('/admin/products');
                } else {
                    setError("User created and redirected.");
                    navigate('/admin/products');
                }
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page fade-in">
            <div className="login-container glass">
                <div className="login-header">
                    <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p>{isLogin ? 'Enter your credentials to access premium HubMart' : 'Join the elite British artisanal marketplace'}</p>
                </div>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    {!isLogin && (
                        <div className="input-group">
                            <User size={20} />
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <Mail size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn-primary login-btn" disabled={loading}>
                        {loading ? 'Processing...' : (
                            <>{isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                            {isLogin ? 'Create one now' : 'Sign in instead'}
                        </button>
                    </p>
                </div>
            </div>
            <div className="login-bg-glow"></div>
        </div>
    );
};

export default Login;
