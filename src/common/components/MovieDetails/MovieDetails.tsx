import {useGetFilmQuery} from '@/features/films/api/filmsApi.ts';
import {POSTER_SIZE} from '@/common/enums';
import type {DetailsProps} from '@/common/components/MovieDetails/types.ts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {movieDetailsSx} from '@/common/components/MovieDetails/MovieDetails.styles.ts';
import noPoster from '@/assets/images/no_poster.jpg'
import {moviePageErrorSx} from "@/common/pages/MoviePage/MoviePage.styles.ts";
import {MovieDetailsHeader} from "@/common/components/MovieDetails/MovieDetailsHeader/MovieDetailsHeader.tsx";
import {MovieDetailsInfo} from "@/common/components/MovieDetails/MovieDetailsInfo/MovieDetailsInfo.tsx";
import {MovieDetailsGenres} from "@/common/components/MovieDetails/MovieDetailsGenres/MovieDetailsGenres.tsx";
import {
    MovieDetailsGenresSkeleton,
    MovieDetailsHeaderSkeleton, MovieDetailsInfoSkeleton,
    MovieDetailsPosterSkeleton
} from "@/common/components/MovieDetails/MovieDetailsSkeletons/MovieDetailsSkeletons.tsx";
import {MovieDetailsPoster} from "@/common/components/MovieDetails/MovieDetailsPoster/MovieDetailsPoster.tsx";

export const MovieDetails = ({ filmId, getPosterUrlCb }: DetailsProps) => {
    const { data: filmData, isLoading: isFilmLoading } = useGetFilmQuery(filmId);

    const posterPath = filmData?.poster_path || null;
    const posterUrl = getPosterUrlCb(posterPath, POSTER_SIZE.W342) || noPoster;

    if (!isFilmLoading && !filmData) return <Typography variant={'h3'} component={'h3'} sx={moviePageErrorSx}>No film data or invalid response structure...</Typography>;

    return (
        <Box component="section" sx={movieDetailsSx.details}>
            {isFilmLoading ? (
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
