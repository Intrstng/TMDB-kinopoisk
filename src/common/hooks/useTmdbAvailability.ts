import { useEffect, useState } from 'react';

type TmdbAvailability = 'checking' | 'available' | 'unavailable';

export function useTmdbAvailability() {
    const [status, setStatus] = useState<TmdbAvailability>('checking');

    useEffect(() => {
        const controller = new AbortController();

        const checkAvailability = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/configuration', {
                    signal: controller.signal,
                    // Проверка не должна использовать кеш браузера
                    cache: 'no-store',
                });

                if (response.ok) {
                    setStatus('available');
                } else {
                    // HTTP-ошибка не обязательно означает блокировку по стране
                    setStatus('available');
                }
            } catch {
                if (!controller.signal.aborted) {
                    setStatus('unavailable');
                }
            }
        };

        void checkAvailability();

        return () => controller.abort();
    }, []);

    return status;
}
