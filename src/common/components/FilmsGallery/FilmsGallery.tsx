import type {FilmGalleryProps} from '@/common/components/FilmsGallery/types.ts';
import {useMoviesWithConfig} from '@/common/hooks';
import {FilmCard} from '@/common/components/FilmCard/FilmCard.tsx';
import {POSTER_SIZE} from '@/common/enums';
import {GALLERY_LENGTH} from '@/common/constants';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {gallerySx} from '@/common/components/FilmsGallery/FilmsGallery.styles.ts';
import {LoadMoreButton} from "@/common/components/LoadMoreButton/LoadMoreButton.tsx";
import {useFetchFilmsInfiniteQuery} from "@/features/films/api/filmsApi.ts";

export const FilmsGallery = ({ path, title }: FilmGalleryProps) => {
    const pathFormatted = path.replace(/-/g, '_');

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {
        data,
        isLoading: isMoviesLoading,
        // isFetching
    } = useFetchFilmsInfiniteQuery(
        { path: pathFormatted, language: 'en-US' },
        {
            skip: !configData,
        }
    );

    const filmsData = data?.pages.flatMap((page) => page.results) || []

    if (isConfigLoading || isMoviesLoading) {
        return <Box sx={{}}>Загрузка skeleton...</Box>; //add sx styles
    }

    if (filmsData?.length === 0) {
        return <Typography variant={'h3'} component={'h3'} sx={gallerySx.error}>
            No films or invalid response structure...
        </Typography>
    }

    const films = filmsData?.slice(0, GALLERY_LENGTH) || [];

    return (
        <Box sx={gallerySx.container}>
            <Box sx={gallerySx.galleryHeader}>
                <Typography variant={'h1'} component={'h1'} sx={gallerySx.title}>
                    {title}
                </Typography>
                <LoadMoreButton path={path} title={'View more'}/>
            </Box>

            <Box sx={gallerySx.moviesGrid}>
                {films.map(film => (
                    <FilmCard key={film.id} film={film} source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)} />
                ))}
            </Box>
        </Box>
    );
};
