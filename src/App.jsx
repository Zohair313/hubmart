import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import AdminProducts from './pages/AdminProducts';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<Success />} />
                <Route path="/checkout/cancel" element={<Cancel />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/profile" element={<div className="container" style={{ padding: '5rem' }}><h2>Profile Page Coming Soon</h2><Link to="/" className="btn-primary" style={{ marginTop: '2rem' }}>Back Home</Link></div>} />
              </Routes>
            </main>

            <footer style={{ background: '#0f172a', color: 'white', padding: '4rem 0', marginTop: '6rem' }}>
              <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                <div>
                  <h3 style={{ color: '#d4af37', marginBottom: '1.5rem', fontFamily: 'Playfair Display' }}>HubMart.uk</h3>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>The UK's premier artisanal marketplace with real-time stock assurance and British quality.</p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '1.25rem' }}>Shop</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8, fontSize: '0.9rem' }}>
                    <li><Link to="/products">All Products</Link></li>
                    <li><Link to="/products?cat=grains">Grains & Pulses</Link></li>
                    <li><Link to="/products?cat=oils">Pure Oils</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: '1.25rem' }}>Support</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8, fontSize: '0.9rem' }}>
                    <li><Link to="/shipping">Shipping Policy</Link></li>
                    <li><Link to="/returns">Returns & Refunds</Link></li>
                    <li><Link to="/contact">Contact Support</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: '1.25rem' }}>Legal</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.8, fontSize: '0.9rem' }}>
                    <li><Link to="/terms">Terms of Service</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
              <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
                © 2026 HubMart.uk - All Rights Reserved. Engineered by Antigravity.
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
