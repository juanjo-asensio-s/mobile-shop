import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import ProductListPage from '../ProductListPage';
import {getProducts} from '../../api/api';
import {BrowserRouter} from 'react-router-dom';
import {vi} from 'vitest';

vi.mock('../../api/api', () => ({
    getProducts: vi.fn(),
}));

const mockProducts = [
    {
        id: '1',
        brand: 'Acer',
        model: 'Liquid Jade 2',
        price: '170',
        imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg',
    },
];

describe('ProductListPage', () => {
    it('muestra mensaje si no se encuentran productos tras buscar', async () => {
        getProducts.mockResolvedValueOnce(mockProducts);

        render(
            <BrowserRouter>
                <ProductListPage/>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Acer Liquid Jade 2')).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText(/buscar por marca o modelo/i);
        fireEvent.change(input, {target: {value: 'Samsung'}});

        expect(
            await screen.findByText(/no se encontraron productos/i)
        ).toBeInTheDocument();
    });
});
