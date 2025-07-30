import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Header from './components/Header';
import {CartProvider} from './context/CartContext';
import Breadcrumbs from './components/Breadcrumbs';

export default function App() {
    return (
        <CartProvider>
            <Header/>
            <Breadcrumbs/>
            <Routes>
                <Route path="/" element={<ProductListPage/>}/>
                <Route path="/product/:id" element={<ProductDetailPage/>}/>
            </Routes>
        </CartProvider>
    );
}

