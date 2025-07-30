import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {addToCart, getProductById} from '../api/api';
import useFetchWithCache from '../hooks/useFetchWithCache';
import {CartContext} from '../context/CartContext';

export default function ProductDetailPage() {
    const {id} = useParams();
    const {addToCart: addToCartContext} = useContext(CartContext);

    const product = useFetchWithCache(`product-${id}`, () => getProductById(id));
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);

    const isAvailable = product && product.price !== undefined && product.price !== null && product.price !== '';

    useEffect(() => {
        if (!product) return;

        if (!selectedStorage && product.options?.storages?.length > 0) {
            setSelectedStorage((prev) => prev ?? product.options.storages[0].code);
        }

        if (!selectedColor && product.options?.colors?.length > 0) {
            setSelectedColor((prev) => prev ?? product.options.colors[0].code);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);


    const handleAddToCart = async () => {
        if (!isAvailable || isAdding) return;

        setIsAdding(true);
        try {
            const res = await addToCart(product.id, selectedColor, selectedStorage);

            addToCartContext(res.count);

            setAddSuccess(true);
            setTimeout(() => setAddSuccess(false), 2000);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    if (!product) return <div className="loading">Cargando producto...</div>;

    return (
        <div className="product-detail">
            <div className="product-image">
                <img src={product.imgUrl} alt={product.model}/>
            </div>

            <div className="product-info">
                <h1>{product.brand} {product.model}</h1>
                <p className={isAvailable ? 'price' : 'unavailable'}>
                    {isAvailable ? `${product.price}€` : 'Producto agotado'}
                </p>

                <div className="specs">
                    <p><strong>CPU:</strong> {product.cpu}</p>
                    <p><strong>RAM:</strong> {product.ram}</p>
                    <p><strong>Sistema Operativo:</strong> {product.os}</p>
                    <p><strong>Pantalla:</strong> {product.displayResolution}</p>
                    <p><strong>Batería:</strong> {product.battery}</p>
                    <p><strong>Cámaras:</strong> {product.primaryCamera} / {product.secondaryCmera}</p>
                    <p><strong>Dimensiones:</strong> {product.dimentions}</p>
                    <p><strong>Peso:</strong> {product.weight} g.</p>
                </div>

                {isAvailable && (
                    <>
                        <div className="selectors">
                            <div className="selector-group">
                                <label>Almacenamiento:</label>
                                <select
                                    value={selectedStorage}
                                    onChange={(e) => setSelectedStorage(e.target.value)}
                                    disabled={isAdding}
                                >
                                    {product.options.storages.map((s) => (
                                        <option key={s.code} value={s.code}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="selector-group">
                                <label>Color:</label>
                                <select
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    disabled={isAdding}
                                >
                                    {product.options.colors.map((c) => (
                                        <option key={c.code} value={c.code}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="actions">
                            <button
                                className={`add-button ${isAdding ? 'adding' : ''} ${addSuccess ? 'success' : ''}`}
                                onClick={handleAddToCart}
                                disabled={!isAvailable || isAdding}
                            >
                                {isAdding ? 'Añadiendo...' :
                                    addSuccess ? '✓ Añadido!' : 'Añadir al carrito'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}