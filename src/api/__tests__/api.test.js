import axios from 'axios';
import { getProductById, getProducts, addToCart } from '../api';

vi.mock('axios');

describe('api.js', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('debe obtener un producto por ID', async () => {
        const mockData = { id: '1', name: 'iPhone X' };
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getProductById('1');

        expect(axios.get).toHaveBeenCalledWith('/api/product/1');
        expect(result).toEqual(mockData);
    });

    it('debe obtener todos los productos', async () => {
        const mockList = [{ id: '1', name: 'iPhone' }];
        axios.get.mockResolvedValue({ data: mockList });

        const result = await getProducts();

        expect(axios.get).toHaveBeenCalledWith('/api/product');
        expect(result).toEqual(mockList);
    });

    it('debe añadir al carrito', async () => {
        const mockResponse = { count: 2 };
        axios.post.mockResolvedValue({ data: mockResponse });

        const result = await addToCart('1', 'COLOR1', 'STORAGE1');

        expect(axios.post).toHaveBeenCalledWith('/api/cart', {
            id: '1',
            colorCode: 'COLOR1',
            storageCode: 'STORAGE1'
        });

        expect(result).toEqual(mockResponse);
    });
});
