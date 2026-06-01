import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SearchFilmForm } from '@/common/components/SearchFilmForm/SearchFilmForm.tsx';
import { useSearchFilmQuery } from '@/features/films/api/filmsApi.ts';
import s from './SearchPage.module.css';
import Container from '@mui/material/Container';
import { containerSx, mainSx } from '@/common/styles';
import { POSTER_SIZE, SEARCH_SIZES } from '@/common/enums';
import {FilmCard} from '@/common/components/FilmCard/FilmCard.tsx';
import { useMoviesWithConfig } from '@/common/hooks';
import { useSearchParams } from 'react-router-dom';
import { SearchStatus } from '@/common/components/SearchStatus/SearchStatus.tsx';
import { searchClueSx, searchTitleSx } from '@/common/pages/SearchPage/SearchPage.styles.ts';

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page')) || 1;

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {
        data: searchFilmsData,
        // isLoading: isSearchLoading,
        isFetching: isSearchFetching,
    } = useSearchFilmQuery({ query, page }, { skip: !query || !configData });

    if (isConfigLoading) {
        // change to skeleton
        return (
            <Box
                component={'main'}
                sx={{
                    ...mainSx,
                    bgcolor: 'background.default',
                    color: 'text.secondary',
                }}
            >
                <Container sx={containerSx}>
                    <Typography>Loading configuration...</Typography>
                </Container>
            </Box>
        );
    }

    return (
        <>
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
                            <SearchStatus
                                isFetching={isSearchFetching}
                                hasResults={Boolean(searchFilmsData?.results?.length)}
                                query={query}
                            />

                            {isSearchFetching && <Box>Loading...</Box>}

                            {searchFilmsData && !isSearchFetching && (
                                <Box className={s.container}>
                                    <Box className={s.moviesGrid}>
                                        {searchFilmsData.results?.map(film => (
                                            <FilmCard
                                                key={film.id}
                                                film={film}
                                                source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
};
//
// // Pagination
// const handlePageChange = (newPage: number) => {
//     setSearchParams({ query, page: newPage.toString() });
// };
