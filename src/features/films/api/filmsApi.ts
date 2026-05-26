import { baseApi } from '@/app/api/baseApi.ts';
import type { DetailsResponse, FetchFilmsArgs, FilmsResponse } from '@/features/films/api/filmsApi.types.ts';
import { detailsResponseSchema, filmsResponseSchema } from '@/features/films/model/films.schemas.ts';
import { withZodCatch } from '@/common/utils/withZodCatch.ts';
import { API_KEY } from '@/common/constants';

/**
 * RTK Query endpoints для получения фильмов по категориям
 *
 * @see {@link baseApi} - Информация почему используется API_KEY в ссылках запросов, а не в конфигурации baseApi
 */

export const filmsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getConfigDetails: builder.query<DetailsResponse, void>({
            // query: () => ({ url: 'configuration' }),
            query: () => ({ url: `configuration?api_key=${API_KEY}` }),
            ...withZodCatch(detailsResponseSchema),
            providesTags: ['Details'],
        }),

        // searchMovies: builder.query<any, any>({
        //     query: ({ query, page = 1 }) =>
        //         `search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
        // }),

        // discoverMovies: builder.query({
        //     query: ({ sortBy = 'popularity.desc', voteGte = 0, voteLte = 10, page = 1 }) =>
        //         `discover/movie?sort_by=${sortBy}&vote_average.gte=${voteGte}&vote_average.lte=${voteLte}&page=${page}`,
        // }),

        fetchFilms: builder.query<FilmsResponse, FetchFilmsArgs>({
            query: ({ category, ...params }) => {
                return {
                    url: `movie/${category}?api_key=${API_KEY}`,
                    params,
                };
            },

            ...withZodCatch(filmsResponseSchema),

            providesTags: ['Films'],
            // providesTags: (result, error, { category }) =>
            //     result ? [{ type: 'Films', id: category }] : ['Films'],
        }),
    }),
});

export const { useGetConfigDetailsQuery, useFetchFilmsQuery } = filmsApi;

//https://api.themoviedb.org/3/search/movie?query=s&page=1
//api.themoviedb.org/3/movie/top_rated?page=1

//Filter
//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&vote_average.gte=0.0&vote_average.lte=10.0&page=1
