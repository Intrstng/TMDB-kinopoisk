import { baseApi } from '@/app/api/baseApi.ts';
import type {
    AddToFavoritesArgs,
    CreditsResponse,
    DetailsResponse,
    FavoritesDocument,
    FetchFilmsArgs,
    FilmResponse,
    FilmsResponse,
    GenresResponse,
    GetCreditsArgs,
    GetFavoritesArgs,
    GetFilmArgs,
    GetGenresArgs,
    GetSimilarFilmsArgs,
    PatchCollection,
    RemoveFromFavoritesArgs,
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

import { arrayUnion, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/app/config/firebase.ts';
import type { FavoriteFilm } from '@/common/pages/FavouritesPage/types.ts';
import { favoriteFilmsResponseSchema } from '@/common/pages/FavouritesPage/model/favoritePage.schemas.ts';

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

            providesTags: (_result, _error, { path }) => [{ type: 'Films', id: path }],

            async onQueryStarted(queryArg: FetchFilmsArgs, { dispatch, queryFulfilled, getState }) {
                // Получаем все закэшированные запросы fetchFilms
                const cachedArgsForQuery = filmsApi.util.selectCachedArgsForQuery(getState(), 'fetchFilms');

                // Массив для хранения патчей для отката в случае ошибки
                const patchResults: PatchCollection[] = [];

                try {
                    // Ждем завершения текущего запроса фильмов
                    await queryFulfilled;
                    // Если пользователь не авторизован, обновляем все кэши с isFavorite: false
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            patchResults.push(
                                dispatch(
                                    filmsApi.util.updateQueryData('fetchFilms', cachedArgs, draft => {
                                        draft.pages = draft.pages.map(page => ({
                                            ...page,
                                            results: page.results.map(film => ({
                                                ...film,
                                                isFavorite: false,
                                            })),
                                        }));
                                    })
                                )
                            );
                        });
                        return;
                    }

                    // Получаем избранные фильмы пользователя
                    const favoritesResult = await dispatch(
                        filmsApi.endpoints.getFavorites.initiate({ userUid: queryArg.userUid })
                    ).unwrap();

                    // Создаем Set для быстрого поиска
                    const favoriteIds = new Set(favoritesResult.map(fav => fav.id));
                    // Обновляем ВСЕ закэшированные запросы fetchFilms с полем isFavorite
                    cachedArgsForQuery.forEach(cachedArgs => {
                        patchResults.push(
                            dispatch(
                                filmsApi.util.updateQueryData('fetchFilms', cachedArgs, draft => {
                                    draft.pages = draft.pages.map(page => ({
                                        ...page,
                                        results: page.results.map(film => ({
                                            ...film,
                                            isFavorite: favoriteIds.has(film.id),
                                        })),
                                    }));
                                })
                            )
                        );
                    });
                } catch (error) {
                    console.error('Error merging favorites with fetchFilms:', error);

                    // В случае ошибки откатываем все изменения
                    patchResults.forEach(patchResult => {
                        patchResult.undo();
                    });

                    // Опционально: обновляем кэши с isFavorite: false как fallback
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            dispatch(
                                filmsApi.util.updateQueryData('fetchFilms', cachedArgs, draft => {
                                    draft.pages = draft.pages.map(page => ({
                                        ...page,
                                        results: page.results.map(film => ({
                                            ...film,
                                            isFavorite: false,
                                        })),
                                    }));
                                })
                            );
                        });
                    }
                }
            },
        }),

        fetchFilmsForBackDrop: builder.query<FilmsResponse, FetchFilmsArgs>({
            query: ({ path, ...restArgs }) => {
                return {
                    url: `movie/${path}`,
                    params: {
                        ...restArgs,
                        api_key: API_KEY,
                    },
                };
            },

            ...withZodCatch(filmsResponseSchema),

            providesTags: ['BackDrop'],
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

            async onQueryStarted(queryArg: SearchFilmArgs, { dispatch, queryFulfilled, getState }) {
                // Получаем все закэшированные запросы searchFilm
                const cachedArgsForQuery = filmsApi.util.selectCachedArgsForQuery(getState(), 'searchFilm');

                // Массив для хранения патчей для отката в случае ошибки
                const patchResults: PatchCollection[] = [];

                try {
                    // Ждем завершения текущего запроса фильмов для searchFilm
                    await queryFulfilled;
                    // Если пользователь не авторизован, обновляем все кэши с isFavorite: false
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            patchResults.push(
                                dispatch(
                                    filmsApi.util.updateQueryData('searchFilm', cachedArgs, draft => {
                                        draft.pages = draft.pages.map(page => ({
                                            ...page,
                                            results: page.results.map(film => ({
                                                ...film,
                                                isFavorite: false,
                                            })),
                                        }));
                                    })
                                )
                            );
                        });
                        return;
                    }

                    // Получаем избранные фильмы пользователя
                    const favoritesResult = await dispatch(
                        filmsApi.endpoints.getFavorites.initiate({ userUid: queryArg.userUid })
                    ).unwrap();

                    // Создаем Set для быстрого поиска
                    const favoriteIds = new Set(favoritesResult.map(fav => fav.id));
                    // Обновляем ВСЕ закэшированные запросы searchFilm с полем isFavorite
                    cachedArgsForQuery.forEach(cachedArgs => {
                        patchResults.push(
                            dispatch(
                                filmsApi.util.updateQueryData('searchFilm', cachedArgs, draft => {
                                    draft.pages = draft.pages.map(page => ({
                                        ...page,
                                        results: page.results.map(film => ({
                                            ...film,
                                            isFavorite: favoriteIds.has(film.id),
                                        })),
                                    }));
                                })
                            )
                        );
                    });
                } catch (error) {
                    console.error('Error merging favorites with searchFilms:', error);

                    // В случае ошибки откатываем все изменения
                    patchResults.forEach(patchResult => {
                        patchResult.undo();
                    });

                    // Опционально: обновляем кэши с isFavorite: false как fallback
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            dispatch(
                                filmsApi.util.updateQueryData('searchFilm', cachedArgs, draft => {
                                    draft.pages = draft.pages.map(page => ({
                                        ...page,
                                        results: page.results.map(film => ({
                                            ...film,
                                            isFavorite: false,
                                        })),
                                    }));
                                })
                            );
                        });
                    }
                }
            },
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

            async onQueryStarted(queryArg: GetSimilarFilmsArgs, { dispatch, queryFulfilled, getState }) {
                // Получаем все закэшированные запросы searchFilm
                const cachedArgsForQuery = filmsApi.util.selectCachedArgsForQuery(getState(), 'getSimilarFilms');

                // Массив для хранения патчей для отката в случае ошибки
                const patchResults: PatchCollection[] = [];

                try {
                    // Ждем завершения текущего запроса фильмов для searchFilm
                    await queryFulfilled;
                    // Если пользователь не авторизован, обновляем все кэши с isFavorite: false
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            patchResults.push(
                                dispatch(
                                    filmsApi.util.updateQueryData('getSimilarFilms', cachedArgs, draft => {
                                        draft.results = draft.results.map(result => ({
                                            ...result,
                                            isFavorite: false,
                                        }));
                                    })
                                )
                            );
                        });
                        return;
                    }

                    // Получаем searchFilm results пользователя
                    const favoritesResult = await dispatch(
                        filmsApi.endpoints.getFavorites.initiate({ userUid: queryArg.userUid })
                    ).unwrap();

                    // Создаем Set для быстрого поиска
                    const favoriteIds = new Set(favoritesResult.map(fav => fav.id));
                    // Обновляем ВСЕ закэшированные запросы searchFilm с полем isFavorite
                    cachedArgsForQuery.forEach(cachedArgs => {
                        patchResults.push(
                            dispatch(
                                filmsApi.util.updateQueryData('getSimilarFilms', cachedArgs, draft => {
                                    draft.results = draft.results.map(result => ({
                                        ...result,
                                        isFavorite: favoriteIds.has(result.id),
                                    }));
                                })
                            )
                        );
                    });
                } catch (error) {
                    console.error('Error merging favorites with getSimilarFilms:', error);

                    // В случае ошибки откатываем все изменения
                    patchResults.forEach(patchResult => {
                        patchResult.undo();
                    });

                    // Опционально: обновляем кэши с isFavorite: false как fallback
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            dispatch(
                                filmsApi.util.updateQueryData('getSimilarFilms', cachedArgs, draft => {
                                    draft.results = draft.results.map(result => ({
                                        ...result,
                                        isFavorite: false,
                                    }));
                                })
                            );
                        });
                    }
                }
            },
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

            async onQueryStarted(queryArg: SortFilmsArgs, { dispatch, queryFulfilled, getState }) {
                // Получаем все закэшированные запросы fetchFilms
                const cachedArgsForQuery = filmsApi.util.selectCachedArgsForQuery(getState(), 'sortFilms');

                // Массив для хранения патчей для отката в случае ошибки
                const patchResults: PatchCollection[] = [];

                try {
                    // Ждем завершения текущего запроса фильмов
                    await queryFulfilled;
                    // Если пользователь не авторизован, обновляем все кэши с isFavorite: false
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            patchResults.push(
                                dispatch(
                                    filmsApi.util.updateQueryData('sortFilms', cachedArgs, draft => {
                                        draft.pages = draft.pages.map(page => ({
                                            ...page,
                                            results: page.results.map(film => ({
                                                ...film,
                                                isFavorite: false,
                                            })),
                                        }));
                                    })
                                )
                            );
                        });
                        return;
                    }

                    // Получаем избранные фильмы пользователя
                    const favoritesResult = await dispatch(
                        filmsApi.endpoints.getFavorites.initiate({ userUid: queryArg.userUid })
                    ).unwrap();

                    // Создаем Set для быстрого поиска
                    const favoriteIds = new Set(favoritesResult.map(fav => fav.id));
                    // Обновляем ВСЕ закэшированные запросы fetchFilms с полем isFavorite
                    cachedArgsForQuery.forEach(cachedArgs => {
                        patchResults.push(
                            dispatch(
                                filmsApi.util.updateQueryData('sortFilms', cachedArgs, draft => {
                                    draft.pages = draft.pages.map(page => ({
                                        ...page,
                                        results: page.results.map(film => ({
                                            ...film,
                                            isFavorite: favoriteIds.has(film.id),
                                        })),
                                    }));
                                })
                            )
                        );
                    });
                } catch (error) {
                    console.error('Error merging favorites with sortFilms:', error);

                    // В случае ошибки откатываем все изменения
                    patchResults.forEach(patchResult => {
                        patchResult.undo();
                    });

                    // Опционально: обновляем кэши с isFavorite: false как fallback
                    if (!queryArg.userUid) {
                        cachedArgsForQuery.forEach(cachedArgs => {
                            dispatch(
                                filmsApi.util.updateQueryData('sortFilms', cachedArgs, draft => {
                                    draft.pages = draft.pages.map(page => ({
                                        ...page,
                                        results: page.results.map(film => ({
                                            ...film,
                                            isFavorite: false,
                                        })),
                                    }));
                                })
                            );
                        });
                    }
                }
            },
        }),

        /** Favorite films
         *  Firestore database queries
         */
        getFavorites: builder.query<FavoriteFilm[], GetFavoritesArgs>({
            async queryFn({ userUid }) {
                try {
                    const favoritesCollection = collection(db, 'requestFavorites');
                    const q = query(favoritesCollection, where('userUid', '==', userUid));

                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        return { data: [] };
                    }

                    const favoritesDoc = querySnapshot.docs[0].data() as FavoritesDocument; // Check when structure db will be changed
                    // const favorites = querySnapshot.docs.map((doc) => doc.data() as FavoritesDocument) // For complex structure
                    return { data: favoritesDoc.favorites || [] };
                } catch (error) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Error loading favorites from Firestore',
                            data: error,
                        },
                    };
                }
            },
            ...withZodCatch(favoriteFilmsResponseSchema),

            providesTags: (result, _error, { userUid }) =>
                result ? [{ type: 'Favorites', id: userUid }] : ['Favorites'],
        }),

        addToFavorites: builder.mutation<void, AddToFavoritesArgs>({
            async queryFn({ userUid, film }) {
                try {
                    const favoritesCollection = collection(db, 'requestFavorites');
                    const q = query(favoritesCollection, where('userUid', '==', userUid));

                    const querySnapshot = await getDocs(q);
                    const timestamp = new Date().getTime();

                    if (querySnapshot.empty) {
                        // Create new record
                        const favoritesItem = {
                            favorites: [film],
                            userUid,
                            timestamp,
                        };
                        await setDoc(doc(favoritesCollection), favoritesItem);
                    } else {
                        // Update existing record
                        const docRef = doc(db, 'requestFavorites', querySnapshot.docs[0].id);
                        await updateDoc(docRef, {
                            favorites: arrayUnion(film),
                            timestamp: timestamp,
                        });
                    }

                    return { data: undefined };
                } catch (error) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Error adding to favorites Firestore database',
                            data: JSON.stringify(error),
                        },
                    };
                }
            },

            invalidatesTags: (_result, _error, { userUid, filmId }) => [
                { type: 'Favorites', id: userUid },
                { type: 'Films' },
                { type: 'Sort' },
                { type: 'Search' },
                { type: 'SimilarFilms', id: filmId },
            ],

            // Optimistic update для мгновенного отображения иконки сердечко на карточке фильма при добавлении фильма в Favorites
            // (также надо в FilmCard убрать useState(film.isFavorite) и сипользовать вместо isFavorite -> film.isFavorite)
            //  Не добавляю, т.к. необходим во нескольких queries и код станет слишком громоздким
            //
            // async onQueryStarted({userUid, film}: AddToFavoritesArgs, { dispatch, queryFulfilled, getState }) {
            //     const cachedArgsForQuery = filmsApi.util.selectCachedArgsForQuery(getState(), "fetchFilms")
            //
            //     // let patchResults: any[] = []
            //     let patchResults: PatchCollection[] = []
            //     cachedArgsForQuery.forEach((cachedArgs) => {
            //         if (cachedArgs.userUid === userUid || !cachedArgs.userUid) {
            //             patchResults.push(
            //                 dispatch(
            //                     filmsApi.util.updateQueryData("fetchFilms", cachedArgs, (draft) => {
            //                         // Iterate through all pages in the infinite query
            //                         draft.pages = draft.pages.map(page => ({
            //                             ...page,
            //                             results: page.results.map(movie =>
            //                                 movie.id === film.id
            //                                     ? { ...movie, isFavorite: true }
            //                                     : movie
            //                             )
            //                         }));
            //                     }),
            //                 )
            //             );
            //         }
            //     })
            //     try {
            //         await queryFulfilled
            //     } catch {
            //         patchResults.forEach((patchResult) => {
            //             patchResult.undo()
            //         })
            //     }
            // },
        }),

        removeFromFavorites: builder.mutation<void, RemoveFromFavoritesArgs>({
            async queryFn({ userUid, filmId }) {
                try {
                    const favoritesCollection = collection(db, 'requestFavorites');
                    const q = query(favoritesCollection, where('userUid', '==', userUid));

                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const docRef = doc(db, 'requestFavorites', querySnapshot.docs[0].id);
                        const docData = querySnapshot.docs[0].data();
                        const currentFavorites = docData.favorites || [];

                        // Filter film db entry, removing with provided id
                        const updatedFavorites = currentFavorites.filter((film: FavoriteFilm) => film.id !== filmId);

                        const timestamp = new Date().getTime();

                        if (updatedFavorites.length === 0) {
                            // If favorites db list is empty after this, delete all entries
                            await deleteDoc(docRef);
                        } else {
                            // Update favorites
                            await updateDoc(docRef, {
                                favorites: updatedFavorites,
                                timestamp: timestamp,
                            });
                        }
                    }

                    return { data: undefined };
                } catch (error) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Error removing from favorites',
                            data: JSON.stringify(error),
                        },
                    };
                }
            },

            invalidatesTags: (_result, _error, { userUid, filmId }) => [
                { type: 'Favorites', id: userUid },
                { type: 'Films' },
                { type: 'Sort' },
                { type: 'Search' },
                { type: 'SimilarFilms', id: filmId },
            ],
        }),

        checkIsFavorite: builder.query<boolean, RemoveFromFavoritesArgs>({
            async queryFn({ userUid, filmId }) {
                try {
                    const favoritesCollection = collection(db, 'requestFavorites');
                    const q = query(favoritesCollection, where('userUid', '==', userUid));

                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        return { data: false };
                    }

                    const favoritesDoc = querySnapshot.docs[0].data() as FavoritesDocument;
                    const isFavorite = favoritesDoc.favorites?.some(fav => fav.id === filmId);

                    return { data: isFavorite };
                } catch {
                    return { data: false };
                }
            },
            providesTags: (_result, _error, { userUid, filmId }) => [{ type: 'Favorites', id: `${userUid}_${filmId}` }],
        }),
    }),
});

export const {
    useGetConfigDetailsQuery,
    useGetGenresQuery,
    useFetchFilmsInfiniteQuery,
    useFetchFilmsForBackDropQuery,
    useSearchFilmInfiniteQuery,
    useGetFilmQuery,
    useSortFilmsInfiniteQuery,
    useGetSimilarFilmsQuery,
    useGetCreditsQuery,
    useGetFavoritesQuery,
    useAddToFavoritesMutation,
    useRemoveFromFavoritesMutation,
    useCheckIsFavoriteQuery,
} = filmsApi;
