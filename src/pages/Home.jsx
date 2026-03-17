import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Smartphone, CreditCard, Clock } from 'lucide-react';
import api from '../api';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await api.get('/store/products/?limit=4');
                const apiProducts = res.data.results || res.data;
                const localProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
                setProducts([...localProducts, ...apiProducts].slice(0, 8));
            } catch (err) {
                console.error("Failed to fetch featured products, using local only", err);
                const localProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
                setProducts(localProducts);
            }
            setLoading(false);
        };
        fetchFeatured();
    }, []);

    return (
        <div className="home-page fade-in">
            <Hero />

            <section className="features-section">
                <div className="ticker-container">
                    <div className="ticker-track">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="features-grid">
                                <div className="feature-card">
                                    <Package size={32} />
                                    <div className="feature-info">
                                        <h3>Secure Packaging</h3>
                                        <p>British standards in every box</p>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <Smartphone size={32} />
                                    <div className="feature-info">
                                        <h3>Live Tracking</h3>
                                        <p>Real-time delivery pulse</p>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <CreditCard size={32} />
                                    <div className="feature-info">
                                        <h3>Secure Checkout</h3>
                                        <p>PCI-DSS Stripe compliance</p>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <Clock size={32} />
                                    <div className="feature-info">
                                        <h3>Fast Delivery</h3>
                                        <p>UK-wide next day arrival</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="featured-section container">
                <div className="section-header">
                    <div className="headline">
                        <span className="accent-line"></span>
                        <h2>Premium Selection</h2>
                    </div>
                    <p>Hand-picked artisanal goods from our finest vendors.</p>
                </div>

                {loading ? (
                    <div className="loader">Refreshing Stock...</div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <section className="cta-section container">
                <motion.div
                    className="cta-card"
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="cta-content">
                        <h2>Join the Premium <span>HubMart</span> Loyalty</h2>
                        <p>Subscribe for exclusive artisanal drops and automated restocks.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email" required />
                            <button className="btn-accent">Subscribe</button>
                        </form>
                    </div>
                    <div className="cta-glow"></div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
