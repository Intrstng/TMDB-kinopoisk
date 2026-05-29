import {useLocation} from "react-router";
import {useFetchFilmsQuery} from "@/features/films/api/filmsApi.ts";
import {useMoviesWithConfig} from "@/common/hooks";
import {POSTER_SIZE} from "@/common/enums";
import s from './CategoryPage.module.css'
import FilmCard from "@/common/components/FilmCard/FilmCard.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {categoryTitleSx} from "@/common/pages/CategoryLayout/CategoryPage/CategoryPage.styles.ts";
import {CATEGORY_LINKS} from "@/common/constants";
import {PathLink} from "@/common/components/PathLink/PathLink.tsx";

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

    const categoryLinks = CATEGORY_LINKS.map(link => (
        <PathLink key={link.id} path={link.path} title={link.title}/>
    ))

    return (
        <Box className={s.container}>
            <Box className={s.categoryHeader}>
                <Typography variant={'h1'} component={'h1'} sx={categoryTitleSx}>Category: {currentCategory}</Typography>
                <Box className={s.categoryNav}>
                    {categoryLinks}
                </Box>
            </Box>
            <Box className={s.moviesGrid}>
                {films.map((movie) => (
                    <FilmCard key={movie.id} film={movie} source={getPosterUrl(movie.poster_path, POSTER_SIZE.W342)}/>
                ))}
            </Box>
        </Box>
    );
};
