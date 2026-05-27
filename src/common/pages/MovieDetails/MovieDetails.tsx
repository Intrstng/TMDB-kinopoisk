import {useParams} from "react-router";
import {useGetFilmQuery} from "@/features/films/api/filmsApi.ts";

export const MovieDetails = () => {
    const params = useParams();
    const filmId = params.id || ''

    const {
        data,
        // isLoading,
        // isError: isMoviesError
    } = useGetFilmQuery(filmId, {
        skip: !filmId
    });

    if (!filmId) {
        return <div>No movie ID provided</div>;
    }

    return (
        <div>
            MovieDetails: {params.id}
            {JSON.stringify(data)}
        </div>
    );
};