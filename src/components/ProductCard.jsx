import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [adding, setAdding] = React.useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        
        if (!user) {
            alert("Please log in to add items to your cart.");
            navigate('/login');
            return;
        }

        setAdding(true);
        const result = await addToCart(product);
        if (!result.success) {
            alert(result.message);
        }
        setTimeout(() => setAdding(false), 800);
    };

    return (
        <motion.div
            className="product-card"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div className="product-image-container">
                {product.is_low_stock && (
                    <div className="stock-badge low">
                        <AlertCircle size={14} /> Low Stock: Only {product.stock_quantity}
                    </div>
                )}
                <img
                    src={product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"}
                    alt={product.name}
                    className="product-image"
                />
                <div className="product-overlay">
                    <button className="overlay-btn"><Eye size={20} /></button>
                </div>
            </div>

            <div className="product-info">
                <span className="product-cat">{product.category_name}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-bottom">
                    <span className="product-price">£{product.price}</span>
                    <button
                        className={`add-btn ${adding ? 'adding' : ''}`}
                        onClick={handleAddToCart}
                        disabled={product.stock_quantity === 0}
                    >
                        {product.stock_quantity === 0 ? 'Out of Stock' : (
                            <>{adding ? 'Added!' : <><ShoppingCart size={18} /> Add</>}</>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
