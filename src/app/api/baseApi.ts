import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Films', 'Film', 'Details', 'Search', 'Sort'],

    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,

            // Когда я использовал передачу API-KEY в header запросов указанную через общий baseQuery я сталкивался с ошибкой CORS
            // Решением проблемы стало прикрепление API-KEY к каждому запросу в качестве query параметра,
            // поэтому в моем решении и используется передача API-KEY в каждом запросе в виде "?api_key=`${import.meta.env.VITE_API_KEY}`"
            // Не используется:
            // headers: {
            //     'API-KEY': `${import.meta.env.VITE_API_KEY}`,
            // },
            prepareHeaders: headers => {
                headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);
                return headers;
            },
        })(args, api, extraOptions);

        if (result.error) {
            // handleError(result.error)
        }

        return result;
    },
    skipSchemaValidation: process.env.NODE_ENV === 'production',
    endpoints: () => ({}),
});
