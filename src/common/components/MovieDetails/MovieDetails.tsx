import {useGetFilmQuery} from '@/features/films/api/filmsApi.ts';
import {POSTER_SIZE} from '@/common/enums';
import type {DetailsProps} from '@/common/components/MovieDetails/types.ts';
import noPoster from '@/assets/images/no_poster.jpg'
import {MovieDetailsGenresSkeleton, MovieDetailsHeaderSkeleton, MovieDetailsInfoSkeleton, MovieDetailsPosterSkeleton, MovieDetailsPoster, MovieDetailsHeader, MovieDetailsInfo, MovieDetailsGenres} from "@/common/components";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {movieDetailsSx} from '@/common/components/MovieDetails/MovieDetails.styles.ts';
import {moviePageErrorSx} from "@/common/pages/MoviePage/MoviePage.styles.ts";

export const MovieDetails = ({ filmId, getPosterUrlCb }: DetailsProps) => {
    const { data: filmData, isLoading: isFilmLoading, isFetching: isFetching } = useGetFilmQuery(filmId);

    const posterPath = filmData?.poster_path || null;
    const posterUrl = getPosterUrlCb(posterPath, POSTER_SIZE.W342) || noPoster;

    if (!isFilmLoading && !filmData) return <Typography variant={'h3'} component={'h3'} sx={moviePageErrorSx}>No film data or invalid response structure...</Typography>;

    return (
        <Box component="section" sx={movieDetailsSx.details}>
            {isFetching ? (
                <>
                    <MovieDetailsPosterSkeleton/>
                    <Box sx={movieDetailsSx.filmInfoBlock}>
                        <MovieDetailsHeaderSkeleton/>
                        <MovieDetailsInfoSkeleton/>

                        <Typography variant="h3" component="h3" sx={movieDetailsSx.genresTitle}>
                            Genres
                        </Typography>
                        <MovieDetailsGenresSkeleton/>
                    </Box>
                </>
            ) : (
                <>
                    <MovieDetailsPoster sourceUrl={posterUrl} text={filmData?.title}/>
                    <Box sx={movieDetailsSx.filmInfoBlock}>
                        <MovieDetailsHeader data={filmData}/>
                        <MovieDetailsInfo data={filmData}/>

                        <Typography variant="h3" component="h3" sx={movieDetailsSx.genresTitle}>
                            Genres
                        </Typography>
                        <MovieDetailsGenres data={filmData} isLoading={isFilmLoading}/>
                    </Box>
                </>
            )}
        </Box>
    );
};
