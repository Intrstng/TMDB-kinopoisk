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
import {FilmsGallerySkeletonGrid} from "@/common/components/FilmCard/FilmCardSkeleton/FilmCardSkeleton.tsx";

export const FilmsGallery = ({ path, title }: FilmGalleryProps) => {
    const pathFormatted = path.replace(/-/g, '_');

    const {
        config: configData,
        isLoading: isConfigLoading,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {
        data,
        isLoading: isMoviesLoading,
    } = useFetchFilmsInfiniteQuery(
        { path: pathFormatted, language: 'en-US' },
        {
            skip: !configData,
        }
    );

    const filmsData = data?.pages ? data.pages.flatMap((page) => page.results) : []
    const films = filmsData.slice(0, GALLERY_LENGTH);

    if (!isConfigLoading && !isMoviesLoading && filmsData?.length === 0) {
        return <Typography variant={'h3'} component={'h3'} sx={gallerySx.error}>
            No films or invalid response structure...
        </Typography>
    }

    return (
        <Box sx={gallerySx.container}>
            <Box sx={gallerySx.galleryHeader}>
                <Typography variant={'h2'} component={'h2'} sx={gallerySx.title}>
                    {title}
                </Typography>
                <LoadMoreButton path={path} title={'View more'}/>
            </Box>

            <Box sx={gallerySx.moviesGrid}>
                {isConfigLoading || isMoviesLoading
                    ? <FilmsGallerySkeletonGrid count={GALLERY_LENGTH} />
                    : films.map(film => (
                        <FilmCard key={film.id} film={film} source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)} />
                    ))}
            </Box>
        </Box>
    );
};
