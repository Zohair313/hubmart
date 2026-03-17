import React, { useState, useEffect } from 'react';
import { Package, Plus, Save, ArrowLeft, RefreshCw, Bell, MessageSquare, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import '../styles/AdminProducts.css';

const AdminProducts = () => {
    const { isConnected, socket } = useSocket();
    const [notifications, setNotifications] = useState([]);
    const [supportChats, setSupportChats] = useState({}); // { clientId: { user, messages } }
    const [selectedChat, setSelectedChat] = useState(null);
    const [adminReply, setAdminReply] = useState('');
    
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock_quantity: '',
        low_stock_threshold: '10',
        description: '',
        image: '',
        is_active: true
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (socket && isConnected) {
            socket.emit('join', 'admin');
            
            const handleOrder = (data) => {
                setNotifications(prev => [data, ...prev].slice(0, 5));
            };

            const handleSupportMessage = (data) => {
                setSupportChats(prev => {
                    const existing = prev[data.clientId] || { user: data.user, messages: [] };
                    return {
                        ...prev,
                        [data.clientId]: {
                            ...existing,
                            messages: [...existing.messages, { text: data.message, timestamp: data.timestamp, sender: 'client' }]
                        }
                    };
                });
            };

            socket.on('order_notification', handleOrder);
            socket.on('receive_message', handleSupportMessage);

            return () => {
                socket.off('order_notification', handleOrder);
                socket.off('receive_message', handleSupportMessage);
            };
        }
    }, [socket, isConnected]);

    const sendReply = (e) => {
        e.preventDefault();
        if (!adminReply.trim() || !selectedChat) return;

        socket.emit('admin_message', {
            clientId: selectedChat,
            message: adminReply
        });

        setSupportChats(prev => ({
            ...prev,
            [selectedChat]: {
                ...prev[selectedChat],
                messages: [...prev[selectedChat].messages, { text: adminReply, timestamp: new Date(), sender: 'admin' }]
            }
        }));

        setAdminReply('');
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/store/categories/');
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories, using demo data", err);
                setCategories([
                    {id: 1, name: 'Grocery'},
                    {id: 2, name: 'Biscuits'},
                    {id: 3, name: 'Crisps'},
                    {id: 4, name: 'Drinks'}
                ]);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const selectedCategory = categories.find(c => c.id.toString() === formData.category);
            
            const newProduct = {
                id: `demo-${Date.now()}`,
                ...formData,
                price: parseFloat(formData.price),
                stock_quantity: parseInt(formData.stock_quantity),
                category_name: selectedCategory ? selectedCategory.name : 'Uncategorized',
                category_slug: selectedCategory ? selectedCategory.slug : '',
                slug: formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                image: formData.image || '/img.jpg' // Using custom image or fallback
            };

            // Save to Local Storage for Demo
            const existingProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
            localStorage.setItem('demo_products', JSON.stringify([newProduct, ...existingProducts]));

            // Try real API but don't fail if it's down
            api.post('/store/products/', newProduct).catch(e => console.log("Backend offline, product saved locally only"));

            setMessage({ type: 'success', text: 'DEMO MODE: Product saved to Local Storage!' });
            setFormData({
                name: '',
                category: '',
                price: '',
                stock_quantity: '',
                low_stock_threshold: '10',
                description: '',
                image: '',
                is_active: true
            });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to add product.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-products container fade-in">
            <header className="admin-header">
                <div className="header-top">
                    <Link to="/" className="back-link"><ArrowLeft size={18} /> Back to Store</Link>
                    <h1>Admin <span>Inventory Control</span></h1>
                </div>
                <p>Directly inject new artisanal listings into the HubMart ecosystem. All products added here will appear on the storefront.</p>
            </header>

            <div className="admin-layout">
                <div className="form-card glass">
                    <div className="card-header">
                        <Plus size={24} />
                        <h3>Add New Product</h3>
                    </div>

                    {message.text && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-grid">
                            <div className="input-group full-width">
                                <label>Product Name</label>
                                <input
                                    type="text" name="name" placeholder="e.g. Premium Saffron 10g"
                                    required value={formData.name} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Category</label>
                                <select name="category" required value={formData.category} onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Price (£)</label>
                                <input
                                    type="number" step="0.01" name="price" placeholder="29.99"
                                    required value={formData.price} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Initial Stock</label>
                                <input
                                    type="number" name="stock_quantity" placeholder="50"
                                    required value={formData.stock_quantity} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Low Stock Alert Level</label>
                                <input
                                    type="number" name="low_stock_threshold"
                                    required value={formData.low_stock_threshold} onChange={handleChange}
                                />
                            </div>

                            <div className="input-group full-width">
                                <label>Product Image URL</label>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <input
                                        type="text" name="image" placeholder="Paste image link here (e.g. https://example.com/item.jpg)"
                                        value={formData.image} onChange={handleChange}
                                        style={{ flex: 1 }}
                                    />
                                    {formData.image && (
                                        <div className="img-preview-mini" style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                            <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = '/img.jpg'} />
                                        </div>
                                    )}
                                </div>
                                <small style={{ opacity: 0.6, marginTop: '4px', display: 'block' }}>Leave blank to use default placeholder.</small>
                            </div>

                            <div className="input-group full-width">
                                <label>Product Description</label>
                                <textarea
                                    name="description" placeholder="Describe the artisanal qualities..."
                                    rows="4" value={formData.description} onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox" id="is_active" name="is_active"
                                    checked={formData.is_active} onChange={handleChange}
                                />
                                <label htmlFor="is_active">Live on storefront</label>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                            {loading ? <><RefreshCw className="spin" size={20} /> Deploying...</> : <><Save size={20} /> Add Product</>}
                        </button>
                    </form>
                </div>

                <aside className="admin-sidebar">
                    <div className="stats-card glass">
                        <h4>System Status</h4>
                        <div className="stat-row">
                            <span>Real-Time Engine</span>
                            <span className={`dot ${isConnected ? 'online' : 'offline'}`}></span>
                        </div>
                        {isConnected && (
                            <div className="stat-row">
                                <span style={{ fontSize: '0.7rem', color: '#10b981' }}>ID: {socket?.id?.substring(0,8)}</span>
                            </div>
                        )}
                        <div className="stat-row">
                            <span>Atomic Sync</span>
                            <span className="badge">Active</span>
                        </div>
                    </div>

                    {/* Support Chats Section */}
                    <div className="stats-card glass mt-4">
                        <div className="card-header" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                            <MessageSquare size={18} />
                            <h4 style={{ margin: 0 }}>Active Support</h4>
                        </div>
                        <div className="chats-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {Object.entries(supportChats).length === 0 ? (
                                <p style={{ opacity: 0.5, fontSize: '0.8rem', textAlign: 'center' }}>No active customer chats.</p>
                            ) : (
                                Object.entries(supportChats).map(([id, chat]) => (
                                    <div 
                                        key={id} 
                                        className={`chat-thread-item ${selectedChat === id ? 'selected' : ''}`}
                                        onClick={() => setSelectedChat(id)}
                                        style={{ 
                                            padding: '0.75rem', 
                                            borderRadius: '8px', 
                                            background: selectedChat === id ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.03)',
                                            cursor: 'pointer',
                                            borderLeft: selectedChat === id ? '4px solid #d4af37' : '1px solid transparent'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong>{chat.user}</strong>
                                            <span className="badge" style={{ fontSize: '0.6rem' }}>{chat.messages.length}</span>
                                        </div>
                                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', opacity: 0.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {chat.messages[chat.messages.length - 1].text}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        {selectedChat && (
                            <div className="admin-chat-box mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                <div className="chat-messages" style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '1rem', padding: '0.5rem' }}>
                                    {supportChats[selectedChat].messages.map((m, i) => (
                                        <div key={i} style={{ marginBottom: '0.5rem', textAlign: m.sender === 'admin' ? 'right' : 'left' }}>
                                            <div style={{ 
                                                display: 'inline-block', 
                                                padding: '4px 8px', 
                                                borderRadius: '8px', 
                                                background: m.sender === 'admin' ? '#0f172a' : 'rgba(255,255,255,0.05)',
                                                fontSize: '0.8rem'
                                            }}>
                                                {m.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={sendReply} style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Reply..." 
                                        value={adminReply}
                                        onChange={(e) => setAdminReply(e.target.value)}
                                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                    <button type="submit" style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', background: '#d4af37' }}>
                                        <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    <div className="stats-card glass mt-4">
                        <div className="card-header" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                            <Bell size={18} />
                            <h4 style={{ margin: 0 }}>Recent Alerts</h4>
                        </div>
                        <div className="notifications-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {notifications.length === 0 ? (
                                <p style={{ opacity: 0.5, fontSize: '0.8rem', textAlign: 'center' }}>No recent real-time activity.</p>
                            ) : (
                                notifications.map((n, i) => (
                                    <div key={i} className="notification-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #d4af37' }}>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{n.message}</p>
                                        <small style={{ opacity: 0.6, fontSize: '0.7rem' }}>{new Date(n.timestamp).toLocaleTimeString()}</small>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AdminProducts;
