import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Status.css';

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart on successful transaction back-link
        clearCart();
    }, []);

    return (
        <div className="status-page container fade-in">
            <div className="status-card glass success">
                <div className="status-icon"><CheckCircle size={64} /></div>
                <h1>Payment Successful!</h1>
                <p>Order ID: <strong>{sessionId ? sessionId.substring(0, 12) : '---'}</strong></p>
                <div className="status-details">
                    <p>Your premium selection is now being processed by our artisanal fulfillment team. You will receive a confirmation email shortly.</p>
                </div>
                <div className="status-actions">
                    <Link to="/products" className="btn-primary"><Package size={20} /> Continue Shopping</Link>
                    <Link to="/" className="btn-outline"><Home size={20} /> Back Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
