import type {FilmGalleryProps} from "@/common/components/FilmsGallery/types.ts";
import {useMoviesWithConfig} from "@/common/hooks";
import {useFetchFilmsQuery} from "@/features/films/api/filmsApi.ts";
import s from "./FilmsGallery.module.css";
import FilmCard from "@/common/components/FilmCard/FilmCard.tsx";
import {POSTER_SIZE} from "@/common/enums";
import {GALLERY_LENGTH} from "@/common/constants";
import {NavLink} from "react-router-dom";
import {PATH} from "@/common/enums";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {galleryTitleSx} from "@/common/components/FilmsGallery/FilmsGallery.styles.ts";

export const FilmsGallery = ({path, title}: FilmGalleryProps) => {
    const pathFormatted = path.replace(/-/g, '_');

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl
    } = useMoviesWithConfig();


    const {
        data: filmsData,
        isLoading: isMoviesLoading,
        // isError: isMoviesError
    } = useFetchFilmsQuery({ category: pathFormatted, language: 'en-US', page: 1 },
        {
            skip: !configData,
        });

    if (isConfigLoading || isMoviesLoading) {
        return <div className={s.loader}>Загрузка skeleton...</div>;
    }

    if (!filmsData?.results) {
        return <div className={s.error}>No films or invalid response structure...</div>;
    }

    const films = filmsData?.results.slice(0, GALLERY_LENGTH) || [];

    return (
        <Box className={s.container}>
            <Box className={s.galleryHeader}>
                <Typography variant={'h1'} component={'h1'} sx={galleryTitleSx}>{title}</Typography>
                <NavLink to={`${PATH.CATEGORY}/${path}`} className={s.link}>View more</NavLink>
            </Box>


            <Box className={s.moviesGrid}>
                {films.map((film) => (
                    <FilmCard key={film.id} film={film} source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)}/>
                ))}
            </Box>
        </Box>
    );
};
