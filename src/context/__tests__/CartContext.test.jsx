import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {CartContext, CartProvider} from '../CartContext';
import React, {useContext} from 'react';

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
    store: {},
};

beforeEach(() => {
    localStorageMock.getItem.mockImplementation((key) => localStorageMock.store[key] || null);
    localStorageMock.setItem.mockImplementation((key, value) => {
        localStorageMock.store[key] = value.toString();
    });
    localStorageMock.clear.mockImplementation(() => {
        localStorageMock.store = {};
    });

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
    });
});

describe('CartContext', () => {
    function TestComponent() {
        const {cartCount, addToCart, resetCart} = useContext(CartContext);
        return (
            <div>
                <span data-testid="count">{cartCount}</span>
                <button onClick={() => addToCart(2)} data-testid="add-button">
                    Add
                </button>
                <button onClick={() => resetCart()} data-testid="reset-button">
                    Reset
                </button>
            </div>
        );
    }

    it('añade addToCart y resetCart', () => {
        render(
            <CartProvider>
                <TestComponent/>
            </CartProvider>
        );

        expect(screen.getByTestId('add-button')).toBeInTheDocument();
        expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });

    it('addToCart incrementa el valor correctamente', async () => {
        render(
            <CartProvider>
                <TestComponent/>
            </CartProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByTestId('add-button'));
        });

        expect(screen.getByTestId('count')).toHaveTextContent('2');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('cartCount', '2');
    });

    it('resetCart reinicializa el valor a 0', async () => {
        render(
            <CartProvider>
                <TestComponent/>
            </CartProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByTestId('add-button'));
        });

        await act(async () => {
            fireEvent.click(screen.getByTestId('reset-button'));
        });

        expect(screen.getByTestId('count')).toHaveTextContent('0');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('cartCount', '0');
    });

    it('recupera el valor inicial de localStorage', () => {
        localStorageMock.store.cartCount = '3';

        render(
            <CartProvider>
                <TestComponent/>
            </CartProvider>
        );

        expect(screen.getByTestId('count')).toHaveTextContent('3');
        expect(localStorageMock.getItem).toHaveBeenCalledWith('cartCount');
    });
});