import type {DetailsProps} from "@/common/components/MovieDetails/types.ts";
import {useGetSimilarFilmsQuery} from "@/features/films/api/filmsApi.ts";
import s from "@/common/components/FilmsGallery/FilmsGallery.module.css";
import {GALLERY_LENGTH} from "@/common/constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilmCard from "@/common/components/FilmCard/FilmCard.tsx";
import {POSTER_SIZE} from "@/common/enums";
import {moviesGridSx, similarTitleSx} from "@/common/components/SimilarFilms/SimilarFilms.styles.ts";

export const SimilarFilms = ({filmId, getPosterUrlCb}: DetailsProps) => {
    const {
        data: similarFilmsData,
        isLoading: isSimilarFilmsLoading,
        // isError: isSimilarFilmsError
    } = useGetSimilarFilmsQuery({movie_id: Number(filmId), language: 'en-US', page: 1}, {
        skip: !filmId
    });

    if (isSimilarFilmsLoading) {
        return <div className={s.loader}>Загрузка Similar skeleton...</div>;
    }

    if (similarFilmsData?.results.length === 0) {
        return <div className={s.error}>No Similar films info or invalid response structure...</div>; // add styles
    }

    const similarFilms = similarFilmsData?.results.slice(0, GALLERY_LENGTH) || [];

    return (
        <Box>
            <Typography variant={'h1'} component={'h1'} sx={similarTitleSx}>Similar movies</Typography>
            <Box sx={moviesGridSx}>
                {similarFilms.map((film) => (
                    <FilmCard key={film.id} film={film} source={getPosterUrlCb(film.poster_path, POSTER_SIZE.W342)}/>
                ))}
            </Box>
        </Box>
    );
};
