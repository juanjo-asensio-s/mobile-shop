import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {getProductById} from '../api/api';

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
        <nav style={{padding: '1rem', fontSize: '0.9rem'}}>
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
