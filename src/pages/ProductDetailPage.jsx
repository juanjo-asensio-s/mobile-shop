import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {addToCart, getProductById} from '../api/api';
import useFetchWithCache from '../hooks/useFetchWithCache';
import {CartContext} from '../context/CartContext';
import {
    faMicrochip,
    faMemory,
    faMobileScreenButton,
    faCamera,
    faArrowsUpDownLeftRight,
    faWeightHanging,
    faMobileAndroid,
    faRuler,
    faTag,
    faBarcode,
    faBattery4,
    faCameraRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaShoppingCart} from "react-icons/fa";
import '../styles/product-detail.css';


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

    useEffect(() => {
        if (product) {
            document.title = `${product.brand} ${product.model} - ITX Shop`;

            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', document.title);

            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', `Consulta las características del ${product.brand} ${product.model} y añádelo al carrito.`);

            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) ogImage.setAttribute('content', `${product.imgUrl}` );

            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute('content', window.location.href);
        }
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
                <ul className="specs-list">
                    <li>
                        <FontAwesomeIcon icon={faTag} /> <strong>Marca:</strong> {product.brand}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBarcode} /> <strong>Modelo:</strong> {product.model}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faMicrochip} /> <strong>CPU:</strong> {product.cpu}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faMemory} /> <strong>RAM:</strong> {product.ram}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faMobileAndroid} /> <strong>Sistema Operativo:</strong> {product.os}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faMobileScreenButton} /> <strong>Pantalla:</strong> {product.displayResolution} / {product.displayType}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faArrowsUpDownLeftRight} /> <strong>Resolución:</strong> {product.displaySize}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBattery4} /> <strong>Batería:</strong> {product.battery}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCamera} /> <strong>Cámara principal:</strong> {Array.isArray(product.primaryCamera) ? product.primaryCamera.join(' ') : product.primaryCamera}
                    </li>
                    {product.secondaryCmera && (
                    <li>
                        <FontAwesomeIcon icon={faCameraRotate} /> <strong>Cámara frontal:</strong> {Array.isArray(product.secondaryCmera) ? product.secondaryCmera.join(' ') : product.secondaryCmera}
                    </li>
                    )}
                    <li>
                        <FontAwesomeIcon icon={faRuler} /> <strong>Dimensiones:</strong> {product.dimentions}
                    </li>
                    {hasWeight && (
                        <li>
                            <FontAwesomeIcon icon={faWeightHanging} /> <strong>Peso:</strong> {product.weight} g
                        </li>
                    )}
                </ul>
            </div>

            <div className="actions-section">
                <div className="selector-group">
                    <div className="color-options"><label><b>Color:</b></label>
                        {product.options.colors.map((color) => (
                            <div
                                key={color.code}
                                className={`color-box-wrapper ${selectedColor === color.code ? 'selected' : ''}`}
                                onClick={() => setSelectedColor(color.code)}
                            >
                                <div
                                    className="color-box"
                                    style={{ backgroundColor: color.name.split(' ').pop().toLowerCase() }}
                                    title={color.name}
                                />
                                <span className="color-name">{color.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="selector-group">
                    <label><b>Almacenamiento:&nbsp;</b></label>
                        {product.options?.storages?.map((o) => (
                            <button
                                key={o.code}
                                type="button"
                                className={`storage-button ${selectedStorage === o.code ? 'selected' : ''}`}
                                onClick={() => setSelectedStorage(o.code)}
                            >
                                {o.name}
                            </button>
                        ))}
                </div>

                {isAvailable ? (
                    <button
                        className={`add-button ${isAdding ? 'adding' : ''} ${addSuccess ? 'success' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? 'Añadiendo...' :
                            addSuccess ? '✓ Añadido!' :  (<><FaShoppingCart style={{ marginRight: '8px' }} /> Añadir al carrito</>)
                        }
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