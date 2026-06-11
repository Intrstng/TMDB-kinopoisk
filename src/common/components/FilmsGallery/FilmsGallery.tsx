import type {FilmGalleryProps} from '@/common/components/FilmsGallery/types.ts';
import {useAppSelector, useMoviesWithConfig} from '@/common/hooks';
import {POSTER_SIZE} from '@/common/enums';
import {GALLERY_LENGTH} from '@/common/constants';
import {FilmCard, FilmsGallerySkeletonGrid, LoadMoreButton} from '@/common/components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {gallerySx} from '@/common/components/FilmsGallery/FilmsGallery.styles.ts';
import {useFetchFilmsInfiniteQuery} from "@/features/films/api/filmsApi.ts";
import {selectUser} from "@/app/model/slices/app-slice.ts";

export const FilmsGallery = ({ path, title }: FilmGalleryProps) => {
    const user = useAppSelector(selectUser);
    const pathFormatted = path.replace(/-/g, '_');
console.log('user', user?.uid, !!user)
    const {
        config: configData,
        isLoading: isConfigLoading,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {
        data,
        isLoading: isMoviesLoading,
    } = useFetchFilmsInfiniteQuery(
        { path: pathFormatted, language: 'en-US', userUid: user?.uid },
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
                        <FilmCard key={film.id} film={film} source={getPosterUrl(film.poster_path, POSTER_SIZE.W342)}/>
                    ))}
            </Box>
        </Box>
    );
};
