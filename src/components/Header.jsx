import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import '../styles/header.css';

export default function Header() {
    const {cartCount} = useContext(CartContext);
    return (
        <header>
            <Link to="/" className="logo-link">
                <img src="/og-image.png" alt="ITX Shop logo" className="logo-img" /> <h1>ITX Shop</h1>
            </Link>


            <div className="cart-count">🛒 {cartCount}</div>
        </header>
    );
}
