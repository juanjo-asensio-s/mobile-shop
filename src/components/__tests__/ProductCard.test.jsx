import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ProductCard from '../ProductCard';

test('renderiza un producto con precio', () => {
    const product = {
        id: '123',
        brand: 'Acer',
        model: 'Liquid Z6',
        price: '999',
        imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg',
    };

    const {getByText, getByAltText} = render(
        <MemoryRouter>
            <ProductCard product={product}/>
        </MemoryRouter>
    );

    expect(getByText('Acer Liquid Z6')).toBeInTheDocument();
    expect(getByText('999 €')).toBeInTheDocument();
    expect(getByAltText('Liquid Z6')).toBeInTheDocument();
});
