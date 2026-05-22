import {useParams} from "react-router";

export const MovieDetails = () => {
    const params = useParams();

    return (
        <div>
            MovieDetails: {params.id}
        </div>
    );
};