import { baseApi } from '@/app/api/baseApi.ts';
import type {
    DetailsResponse,
    FetchFilmsArgs,
    FilmResponse,
    FilmsResponse,
    GetFilmArgs,
    SearchFilmArgs,
    SortFilmsArgs,
} from '@/features/films/api/filmsApi.types.ts';
import {
    detailsResponseSchema,
    filmResponseSchema,
    filmsResponseSchema,
} from '@/features/films/model/films.schemas.ts';
import { withZodCatch } from '@/common/utils/withZodCatch.ts';
import { API_KEY } from '@/common/constants';

/**
 * RTK Query endpoints для получения фильмов по категориям
 *
 * @see {@link baseApi} - По ссылке указана информация почему API_KEY используется в URI запросов передачей через объект params,
 * а не глобальной установкой в конфигурации baseApi
 */
export const filmsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getConfigDetails: builder.query<DetailsResponse, void>({
            query: () => ({
                url: 'configuration',
                params: {
                    api_key: API_KEY,
                },
            }),
            ...withZodCatch(detailsResponseSchema),
            providesTags: ['Details'],
        }),

        fetchFilms: builder.query<FilmsResponse, FetchFilmsArgs>({
            query: ({ category, page = 1, ...params }) => {
                return {
                    url: `movie/${category}`,
                    params: {
                        ...params,
                        page,
                        api_key: API_KEY,
                    },
                };
            },

            ...withZodCatch(filmsResponseSchema),

            providesTags: (result, _error, { category }) => (result ? [{ type: 'Films', id: category }] : ['Films']),
        }),

        searchFilm: builder.query<FilmsResponse, SearchFilmArgs>({
            query: ({ page = 1, ...params }) => {
                return {
                    url: `search/movie`,
                    params: {
                        ...params,
                        page,
                        api_key: API_KEY,
                    },
                };
            },
            ...withZodCatch(filmsResponseSchema),
            providesTags: (result, _error, { query }) => (result ? [{ type: 'Search', id: query }] : ['Search']),
        }),

        getFilm: builder.query<FilmResponse, GetFilmArgs>({
            query: id => ({
                // direct parameter
                url: `movie/${id}`,
                params: { api_key: API_KEY },
            }),
            ...withZodCatch(filmResponseSchema),
            providesTags: (result, _error, id) => (result ? [{ type: 'Film', id }] : ['Film']),
        }),

        sortFilms: builder.query<FilmResponse, SortFilmsArgs>({
            query: params => ({
                // direct parameter
                url: 'discover/movie',
                params: { ...params, api_key: API_KEY },
            }),
            ...withZodCatch(filmResponseSchema),
            providesTags: ['Sort'],
        }),
    }),
});

export const { useGetConfigDetailsQuery, useFetchFilmsQuery, useSearchFilmQuery, useGetFilmQuery, useSortFilmsQuery } =
    filmsApi;
