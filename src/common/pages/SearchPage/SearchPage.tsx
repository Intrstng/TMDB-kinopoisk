import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {SearchFilmForm} from '@/common/components/SearchFilmForm/SearchFilmForm.tsx';
import {useSearchFilmInfiniteQuery} from '@/features/films/api/filmsApi.ts';
import s from './SearchPage.module.css';
import Container from '@mui/material/Container';
import {containerSx} from '@/common/styles';
import {POSTER_SIZE, SEARCH_SIZES} from '@/common/enums';
import {FilmCard} from '@/common/components/FilmCard/FilmCard.tsx';
import {useMoviesWithConfig} from '@/common/hooks';
import {useSearchParams} from 'react-router-dom';
import {SearchStatus} from '@/common/components/SearchStatus/SearchStatus.tsx';
import {searchSx} from '@/common/pages/SearchPage/SearchPage.styles.ts';
import {useInfiniteScroll} from "@/common/hooks/useInfiniteScroll.ts";
import {LoadingTrigger} from "@/common/components/LoadingTrigger/LoadingTrigger.tsx";
import {PAGE_SIZE} from "@/common/constants";
import {FilmsGallerySkeletonGrid} from "@/common/components/FilmCard/FilmCardSkeleton/FilmCardSkeleton.tsx";
import {sortedFilmsSx} from "@/common/components/SortedFilmsGallery/SortedFilmsGallery.styles.ts";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const {
        config: configData,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {
        data,
        isFetching: isSearchFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    }
        = useSearchFilmInfiniteQuery(
        { query, language: 'en-US' },{ skip: !query || !configData }
    );

    const {observerRef} = useInfiniteScroll({
        hasNextPage,
        isFetching: isSearchFetching,
        fetchNextPage,
    })

    const searchFilmsData = data?.pages.flatMap((page) => page.results) || []

    // if (isConfigLoading) return <AlertText text={'Loading configuration (not only config is loading)'}/>
        // change to skeleton or loader

    return (
            <Container sx={containerSx}>
                <Box>
                    <Typography variant="h2" component="h2" sx={searchSx.searchTitle}>
                        Search Results
                    </Typography>
                    <SearchFilmForm
                        isSearchFetching={isSearchFetching}
                        className={s.searchForm}
                        size={SEARCH_SIZES.SMALL}
                    />

                    {!query && (
                        <Typography variant="h3" component="h3" sx={searchSx.searchClue}>
                            Enter a movie title to start searching
                        </Typography>
                    )}

                    {query && configData && (
                        <>
                            <SearchStatus
                                isFetching={isSearchFetching}
                                hasResults={Boolean(searchFilmsData.length)}
                                query={query}
                            />

                            <Box sx={searchSx.container}>
                                <Box sx={searchSx.moviesGrid}>
                                    {isSearchFetching && !isFetchingNextPage
                                        ? <FilmsGallerySkeletonGrid count={PAGE_SIZE}/>
                                        : searchFilmsData.map(film => (
                                                <FilmCard
                                                    key={film.id}
                                                    film={film}
                                                    source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)}
                                                />
                                            ))
                                    }
                                </Box>

                                {hasNextPage && (
                                    <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage}/>
                                )}
                                {!hasNextPage && searchFilmsData.length > 0
                                    && <Typography variant={'h3'}
                                                   component={'h3'}
                                                   sx={searchSx.error}>
                                        Nothing more to load
                                    </Typography>}
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
    );
};
