import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
    const { items, removeFromCart, addToCart, total, clearCart } = useCart();
    const navigate = useNavigate();

    const updateQuantity = async (item, delta) => {
        if (item.quantity + delta < 1) return;
        const result = await addToCart(item, delta);
        if (!result.success) alert(result.message);
    };

    if (items.length === 0) {
        return (
            <div className="cart-empty container fade-in">
                <div className="empty-content glass">
                    <ShoppingBag size={64} className="empty-icon" />
                    <h1>Your cart is empty</h1>
                    <p>Explore our premium selection and find something extraordinary.</p>
                    <Link to="/products" className="btn-primary">Browse Catalogue</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page container fade-in">
            <header className="page-header">
                <h1>Your <span>Selection</span></h1>
                <p>Review your artisanal items before atomic checkout.</p>
            </header>

            <div className="cart-layout">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item-row glass">
                            <img src={item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200"} alt={item.name} />

                            <div className="item-details">
                                <Link to={`/products/${item.slug}`} className="item-name">{item.name}</Link>
                                <span className="item-category">{item.category_name}</span>
                                <span className="item-price-unit">£{item.price} each</span>
                            </div>

                            <div className="item-quantity">
                                <button onClick={() => updateQuantity(item, -1)} className="qty-btn"><Minus size={16} /></button>
                                <span className="qty-val">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item, 1)} className="qty-btn"><Plus size={16} /></button>
                            </div>

                            <div className="item-total">
                                £{(item.price * item.quantity).toFixed(2)}
                            </div>

                            <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}

                    <div className="cart-footer">
                        <button onClick={clearCart} className="btn-outline">Clear All</button>
                        <Link to="/products" className="btn-outline">Continue Shopping</Link>
                    </div>
                </div>

                <aside className="cart-summary">
                    <div className="summary-card glass">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>£{total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free">Calculated at Checkout</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Estimated Total</span>
                            <span>£{total.toFixed(2)}</span>
                        </div>

                        <button
                            className="btn-primary checkout-btn"
                            onClick={() => navigate('/checkout')}
                        >
                            Atomic Checkout <ArrowRight size={20} />
                        </button>

                        <div className="trust-badges">
                            <span>🔒 256-bit SSL Secure</span>
                            <span>🛡️ Stripe Protected</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
