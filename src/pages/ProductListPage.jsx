import React, {useState} from 'react';
import useFetchWithCache from '../hooks/useFetchWithCache';
import {getProducts} from '../api/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function ProductListPage() {
    const products = useFetchWithCache('products', getProducts);
    const [searchTerm, setSearchTerm] = useState('');

    if (!products) return <div className="p-4">Cargando productos...</div>;

    const filteredProducts = products.filter((p) =>
        `${p.brand} ${p.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="centered-header">
                <h1>Listado de productos</h1>
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>


            <div className="grid-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No se encontraron productos.</p>
                )}
            </div>
        </div>

    );
}
