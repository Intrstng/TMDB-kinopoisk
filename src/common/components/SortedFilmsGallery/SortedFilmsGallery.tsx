import {useAppSelector, useInfiniteScroll, useMoviesWithConfig} from '@/common/hooks';
import {useSearchParams} from 'react-router-dom';
import {useSortFilmsInfiniteQuery} from '@/features/films/api/filmsApi.ts';
import {PAGE_SIZE, RATING_MAX, RATING_MIN} from '@/common/constants';
import {POSTER_SIZE, SEARCH_PARAMS, SORT_BY} from '@/common/enums';
import type {SortFilmsArgs} from '@/features/films/api/filmsApi.types.ts';
import {FilmCard, FilmsGallerySkeletonGrid, LoadingTrigger} from '@/common/components';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {sortedFilmsSx,} from '@/common/components/SortedFilmsGallery/SortedFilmsGallery.styles.ts';
import {selectUser} from "@/app/model/slices/app-slice.ts";

export const SortedFilmsGallery = () => {
    const user = useAppSelector(selectUser);
    const [searchParams] = useSearchParams();

    const {
        config: configData,
        isLoading: isConfigLoading,
        getPosterUrl,
    } = useMoviesWithConfig();

    const buildQueryParams = (): SortFilmsArgs => {
        const params: SortFilmsArgs = {
            [SEARCH_PARAMS.SORT]: SORT_BY.POPULARITY_DESC,
            vote_average_gte: RATING_MIN,
            vote_average_lte: RATING_MAX,
        };

        const sortBy = searchParams.get(SEARCH_PARAMS.SORT);
        if (sortBy) {
            params[SEARCH_PARAMS.SORT] = sortBy as SORT_BY;
        }

        const genres = searchParams.get(SEARCH_PARAMS.GENRES);
        if (genres) {
            params[SEARCH_PARAMS.GENRES] = genres;
        }

        const ratingMin = searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_GTE);
        if (ratingMin && Number(ratingMin) !== RATING_MIN) {
            params.vote_average_gte = Number(ratingMin);
        }

        const ratingMax = searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_LTE);
        if (ratingMax && Number(ratingMax) !== RATING_MAX) {
            params.vote_average_lte = Number(ratingMax);
        }

        return params;
    };

    const queryParams = buildQueryParams();

    const { data, isLoading: isSortFilmsLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage }
        = useSortFilmsInfiniteQuery(
        {...queryParams, userUid: user?.uid},{ skip: !configData }
    );

    const {observerRef} = useInfiniteScroll({
        hasNextPage,
        isFetching,
        fetchNextPage,
    })

    const sortFilmsData = data?.pages ? data?.pages.flatMap((page) => page.results) : [];

    if (!isConfigLoading && !isSortFilmsLoading && sortFilmsData.length === 0) {
        return (
            <Box sx={sortedFilmsSx.container}>
                <Box sx={sortedFilmsSx.moviesGrid}>
                    <Typography variant={'h3'} component={'h3'} sx={sortedFilmsSx.error}>No sorted films or invalid response structure...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={sortedFilmsSx.container}>
            <Box sx={sortedFilmsSx.moviesGrid}>
                {isConfigLoading || isSortFilmsLoading
                    ? <FilmsGallerySkeletonGrid count={PAGE_SIZE}/>
                    : sortFilmsData.map(film => (
                        <FilmCard key={film.id} film={film} source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)} />
                    ))
                }
            </Box>

            {hasNextPage && (
                <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage}/>
            )}
            {!hasNextPage && sortFilmsData.length > 0
                && <Typography variant={'h3'}
                               component={'h3'}
                               sx={sortedFilmsSx.error}>
                    Nothing more to load
                </Typography>}
        </Box>
    );
};
