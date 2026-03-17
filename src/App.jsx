import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import SupportWidget from './components/SupportWidget';
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Success = React.lazy(() => import('./pages/Success'));
const Cancel = React.lazy(() => import('./pages/Cancel'));
const AdminProducts = React.lazy(() => import('./pages/AdminProducts'));
const Shipping = React.lazy(() => import('./pages/Shipping'));
const Returns = React.lazy(() => import('./pages/Returns'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Profile = React.lazy(() => import('./pages/Profile'));
import './styles/index.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SocketProvider>
            <div className={`app ${theme}`}>
              <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
              <main>
                <React.Suspense fallback={<div className="loader" style={{ padding: '8rem', textAlign: 'center' }}>Initializing...</div>}>
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
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </React.Suspense>
              </main>

              <SupportWidget />

              <footer className="footer-premium" style={{ background: 'var(--footer-bg)', color: 'var(--footer-text)', padding: '5rem 0 2rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '4rem' }}>
                  {/* OUR GOAL */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Our Goal</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6' }}>
                      HubMart brings the world's flavors to Orpington, ensuring quality and authenticity in every product.
                    </p>
                  </div>

                  {/* HOURS */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Hours</h4>
                    <div style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.8' }}>
                      <p>Mon - Thu: 9 AM - 8 PM</p>
                      <p>Fri - Sun: 9 AM - 9 PM</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <a href="https://www.instagram.com/HUBMARTUK" style={{ color: 'white', opacity: 0.6 }}><Instagram size={20} /></a>
                      <a href="https://www.facebook.com/HUBMARTUK" style={{ color: 'white', opacity: 0.6 }}><Facebook size={20} /></a>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Location</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6', display: 'flex', gap: '0.75rem' }}>
                      <MapPin size={20} style={{ flexShrink: 0, color: '#d4af37' }} />
                      <span>172 Petts Wood Road, BR5-1LG, Orpington, UNITED KINGDOM</span>
                    </p>
                  </div>

                  {/* CONTACT */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Contact</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <a href="tel:+447377399511" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Phone size={18} style={{ color: '#d4af37' }} /> +44 7377 399511
                      </a>
                      <a href="mailto:info@hubmart.uk" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Mail size={18} style={{ color: '#d4af37' }} /> info@hubmart.uk
                      </a>
                    </div>
                    <a href="https://wa.me/447377399511" target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: '#00D95F',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      width: 'fit-content',
                      transition: '0.3s'
                    }}>
                      <MessageCircle size={22} fill="white" /> CONTACT US
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', textAlign: 'center' }}>
                  <p style={{ opacity: 0.5, fontSize: '0.85rem', letterSpacing: '1px' }}>
                    © 2026 | HubMart | Developed by Techmire Solutions
                  </p>
                </div>
              </footer>
            </div>
                </SocketProvider>
              </CartProvider>
            </AuthProvider>
          </Router>
  );
};

export default App;
