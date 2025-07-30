import {fireEvent, render} from '@testing-library/react';
import SearchBar from '../SearchBar';

test('actualiza el valor del input', () => {
    const handleChange = vi.fn();

    const {getByPlaceholderText} = render(
        <SearchBar value="" onChange={handleChange}/>
    );

    const input = getByPlaceholderText(/buscar por marca/i);
    fireEvent.change(input, {target: {value: 'Acer'}});

    expect(handleChange).toHaveBeenCalledWith('Acer');
});
