import {useLocation} from "react-router";
import {useFetchFilmsQuery} from "@/features/films/api/filmsApi.ts";
import {useMoviesWithConfig} from "@/common/hooks";
import {POSTER_SIZE} from "@/common/enums";
import s from './CategoryPage.module.css'
import FilmCard from "@/common/components/FilmCard/FilmCard.tsx";
import Box from "@mui/material/Box";

export const CategoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const currentCategory = segments[segments.length - 1];
    const currentCategoryFormatted = currentCategory.replace(/-/g, '_');

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
    } = useFetchFilmsQuery({ category: currentCategoryFormatted, language: 'en-US', page: 1 },
        {
            skip: !configData,
        });

    if (isConfigLoading || isMoviesLoading) {
        return <div className={s.loader}>Загрузка skeleton...</div>;
    }

    if (!filmsData?.results) {
        return <div className={s.error}>No films or invalid response structure...</div>;
    }

    const films = filmsData?.results || [];

    return (
        <Box className={s.container}>
            <h1 className={s.title}>Category: {currentCategory}</h1>

            <Box className={s.moviesGrid}>
                {films.map((movie) => (
                    <FilmCard key={movie.id} film={movie} source={getPosterUrl(movie.poster_path, POSTER_SIZE.W342)}/>
                ))}
            </Box>
        </Box>
    );
};
