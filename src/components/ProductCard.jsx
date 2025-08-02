import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductCard({product}) {
    const isAvailable = product.price !== undefined && product.price !== null && product.price !== '';

    return (
        <Link to={`/product/${product.id}`} className={`product-card ${!isAvailable ? 'unavailable' : ''}`}>
            <img
                src={product.imgUrl}
                alt={product.model}
                className="w-full h-40 object-contain"
            />
            <div className="product-title">{product.brand} {product.model}</div>
            <p className={isAvailable ? '' : 'out-of-stock'}>
                {isAvailable ? `${product.price} €` : 'Agotado'}
            </p>
        </Link>
    );
}
