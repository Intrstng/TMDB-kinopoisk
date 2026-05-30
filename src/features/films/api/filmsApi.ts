import { baseApi } from '@/app/api/baseApi.ts';
import type {
    CreditsResponse,
    DetailsResponse,
    FetchFilmsArgs,
    FilmResponse,
    FilmsResponse,
    GenresResponse,
    GetCreditsArgs,
    GetFilmArgs,
    GetGenresArgs,
    GetSimilarFilmsArgs,
    SearchFilmArgs,
    SortFilmsArgs,
} from '@/features/films/api/filmsApi.types.ts';
import {
    creditsResponseSchema,
    detailsResponseSchema,
    filmResponseSchema,
    filmsResponseSchema,
    genresResponseSchema,
} from '@/features/films/model/films.schemas.ts';
import { withZodCatch } from '@/common/utils/withZodCatch.ts';
import { API_KEY } from '@/common/constants';
import { SORT_BY } from '@/common/enums';

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

        getGenres: builder.query<GenresResponse, GetGenresArgs>({
            query: ({ language = 'en' }) => ({
                url: 'genre/movie/list',
                params: {
                    language,
                    api_key: API_KEY,
                },
            }),
            ...withZodCatch(genresResponseSchema),
            providesTags: ['Genres'],
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
                url: `movie/${id}`,
                params: { api_key: API_KEY },
            }),
            ...withZodCatch(filmResponseSchema),
            providesTags: (result, _error, id) => (result ? [{ type: 'Film', id }] : ['Film']),
        }),

        getSimilarFilms: builder.query<FilmsResponse, GetSimilarFilmsArgs>({
            query: ({ movie_id, page = 1, language = 'en-US' }) => ({
                url: `movie/${movie_id}/similar`,
                params: {
                    page,
                    language,
                    api_key: API_KEY,
                },
            }),
            ...withZodCatch(filmsResponseSchema),
            providesTags: (result, _error, { movie_id }) =>
                result ? [{ type: 'SimilarFilms', id: movie_id }] : ['SimilarFilms'],
        }),

        getCredits: builder.query<CreditsResponse, GetCreditsArgs>({
            query: ({ movie_id, language = 'en-US' }) => ({
                url: `movie/${movie_id}/credits`,
                params: {
                    language,
                    api_key: API_KEY,
                },
            }),
            ...withZodCatch(creditsResponseSchema),
            providesTags: (result, _error, { movie_id }) =>
                result ? [{ type: 'Credits', id: movie_id }] : ['Credits'],
        }),

        sortFilms: builder.query<FilmResponse, SortFilmsArgs>({
            query: params => ({
                url: 'discover/movie',
                params: { ...params, sort_by: SORT_BY.POPULARITY_DESC, api_key: API_KEY },
            }),
            ...withZodCatch(filmResponseSchema),
            providesTags: ['Sort'],
        }),
    }),
});

export const {
    useGetConfigDetailsQuery,
    useGetGenresQuery,
    useFetchFilmsQuery,
    useSearchFilmQuery,
    useGetFilmQuery,
    useSortFilmsQuery,
    useGetSimilarFilmsQuery,
    useGetCreditsQuery,
} = filmsApi;
