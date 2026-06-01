import {useLocation} from 'react-router';
import {useFetchFilmsQuery} from '@/features/films/api/filmsApi.ts';
import {useMoviesWithConfig} from '@/common/hooks';
import {POSTER_SIZE} from '@/common/enums';
import {FilmCard} from '@/common/components/FilmCard/FilmCard.tsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CATEGORY_LINKS} from '@/common/constants';
import {PathLink} from '@/common/components/PathLink/PathLink.tsx';
import {categorySx} from "@/common/pages/CategoryLayout/CategoryPage/CategoryPage.styles.ts";

export const CategoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const currentCategory = segments[segments.length - 1];
    const currentCategoryFormatted = currentCategory.replace(/-/g, '_');

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {
        data: filmsData,
        isLoading: isMoviesLoading,
        // isError: isMoviesError
    } = useFetchFilmsQuery(
        { category: currentCategoryFormatted, language: 'en-US', page: 1 },
        {
            skip: !configData,
        }
    );

    if (isConfigLoading || isMoviesLoading) {
        return <Box sx={categorySx.loader}>Загрузка skeleton...</Box>;
    }

    if (!filmsData?.results) {
        return <Box sx={categorySx.error}>No films or invalid response structure...</Box>;
    }

    const films = filmsData?.results || [];

    const categoryLinks = CATEGORY_LINKS.map(link => <PathLink key={link.id} path={link.path} title={link.title} />);

    return (
        <Box sx={categorySx.container}>
            <Box sx={categorySx.header}>
                <Typography variant={'h1'} component={'h1'} sx={categorySx.title}>
                    Category: {currentCategory}
                </Typography>
                <Box sx={categorySx.nav}>{categoryLinks}</Box>
            </Box>
            <Box sx={categorySx.moviesGrid}>
                {films.map(movie => (
                    <FilmCard key={movie.id} film={movie} source={getPosterUrl(movie.poster_path, POSTER_SIZE.W342)} />
                ))}
            </Box>
        </Box>
    );
};
