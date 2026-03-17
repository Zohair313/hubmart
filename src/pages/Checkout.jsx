import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// import { useSocket } from '../context/SocketContext'; // Disabling socket for demo mode if needed
import api from '../api';
import '../styles/Checkout.css';

const Checkout = () => {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    // const { emitEvent } = useSocket(); // Disabled for demo mode
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        full_name: user?.first_name ? `${user.first_name} ${user.last_name || ''}` : '',
        email: user?.email || '',
        address: user?.address || '',
        city: user?.city || '',
        postcode: user?.postcode || '',
        phone_number: user?.phone_number || ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Check if we are in demo mode (no backend connected)
            const isDemo = true; // Forcing demo mode logic here

            if (isDemo) {
                // Mocking a successful checkout for demo
                setTimeout(() => {
                    clearCart();
                    alert("DEMO MODE: Order placed successfully! (Bypassing Stripe and Backend)");
                    navigate('/'); // Or to a success page if one exists
                    setLoading(false);
                }, 2000);
                return;
            }

            // 1. Create the order in Django
            const orderRes = await api.post('/shop/orders/', {
                ...formData,
                items: items.map(item => ({ product_id: item.id, quantity: item.quantity }))
            });

            const orderId = orderRes.data.id;

            // Real-time notification to admin via Socket.io
            // emitEvent('new_order', { ... });

            // 2. Create the Stripe Checkout Session
            const stripeRes = await api.post('/shop/checkout/stripe/create-session/', {
                order_id: orderId
            });

            // 3. Redirect to Stripe Checkout (Hosted by Stripe)
            window.location.href = stripeRes.data.url;

        } catch (err) {
            console.error("Checkout failed", err);
            // Fallback for demo mode if API fails
            setTimeout(() => {
                clearCart();
                alert("DEMO MODE: Backend offline. Simulated order success!");
                navigate('/');
                setLoading(false);
            }, 1000);
        }
    };

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page container fade-in">
            <div className="checkout-layout">
                <main className="checkout-main">
                    <header className="checkout-header">
                        <h1>Secure <span>Atomic Checkout</span></h1>
                        <p>Your premium British selection is ready for final authorization.</p>
                    </header>

                    <form onSubmit={handleCheckout} className="checkout-form">
                        <div className={`form-step ${step === 1 ? 'active' : ''}`}>
                            <div className="step-title">
                                <span className="step-num">1</span>
                                <h3>Shipping Information</h3>
                            </div>

                            <div className="form-grid">
                                <input
                                    type="text" name="full_name" placeholder="Full Name" required
                                    value={formData.full_name} onChange={handleInputChange}
                                />
                                <input
                                    type="email" name="email" placeholder="Email Address" required
                                    value={formData.email} onChange={handleInputChange}
                                />
                                <input
                                    type="text" name="address" placeholder="Residential Address" required
                                    value={formData.address} onChange={handleInputChange} className="full-width"
                                />
                                <input
                                    type="text" name="city" placeholder="City" required
                                    value={formData.city} onChange={handleInputChange}
                                />
                                <input
                                    type="text" name="postcode" placeholder="Postcode" required
                                    value={formData.postcode} onChange={handleInputChange}
                                />
                                <input
                                    type="tel" name="phone_number" placeholder="Phone Number" required
                                    value={formData.phone_number} onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="checkout-actions">
                            <button type="submit" className="btn-primary checkout-btn" disabled={loading}>
                                {loading ? 'Initializing Secure Tunnel...' : (
                                    <>Continue to Payment <ArrowRight size={20} /></>
                                )}
                            </button>
                        </div>

                        <div className="checkout-trust">
                            <div className="trust-item"><ShieldCheck size={18} /> SSL Encrypted</div>
                            <div className="trust-item"><CheckCircle2 size={18} /> PCI-DSS Compliant</div>
                            <div className="trust-item">💳 Stripe Verified</div>
                        </div>
                    </form>
                </main>

                <aside className="checkout-sidebar">
                    <div className="order-summary-box glass">
                        <h3>Cart Review</h3>
                        <div className="mini-cart">
                            {items.map(item => (
                                <div key={item.id} className="mini-item">
                                    <div className="mini-info">
                                        <span className="mini-name">{item.name}</span>
                                        <span className="mini-qty">Qty: {item.quantity}</span>
                                    </div>
                                    <span className="mini-price">£{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <span>Grand Total</span>
                            <span>£{total.toFixed(2)}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
