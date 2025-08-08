import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/product-card.css';

export default function ProductCard({product}) {
    const isAvailable = product.price !== undefined && product.price !== null && product.price !== '';

    return (
        <Link to={`/product/${product.id}`} className={`product-card ${!isAvailable ? 'unavailable' : ''}`}>
            <img
                src={product.imgUrl}
                alt={product.model}
                className="product-image"
            />
            <div className="product-title">{product.brand} {product.model}</div>
            <p className={isAvailable ? 'product-card-price' : 'out-of-stock'}>
                {isAvailable ? `${product.price} €` : 'Agotado'}
            </p>
        </Link>
    );
}
