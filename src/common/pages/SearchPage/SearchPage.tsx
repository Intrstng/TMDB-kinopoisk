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
import {searchClueSx, searchTitleSx} from '@/common/pages/SearchPage/SearchPage.styles.ts';
import {AlertText} from "@/common/components/AlertText/AlertText.tsx";
import {useInfiniteScroll} from "@/common/hooks/useInfiniteScroll.ts";
import {LoadingTrigger} from "@/common/components/LoadingTrigger/LoadingTrigger.tsx";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {
        data,
        isLoading: isSearchLoading,
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

    if (isConfigLoading || isSearchLoading) return <AlertText text={'Loading configuration (not only config is loading)'}/>
        // change to skeleton or loader

    return (
            <Container sx={containerSx}>
                <Box>
                    <Typography variant="h2" component="h2" sx={searchTitleSx}>
                        Search Results
                    </Typography>
                    <SearchFilmForm
                        isSearchFetching={isSearchFetching}
                        className={s.searchForm}
                        size={SEARCH_SIZES.SMALL}
                    />

                    {!query && (
                        <Typography variant="h3" component="h3" sx={searchClueSx}>
                            Enter a movie title to start searching
                        </Typography>
                    )}

                    {query && configData && (
                        <>
                            {/*//?*/}
                            <SearchStatus
                                isFetching={isSearchFetching}
                                hasResults={Boolean(searchFilmsData.length)}
                                query={query}
                            />
                            {/*//?*/}
                            {isSearchFetching && <Box>Loading...</Box>}
                            <Box className={s.container}>
                                <Box className={s.moviesGrid}>
                                    {searchFilmsData.map(film => (
                                        <FilmCard
                                            key={film.id}
                                            film={film}
                                            source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)}
                                        />
                                    ))}

                                    {hasNextPage && (
                                        <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage}/>
                                    )}
                                    {!hasNextPage && searchFilmsData.length > 0 && <p>Nothing more to load</p>}
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
    );
};
