import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const verifyStock = async (productSlug) => {
        try {
            const res = await api.get(`/store/products/${productSlug}/check_stock/`);
            return res.data; // { stock: 12, is_low_stock: false }
        } catch (err) {
            console.error("Stock check failed", err);
            return null;
        }
    };

    const addToCart = async (product, quantity = 1) => {
        // First check if it's a local demo product
        const isLocal = !product.slug || product.id.toString().startsWith('demo-');
        let currentStock = product.stock_quantity;

        if (!isLocal) {
            const stockInfo = await verifyStock(product.slug);
            if (stockInfo) {
                currentStock = stockInfo.stock;
            }
        }

        if (currentStock < quantity) {
            return { success: false, message: "Insufficient stock" };
        }

        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
            if (existingItem.quantity + quantity > currentStock) {
                return { success: false, message: "Limit reached" };
            }
            setItems(items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
        } else {
            setItems([...items, { ...product, quantity }]);
        }
        return { success: true };
    };

    const removeFromCart = (productId) => {
        setItems(items.filter((item) => item.id !== productId));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, verifyStock }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
