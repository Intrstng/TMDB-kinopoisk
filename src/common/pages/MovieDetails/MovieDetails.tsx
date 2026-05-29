import {useParams} from "react-router";
import {useGetCreditsQuery, useGetFilmQuery, useGetSimilarFilmsQuery} from "@/features/films/api/filmsApi.ts";
import {useMoviesWithConfig} from "@/common/hooks";

export const MovieDetails = () => {
    const params = useParams();
    const filmId = params.id || ''

    const {
        config: configData,
        // isLoading: isConfigLoading,
        // isError: isConfigError,
        // getPosterUrl
    } = useMoviesWithConfig();

    const {
        data: filmData,
        // isFilmLoading,
        // isError: isFilmError
    } = useGetFilmQuery(filmId, {
        skip: !filmId || !configData
    });

    const {
        data: similarFilmsData,
        // isLoading: isSimilarFilmsLoading,
        // isError: isSimilarFilmsError
    } = useGetSimilarFilmsQuery({ movie_id: Number(filmId),language: 'en-US', page: 1 }, {
        skip: !filmId
    });

    const {
        data: creditsData,
        // isLoading: isCreditsLoading,
        // isError: isCreditsError
    } = useGetCreditsQuery({ movie_id: Number(filmId),language: 'en-US', }, {
        skip: !filmId
    });

    if (!filmId) {
        return <div>No movie ID provided</div>;
    }

    return (
        <div>
            MovieDetails: {params.id}
            {JSON.stringify(filmData)}
            {JSON.stringify(similarFilmsData)}
            {JSON.stringify(creditsData)}
        </div>
    );
};