import {useMoviesWithConfig} from '@/common/hooks';
import {useSortFilmsQuery} from '@/features/films/api/filmsApi.ts';
import {RATING_MAX, RATING_MIN} from '@/common/constants';
import Box from '@mui/material/Box';
import {useSearchParams} from 'react-router-dom';
import {POSTER_SIZE, SEARCH_PARAMS, SORT_BY} from '@/common/enums';
import {FilmCard} from '@/common/components/FilmCard/FilmCard.tsx';
import type {SortFilmsArgs} from '@/features/films/api/filmsApi.types.ts';
import {
    moviesContainerSx,
    sortedMoviesGridSx,
} from '@/common/components/SortedFilmsGallery/SortedFilmsGallery.styles.ts';

export const SortedFilmsGallery = () => {
    const [searchParams] = useSearchParams();

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl,
    } = useMoviesWithConfig();

    const buildQueryParams = (): SortFilmsArgs => {
        const params: SortFilmsArgs = {
            [SEARCH_PARAMS.PAGE]: Number(searchParams.get(SEARCH_PARAMS.PAGE)) || 1,
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

    const {
        data: sortFilmsData,
        isLoading: isSortFilmsLoading,
        // isFetching: isSortFilmsFetching,
    } = useSortFilmsQuery(queryParams, { skip: !configData });

    if (isConfigLoading || isSortFilmsLoading) {
        return <Box sx={moviesContainerSx}>Загрузка skeleton...</Box>;
    }

    if (sortFilmsData?.results.length === 0) {
        return <Box sx={moviesContainerSx}>No sorted films or invalid response structure...</Box>; // add styles
    }

    return (
        <Box sx={moviesContainerSx}>
            <Box sx={sortedMoviesGridSx}>
                {sortFilmsData?.results.map(film => (
                    <FilmCard key={film.id} film={film} source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)} />
                ))}
            </Box>
        </Box>
    );
};
