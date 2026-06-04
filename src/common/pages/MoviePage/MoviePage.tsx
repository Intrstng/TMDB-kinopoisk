import {MovieDetails} from '@/common/components/MovieDetails/MovieDetails.tsx';
import {useParams} from 'react-router';
import {useMoviesWithConfig} from '@/common/hooks';
import {Cast} from '@/common/components/Cast';
import {SimilarFilms} from '@/common/components/SimilarFilms';
import Typography from "@mui/material/Typography";
import {moviePageErrorSx} from "@/common/pages/MoviePage/MainPage.styles.ts";

export const MoviePage = () => {
    const params = useParams();
    const filmId = params.id || '';

    const {
        config: configData,
        isLoading: isConfigLoading,
        getPosterUrl,
    } = useMoviesWithConfig();

    if (!isConfigLoading && !configData) return <Typography variant={'h3'} component={'h3'} sx={moviePageErrorSx}>No configuration data or invalid response structure...</Typography>
    /**
     * Далее config уже точно есть, поэтому передавать configData для skip в MovieDetails, Cast, SimilarFilms не надо
     */

    return (
        <>
            <MovieDetails filmId={filmId} getPosterUrlCb={getPosterUrl} />
            <Cast filmId={filmId} getPosterUrlCb={getPosterUrl} />
            <SimilarFilms filmId={filmId} getPosterUrlCb={getPosterUrl} />
        </>
    );
};
