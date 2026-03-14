import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ShoppingBag, ArrowLeft, Home } from 'lucide-react';
import '../styles/Status.css';

const Cancel = () => {
    return (
        <div className="status-page container fade-in">
            <div className="status-card glass cancel">
                <div className="status-icon"><XCircle size={64} /></div>
                <h1>Checkout Cancelled</h1>
                <p>Your atomic checkout was aborted. Your premium selection is still in your cart.</p>
                <div className="status-details">
                    <p>If you encountered an issue with your payment method, please try again or contact our support team.</p>
                </div>
                <div className="status-actions">
                    <Link to="/cart" className="btn-primary"><ShoppingBag size={20} /> Return to Cart</Link>
                    <Link to="/" className="btn-outline"><Home size={20} /> Back Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
