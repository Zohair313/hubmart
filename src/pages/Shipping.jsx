import React from 'react';
import { motion } from 'framer-motion';

const Shipping = () => {
    return (
        <motion.div 
            className="container fade-in" 
            style={{ padding: '5rem 2rem', maxWidth: '800px', minHeight: '60vh' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 style={{ marginBottom: '2rem', fontSize: '3rem' }}>Shipping Policy</h1>
            <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', backgroundColor: 'var(--bg-card)' }}>
                <h3 style={{ marginBottom: '1rem' }}>UK Delivery</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>We offer rapid, next-day delivery on all our artisanal goods across the UK. Orders placed before 3 PM will be dispatched the same day via fully tracked, temperature-controlled courier services.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>International Shipping</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>Currently, we are focusing exclusively on the UK market to maintain our stringent quality controls. We plan to expand to mainland Europe next year.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>Packaging</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.8' }}>All items are packed using sustainable, premium materials designed to keep your goods safe while maintaining our commitment to the environment.</p>
            </div>
        </motion.div>
    );
};

export default Shipping;
