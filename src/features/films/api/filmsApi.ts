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
import { SEARCH_PARAMS } from '@/common/enums';

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

        /** Напоминание по InfiniteQuery для fetchFilms:
         * 1. fetchFilms: builder.infiniteQuery<FetchFilmsResponse, void, string | undefined>  <-- void это query параметры
         * которые передаем (в нашем случае FetchFilmsArgs)
         * string | undefined это значение initialPageParam в объекте infiniteQueryOptions
         * 2. number (третий аргумент в builder.infiniteQuery) - TMDB API при пагинации при первой загрузке вернет 1
         * (если бы использовали курсорную пагинацию было бы undefined)
         * 3. В pageParam будет попадать значение nextCursor
         * 4. в queryArg будут попадать то что будем передавать вместо void в   fetchTracks: builder.infiniteQuery<FetchTracksResponse, void, string | undefined>
         */
        fetchFilms: builder.infiniteQuery<FilmsResponse, FetchFilmsArgs, number>({
            // see 1
            infiniteQueryOptions: {
                initialPageParam: 1, // see 2
                getNextPageParam: (lastPage, _allPages, lastPageParam) => {
                    if (lastPage.page < lastPage.total_pages) {
                        return lastPageParam + 1;
                    }
                    return undefined;
                },
            },

            query: ({ pageParam, queryArg }) => {
                // see 3 & 4
                const { path, ...restArgs } = queryArg;
                return {
                    url: `movie/${path}`,
                    params: {
                        page: pageParam,
                        ...restArgs,
                        api_key: API_KEY,
                    },
                };
            },

            ...withZodCatch(filmsResponseSchema),

            providesTags: (result, _error, { path }) => (result ? [{ type: 'Films', id: path }] : ['Films']),
        }),

        searchFilm: builder.infiniteQuery<FilmsResponse, SearchFilmArgs, number>({
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, _allPages, lastPageParam) => {
                    if (lastPage.page < lastPage.total_pages) {
                        return lastPageParam + 1;
                    }
                    return undefined;
                },
            },

            query: ({ pageParam, queryArg }) => {
                return {
                    url: `search/movie`,
                    params: {
                        ...queryArg,
                        page: pageParam,
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

        sortFilms: builder.infiniteQuery<FilmsResponse, SortFilmsArgs, number>({
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, _allPages, lastPageParam) => {
                    if (lastPage.page < lastPage.total_pages) {
                        return lastPageParam + 1;
                    }
                    return undefined;
                },
            },

            query: ({ pageParam, queryArg }) => ({
                url: 'discover/movie',
                params: {
                    [SEARCH_PARAMS.GENRES]: queryArg[SEARCH_PARAMS.GENRES],
                    [SEARCH_PARAMS.SORT]: queryArg[SEARCH_PARAMS.SORT],
                    [SEARCH_PARAMS.VOTE_AVERAGE_GTE]: queryArg.vote_average_gte,
                    [SEARCH_PARAMS.VOTE_AVERAGE_LTE]: queryArg.vote_average_lte,
                    [SEARCH_PARAMS.PAGE]: pageParam,
                    api_key: API_KEY,
                },
            }),
            ...withZodCatch(filmsResponseSchema),
            providesTags: ['Sort'],
        }),
    }),
});

export const {
    useGetConfigDetailsQuery,
    useGetGenresQuery,
    useFetchFilmsInfiniteQuery,
    useSearchFilmInfiniteQuery,
    useGetFilmQuery,
    useSortFilmsInfiniteQuery,
    useGetSimilarFilmsQuery,
    useGetCreditsQuery,
} = filmsApi;
