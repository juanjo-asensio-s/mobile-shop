// src/components/__tests__/Breadcrumbs.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import Breadcrumbs from '../Breadcrumbs';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from '../../api/api';

vi.mock('../../api/api');

describe('Breadcrumbs', () => {
    it('muestra solo "Inicio" si no estamos en la página de producto', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Breadcrumbs />
            </MemoryRouter>
        );

        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.queryByText('>')).not.toBeInTheDocument();
    });

    it('muestra el breadcrumb con nombre del producto+modelo en ruta /product/:id', async () => {
        api.getProductById.mockResolvedValue({
            brand: 'Apple',
            model: 'iPhone 13'
        });

        render(
            <MemoryRouter initialEntries={['/product/123']}>
                <Routes>
                    <Route path="/product/:id" element={<Breadcrumbs />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Inicio')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Apple iPhone 13')).toBeInTheDocument();
        });
    });

    it('no muestra el nombre si el producto no existe', async () => {
        api.getProductById.mockResolvedValue(null);

        render(
            <MemoryRouter initialEntries={['/product/456']}>
                <Routes>
                    <Route path="/product/:id" element={<Breadcrumbs />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Inicio')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('>')).not.toBeInTheDocument();
        });
    });
});
