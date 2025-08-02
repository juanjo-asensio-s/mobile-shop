import { renderHook, waitFor } from '@testing-library/react';
import useFetchWithCache from '../useFetchWithCache';

describe('useFetchWithCache', () => {
    const KEY = 'test-key';
    const mockData = { name: 'Producto test' };
    const CACHE_DURATION = 3600000;

    beforeEach(() => {
        localStorage.clear();
    });


    it('debe usar datos de la caché si existen y no han expirado', async () => {
        const cached = {
            value: mockData,
            expiry: Date.now() + CACHE_DURATION
        };
        localStorage.setItem(KEY, JSON.stringify(cached));

        const fetchFn = vi.fn();

        const { result } = renderHook(() => useFetchWithCache(KEY, fetchFn));

        expect(result.current).toEqual(mockData);
        expect(fetchFn).not.toHaveBeenCalled();
    });

    it('debe llamar a fetch si no hay caché', async () => {
        const fetchFn = vi.fn().mockResolvedValue(mockData);

        const { result } = renderHook(() => useFetchWithCache(KEY, fetchFn));

        await waitFor(() => {
            expect(result.current).toEqual(mockData);
        });

        expect(fetchFn).toHaveBeenCalledTimes(1);

        const cached = JSON.parse(localStorage.getItem(KEY));
        expect(cached.value).toEqual(mockData);
    });

    it('debe llamar a fetch si la caché ha expirado', async () => {
        const expired = {
            value: { name: 'Antiguo' },
            expiry: Date.now() - 1000
        };
        localStorage.setItem(KEY, JSON.stringify(expired));

        const fetchFn = vi.fn().mockResolvedValue(mockData);

        const { result } = renderHook(() => useFetchWithCache(KEY, fetchFn));

        await waitFor(() => {
            expect(result.current).toEqual(mockData);
        });

        expect(fetchFn).toHaveBeenCalledTimes(1);

        const cached = JSON.parse(localStorage.getItem(KEY));
        expect(cached.value).toEqual(mockData);
    });
});
