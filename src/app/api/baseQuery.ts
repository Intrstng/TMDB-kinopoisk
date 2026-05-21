import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        'API-KEY': import.meta.env.VITE_API_KEY,
    },
});

//          curl --request GET \
//               --url 'https://api.themoviedb.org/3/movie/11' \
//               --header 'Authorization: Bearer <<access_token>>'
