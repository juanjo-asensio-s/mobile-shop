import React, {createContext, useEffect, useState} from 'react';

export const CartContext = createContext();

export function CartProvider({children}) {
    const [cartCount, setCartCount] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCount = localStorage.getItem('cartCount');
            return savedCount ? parseInt(savedCount, 10) : 0;
        }
        return 0;
    });

    useEffect(() => {
        localStorage.setItem('cartCount', cartCount.toString());
    }, [cartCount]);

    const addToCart = (quantity) => {
        setCartCount(prevCount => prevCount + quantity);
    };

    const resetCart = () => {
        setCartCount(0);
    };

    return (
        <CartContext.Provider value={{cartCount, addToCart, resetCart}}>
            {children}
        </CartContext.Provider>
    );
}