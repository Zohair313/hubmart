import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const currentCategory = searchParams.get('category') || '';

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const res = await api.get('/store/categories/');
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = '/store/products/';
                const params = new URLSearchParams();
                if (currentCategory) params.append('category__slug', currentCategory);
                if (searchQuery) params.append('search', searchQuery);

                const res = await api.get(`${url}?${params.toString()}`);
                setProducts(res.data.results || res.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
            setLoading(false);
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [currentCategory, searchQuery]);

    const handleCategoryClick = (slug) => {
        if (slug === currentCategory) {
            searchParams.delete('category');
        } else {
            searchParams.set('category', slug);
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="products-page container fade-in">
            <header className="page-header">
                <h1>Premium <span>Catalogue</span></h1>
                <p>Explore the finest British selection with real-time stock assurance.</p>
            </header>

            <div className="products-layout">
                <aside className="sidebar">
                    <div className="filter-group">
                        <h3 className="filter-title"><Filter size={18} /> Categories</h3>
                        <ul className="category-list">
                            <li
                                className={!currentCategory ? 'active' : ''}
                                onClick={() => { searchParams.delete('category'); setSearchParams(searchParams); }}
                            >
                                All Collections
                            </li>
                            {categories.map((cat) => (
                                <li
                                    key={cat.id}
                                    className={currentCategory === cat.slug ? 'active' : ''}
                                    onClick={() => handleCategoryClick(cat.slug)}
                                >
                                    {cat.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="products-main">
                    <div className="toolbar glass">
                        <div className="search-box">
                            <SearchIcon size={20} />
                            <input
                                type="text"
                                placeholder="Find an artisanal gem..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="results-count">
                            Found <strong>{products.length}</strong> premium items
                        </div>
                    </div>

                    {loading ? (
                        <div className="loader">Synchronizing Ledger...</div>
                    ) : (
                        <div className="products-grid">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="no-results">
                                    <h3>No items found matching your criteria.</h3>
                                    <p>Try adjusting your filters or search terms.</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
