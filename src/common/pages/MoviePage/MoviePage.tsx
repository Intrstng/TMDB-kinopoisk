import {MovieDetails} from "@/common/components/MovieDetails/MovieDetails.tsx";
import {useParams} from "react-router";
import {useMoviesWithConfig} from "@/common/hooks";
import {Cast} from "@/common/components/Cast";
import {SimilarFilms} from "@/common/components/SimilarFilms";


export const MoviePage = () => {
    const params = useParams();
    const filmId = params.id || ''

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl
    } = useMoviesWithConfig();

    if (isConfigLoading) return <div>"Loading skeleton main"</div>;

    if (!configData) return <div>"Failed to load configuration"</div>;
    // далее config уже точно есть, поэтому передавать configData для skip в MovieDetails, Cast, SimilarFilms не надо

    if (!filmId) {
        return <div>No movie ID provided</div>;
    }

    return (
        <>
            <MovieDetails filmId={filmId} getPosterUrlCb={getPosterUrl}/>
            <Cast filmId={filmId} getPosterUrlCb={getPosterUrl}/>
            <SimilarFilms filmId={filmId} getPosterUrlCb={getPosterUrl}/>
        </>
    );
};
