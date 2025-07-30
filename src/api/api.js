import axios from 'axios';

const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export const getProducts = () => axios.get(`${BASE_URL}/product`).then(res => res.data);

export const getProductById = (id) => axios.get(`${BASE_URL}/product/${id}`).then(res => res.data);

export const addToCart = (id, colorCode, storageCode) => axios.post(`${BASE_URL}/cart`, {
    id,
    colorCode,
    storageCode
}).then(res => res.data);