import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductCard({product}) {
    const isAvailable = product.price !== undefined && product.price !== null && product.price !== '';

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <img src={product.imgUrl} alt={product.model} className="w-full h-40 object-contain"/>
            <h2>{product.brand} {product.model}</h2>
            <p className={isAvailable ? '' : 'text-red-600 font-semibold'}>
                {isAvailable ? `${product.price}€` : 'Agotado'}
            </p>
        </Link>
    );
}
