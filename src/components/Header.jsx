import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../context/CartContext';

export default function Header() {
    const {cartCount} = useContext(CartContext);
    return (
        <header>
            <Link to="/">📱 ITX Shop</Link>

            <div className="cart-count">🛒 {cartCount}</div>
        </header>
    );
}
