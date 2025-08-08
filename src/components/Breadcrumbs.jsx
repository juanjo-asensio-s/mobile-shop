import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {getProductById} from '../api/api';
import '../styles/Breadcrumbs.css';

export default function Breadcrumbs() {
    const location = useLocation();
    const [productName, setProductName] = useState(null);
    const pathnames = location.pathname.split('/').filter(Boolean);

    useEffect(() => {
        const pathnames = location.pathname.split('/').filter(Boolean);
        if (pathnames[0] === 'product' && pathnames[1]) {
            getProductById(pathnames[1]).then((p) => {
                if (p) setProductName(p.brand + ' ' + p.model);
            });
        } else {
            setProductName(null);
        }
    }, [location.pathname]);


    return (
        <nav className="breadcrumbs-nav">
            <Link to="/">Inicio</Link>
            {pathnames[0] === 'product' && productName && (
                <>
                    <span> {'>'} </span>
                    <span>{productName}</span>
                </>
            )}
        </nav>
    );
}
