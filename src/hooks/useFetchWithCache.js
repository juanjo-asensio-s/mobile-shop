import {useEffect, useState} from 'react';

const CACHE_DURATION = 3600000;

export default function useFetchWithCache(key, fetchFn) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const cached = localStorage.getItem(key);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Date.now() < parsed.expiry) {
                setData(parsed.value);
                return;
            } else {
                localStorage.removeItem(key);
            }
        }
        fetchFn().then(result => {
            setData(result);
            localStorage.setItem(key, JSON.stringify({value: result, expiry: Date.now() + CACHE_DURATION}));
        });
    }, [key, fetchFn]);

    return data;
}