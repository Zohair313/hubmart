import React from 'react';
import { motion } from 'framer-motion';

const Returns = () => {
    return (
        <motion.div 
            className="container fade-in" 
            style={{ padding: '5rem 2rem', maxWidth: '800px', minHeight: '60vh' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 style={{ marginBottom: '2rem', fontSize: '3rem' }}>Returns & Refunds</h1>
            <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', backgroundColor: 'var(--bg-card)' }}>
                <h3 style={{ marginBottom: '1rem' }}>No-Hassle Returns</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>If you are not entirely satisfied with your purchase, let us know within 14 days. We simply ask that the item is returned in its original condition and packaging.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>Refund Process</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>Refunds are automatically processed to their original payment method. Depending on your bank, it may take 3-5 business days to appear on your statement after we have processed the return.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>Exceptions</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.8' }}>For hygiene and safety reasons, perishable goods cannot be returned if they have been opened, unless they arrived damaged or spoiled.</p>
            </div>
        </motion.div>
    );
};

export default Returns;
