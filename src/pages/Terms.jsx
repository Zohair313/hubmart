import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <motion.div 
            className="container fade-in" 
            style={{ padding: '5rem 2rem', maxWidth: '800px', minHeight: '60vh' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 style={{ marginBottom: '2rem', fontSize: '3rem' }}>Terms of Service</h1>
            <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', backgroundColor: 'var(--bg-card)' }}>
                <h3 style={{ marginBottom: '1rem' }}>1. Agreement</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>By accessing and placing an order with HubMart, you confirm that you are in agreement with and bound by these Terms of Service.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>2. Pricing and Availability</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>All products are subject to availability. Prices may change periodically, but any variations will not affect orders that have already been confirmed.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>3. Limitation of Liability</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.8' }}>HubMart shall not be liable for any indirect, special, incidental or consequential damages that result from the use of, or the inability to use, our services.</p>
            </div>
        </motion.div>
    );
};

export default Terms;
