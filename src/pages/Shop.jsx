import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Filter, Loader } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Shop <span className="text-neon">Collection</span></h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    <Filter size={20} className="text-neon" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                backgroundColor: filter === cat ? 'var(--primary)' : 'transparent',
                                color: filter === cat ? 'var(--bg-dark)' : 'var(--text-light)',
                                border: filter === cat ? '1px solid var(--primary)' : '1px solid #333',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
                    <Loader size={48} className="text-neon" style={{ animation: 'spin 1s linear infinite' }} />
                    <p style={{ color: 'var(--text-gray)' }}>Loading collection...</p>
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : error ? (
                <div style={{ textAlign: 'center', color: 'red', marginTop: '2rem' }}>{error}</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
