import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <motion.div 
            className="container fade-in" 
            style={{ padding: '5rem 2rem', maxWidth: '800px', minHeight: '60vh' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 style={{ marginBottom: '2rem', fontSize: '3rem' }}>Privacy Policy</h1>
            <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', backgroundColor: 'var(--bg-card)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Data Collection</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>We only collect the absolute minimum information required to successfully process and ship your orders. This includes your name, shipping address, and email.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>Data Security</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>Your personal data is strictly protected behind enterprise-grade security partitions. We do not store raw card details under any circumstances; all payments are processed safely through Stripe.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>Third Parties</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.8' }}>We never sell your data. We merely provide necessary identifiers to our trusted shipping couriers so they can deliver your artisanal goods directly to your door.</p>
            </div>
        </motion.div>
    );
};

export default Privacy;
