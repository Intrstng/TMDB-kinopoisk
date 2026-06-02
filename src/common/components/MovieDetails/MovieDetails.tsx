import { useGetFilmQuery } from '@/features/films/api/filmsApi.ts';
import { POSTER_SIZE } from '@/common/enums';
import type { DetailsProps } from '@/common/components/MovieDetails/types.ts';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { getYearFromDate } from '@/common/utils/getYearFromDate.ts';
import { getFilmRuntime } from '@/common/utils/getFilmRuntime.ts';
import Typography from '@mui/material/Typography';
import { movieDetailsSx } from '@/common/components/MovieDetails/MovieDetails.styles.ts';
import { BackButton } from '@/common/components/BackButton/BackButton.tsx';

export const MovieDetails = ({ filmId, getPosterUrlCb }: DetailsProps) => {
    const { data: filmData, isLoading: isFilmLoading, isError: isFilmError } = useGetFilmQuery(filmId);

    const posterPath = filmData?.poster_path || null;
    const posterUrl = getPosterUrlCb(posterPath, POSTER_SIZE.W342);

    if (isFilmLoading) return <div>"Loading skeleton"</div>;
    if (isFilmError) return <div>"Failed to load configuration"</div>; // Убрать
    if (!filmData) return null;

    return (
        <Box component="section" sx={movieDetailsSx.details}>
            {isFilmLoading ? ( // or isFilmFetching
                <div>Load skeleton for image</div>
            ) : (
                <Paper elevation={3} sx={movieDetailsSx.poster}>
                    <img src={posterUrl} alt={filmData.title} />
                </Paper>
            )}
            <Box>
                <Box sx={movieDetailsSx.filmHeader}>
                    <Typography variant="h1" component="h1" sx={movieDetailsSx.filmTitle}>
                        {filmData.title}
                    </Typography>
                    <BackButton />
                </Box>
                <Typography variant="body1" component="p" sx={movieDetailsSx.filmDescription}>
                    {filmData.overview}
                </Typography>

                <Box sx={movieDetailsSx.filmInfo}>
                    <Typography variant="h4" component="h4" sx={movieDetailsSx.filmYear}>
                        Release year:{' '}
                        <Box component="span" sx={movieDetailsSx.filmYearSpan}>
                            {getYearFromDate(filmData.release_date)}
                        </Box>
                    </Typography>
                    <Typography variant="h4" component="h4" sx={movieDetailsSx.vote}>
                        {filmData.vote_average ? filmData.vote_average.toFixed(1) : 0}
                    </Typography>
                    <Typography variant="h4" component="h4" sx={movieDetailsSx.filmRuntime}>
                        Runtime:{' '}
                        <Box component="span" sx={movieDetailsSx.filmRuntimeSpan}>
                            {getFilmRuntime(filmData.runtime)}
                        </Box>
                    </Typography>
                </Box>

                <Typography variant="h3" component="h3" sx={movieDetailsSx.genresTitle}>
                    Genres
                </Typography>
                <Box sx={movieDetailsSx.genresList}>
                    {filmData.genres ? filmData.genres.map(genre => (
                        <Typography key={genre.id} variant="h5" component="h5" sx={movieDetailsSx.genreItem}>
                            {genre.name}
                        </Typography>
                    )) : <Typography variant="h5" component="h5" sx={movieDetailsSx.genreItem}>
                        The genre was not specified by the author
                    </Typography>}
                </Box>
            </Box>
        </Box>
    );
};
