import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="container hero-grid">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="badge">✨ Premium Selection</div>
                    <h1 className="hero-title">Experience the Finest <span>British Quality</span></h1>
                    <p className="hero-description">
                        From artisanal grains to premium pantry essentials, HubMart brings the best of the UK
                        directly to your doorstep with real-time stock assurance and atomic speed.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary">Shop Collection <ArrowRight size={20} /></button>
                        <button className="btn-outline">Learn More</button>
                    </div>

                    <div className="hero-features">
                        <div className="feature"><Star size={18} /> Artisan Selected</div>
                        <div className="feature"><ShieldCheck size={18} /> Premium Quality</div>
                        <div className="feature"><Truck size={18} /> Next Day Delivery</div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-image-wrapper"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-glow"></div>
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                        alt="Premium Groceries"
                        className="hero-img"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
