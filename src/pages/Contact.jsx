import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <motion.div 
            className="container fade-in" 
            style={{ padding: '5rem 2rem', maxWidth: '800px', minHeight: '60vh' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 style={{ marginBottom: '2rem', fontSize: '3rem' }}>Contact Support</h1>
            <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', backgroundColor: 'var(--bg-card)' }}>
                <h3 style={{ marginBottom: '1rem' }}>We're here to help</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>Contacting us is easy. Whether you have a question about our artisanal stock, or need assistance modifying an order, our dedicated team is on standby.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>Email Support</h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.8' }}>Email us at support@hubmart.uk and we'll aim to reply within 2 hours during normal business hours.</p>
                
                <h3 style={{ marginBottom: '1rem' }}>Hours of Operation</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.8' }}>Monday - Friday: 8:00 AM - 6:00 PM GMT<br/>Saturday: 9:00 AM - 1:00 PM GMT<br/>Sunday: Closed</p>
            </div>
        </motion.div>
    );
};

export default Contact;
