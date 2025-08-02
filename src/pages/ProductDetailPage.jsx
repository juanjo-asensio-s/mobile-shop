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
    const hasWeight =  product && product.weight !== undefined && product.weight !== null && product.weight !== '';

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
        <div className="detail-container">
            <div className="image-section">
                <img src={product.imgUrl} alt={product.model} />
            </div>

            <div className="info-section">
                <h2>{product.brand} {product.model}</h2>
                {isAvailable ? (<p className={`product-price ${isAvailable ? 'price-available' : 'unavailable'}`}>
                    {product.price} €</p>) : <p></p>}
                <div className="selector-group">
                    <label>Color:</label>
                    <div className="color-options">
                        {product.options.colors.map((color) => (
                            <div
                                key={color.code}
                                className={`color-box ${selectedColor === color.code ? 'selected' : ''}`}
                                style={{ backgroundColor: color.name.toLowerCase() }}
                                title={color.name}
                                onClick={() => setSelectedColor(color.code)}
                            />
                        ))}
                    </div>
                </div>

                <ul>
                    <li><strong>CPU:</strong> {product.cpu}</li>
                    <li><strong>RAM:</strong> {product.ram}</li>
                    <li><strong>Sistema Operativo:</strong> {product.os}</li>
                    <li><strong>Tamaño Pantalla:</strong> {product.displayResolution}</li>
                    <li><strong>Tipo Pantalla:</strong> {product.displayType}</li>
                    <li><strong>Batería:</strong> {product.battery}</li>
                    <li><strong>Cámaras:</strong> {product.primaryCamera} / {product.secondaryCamera}</li>
                    <li><strong>Dimensiones:</strong> {product.dimentions}</li>
                    {hasWeight && (
                        <li><strong>Peso:</strong> {product.weight} g</li>
                    )}
                </ul>
            </div>

            <div className="actions-section">
                <label>
                    Almacenamiento:
                    <select>{product.options?.storages?.map(o => (
                        <option key={o.code} value={o.code}>{o.name}</option>
                    ))}</select>
                </label>

                {isAvailable ? (
                    <button
                        className={`add-button ${isAdding ? 'adding' : ''} ${addSuccess ? 'success' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? 'Añadiendo...' :
                            addSuccess ? '✓ Añadido!' : 'Añadir al carrito'}
                    </button>
                ) : (
                    <button className="add-button disabled" disabled>
                        Producto agotado
                    </button>
                )}
            </div>
        </div>

    );
}