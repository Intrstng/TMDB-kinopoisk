import {useGetCreditsQuery} from "@/features/films/api/filmsApi.ts";
import s from "@/common/components/FilmsGallery/FilmsGallery.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {POSTER_SIZE} from "@/common/enums";
import {GALLERY_LENGTH} from "@/common/constants";
import {CastItem} from "@/common/components/Cast/CastItem/CastItem.tsx";
import type {DetailsProps} from "@/common/components/MovieDetails/types.ts";
import {castTitleSx, moviesGridSx} from "@/common/components/Cast/Cast.styles.ts";

export const Cast = ({filmId, getPosterUrlCb}: DetailsProps) => {
    const {
        data: creditsData,
        isLoading: isCreditsLoading,
        // isError: isCreditsError
    } = useGetCreditsQuery({movie_id: Number(filmId), language: 'en-US',}, {
        skip: !filmId
    });

    if (isCreditsLoading) {
        return <div className={s.loader}>Загрузка Cast skeleton...</div>;
    }

    if (creditsData?.cast.length === 0) {
        return <div className={s.error}>No Cast info or invalid response structure...</div>; // add styles
    }

    const actorsCast = creditsData?.cast.slice(0, GALLERY_LENGTH) || [];

    return (
        <Box>
            <Typography variant={'h1'} component={'h1'} sx={castTitleSx}>Cast</Typography>
            <Box sx={moviesGridSx}>
                {actorsCast.map((actor) => (
                    <CastItem key={actor.id} name={actor.name} character={actor.character} avatarUrl={getPosterUrlCb(actor.profile_path, POSTER_SIZE.W185)}/>
                ))}
            </Box>
        </Box>
    );
};
