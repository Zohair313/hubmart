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
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const currentCategory = searchParams.get('category') || '';

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const res = await api.get('/store/categories/');
                setCategories(res.data);
            } catch (err) {
                setCategories([
                    {id: 1, name: 'Grocery', slug: 'grocery'},
                    {id: 2, name: 'Biscuits', slug: 'biscuits'},
                    {id: 3, name: 'Crisps', slug: 'crisps'},
                    {id: 4, name: 'Drinks', slug: 'drinks'}
                ]);
            }
        };
        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            // Priority 1: Load local data IMMEDIATELY (Instant UI)
            const localProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
            const filterLocal = (data) => data.filter(p => {
                const searchLower = searchQuery.toLowerCase();
                const matchesSearch = !searchQuery || 
                    p.name.toLowerCase().includes(searchLower) || 
                    (p.category_name && p.category_name.toLowerCase().includes(searchLower));
                
                const matchesCat = !currentCategory || p.category_slug === currentCategory;
                return matchesSearch && matchesCat;
            });

            const initialLocal = filterLocal(localProducts);
            setProducts(initialLocal.length === 0 && searchQuery ? localProducts : initialLocal);
            setLoading(false); // UI is now populated

            // Priority 2: Try to get API data in background
            try {
                let url = '/store/products/';
                const params = new URLSearchParams();
                if (currentCategory) params.append('category__slug', currentCategory);
                if (searchQuery) params.append('search', searchQuery);

                // Use a short timeout for API to keep it snappy
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 1500); 

                const res = await api.get(`${url}?${params.toString()}`, { signal: controller.signal });
                clearTimeout(timeoutId);

                const apiProducts = res.data.results || res.data;
                const finalFilteredLocal = filterLocal(localProducts);
                
                // Merge and show final list
                setProducts([...finalFilteredLocal, ...apiProducts]);
            } catch (err) {
                // If API fails (offline), we already have local data showing
                console.log("API offline, staying with local data");
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, searchQuery ? 300 : 0); // Only debounce if searching

        return () => clearTimeout(delayDebounceFn);
    }, [currentCategory, searchQuery]);

    const handleCategoryClick = (slug) => {
        if (slug === currentCategory) {
            searchParams.delete('category');
        } else {
            searchParams.set('category', slug);
        }
        setCurrentPage(1); // Reset to first page on category change
        setSearchParams(searchParams);
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        <>
                            <div className="products-grid">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                ) : (
                                    <div className="no-results">
                                        <h3>No items found matching your criteria.</h3>
                                        <p>Try adjusting your filters or search terms.</p>
                                    </div>
                                )}
                            </div>

                            {products.length > productsPerPage && (
                                <div className="pagination-premium glass">
                                    <button 
                                        onClick={() => paginate(currentPage - 1)} 
                                        disabled={currentPage === 1}
                                        className="pag-btn"
                                    >
                                        Prev
                                    </button>
                                    
                                    <div className="page-numbers">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button 
                                                key={i + 1}
                                                onClick={() => paginate(i + 1)}
                                                className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => paginate(currentPage + 1)} 
                                        disabled={currentPage === totalPages}
                                        className="pag-btn"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
