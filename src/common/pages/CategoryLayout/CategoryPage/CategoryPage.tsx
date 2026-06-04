import {useLocation} from 'react-router';
import {useFetchFilmsInfiniteQuery} from '@/features/films/api/filmsApi.ts';
import {useMoviesWithConfig} from '@/common/hooks';
import {POSTER_SIZE} from '@/common/enums';
import {FilmCard} from '@/common/components/FilmCard/FilmCard.tsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PAGE_SIZE} from '@/common/constants';
import {categorySx} from "@/common/pages/CategoryLayout/CategoryPage/CategoryPage.styles.ts";
import {useInfiniteScroll} from "@/common/hooks/useInfiniteScroll.ts";
import {LoadingTrigger} from "@/common/components/LoadingTrigger/LoadingTrigger.tsx";
import {FilmsGallerySkeletonGrid} from "@/common/components/FilmCard/FilmCardSkeleton/FilmCardSkeleton.tsx";
import {CategoryPageHeader} from "@/common/pages/CategoryLayout/CategoryPage/CategoryPageHeader/CategoryPageHeader.tsx";

export const CategoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const currentCategory = segments[segments.length - 1];
    const currentCategoryFormatted = currentCategory.replace(/-/g, '_');

    const {
        config: configData,
        isLoading: isConfigLoading,
        getPosterUrl,
    } = useMoviesWithConfig();

    const {data, isLoading: isMoviesLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage}
        = useFetchFilmsInfiniteQuery(
        {path: currentCategoryFormatted, language: 'en-US'}, {skip: !configData}
    );

    const {observerRef} = useInfiniteScroll({
        hasNextPage,
        isFetching,
        fetchNextPage,
    })

    const filmsData = data?.pages ? data.pages.flatMap((page) => page.results) : []


    if (!isConfigLoading && !isMoviesLoading && filmsData.length === 0) {
        return (
            <Box sx={categorySx.container}>
                <CategoryPageHeader currentCategory={currentCategory}/>
                <Box sx={categorySx.moviesGrid}>
                    <Typography variant={'h3'} component={'h3'} sx={categorySx.error}>No films or invalid response structure...</Typography>
                </Box>
            </Box>
        );
    };

    return (
        <Box sx={categorySx.container}>
            <CategoryPageHeader currentCategory={currentCategory}/>
            <Box sx={categorySx.moviesGrid}>
                {isConfigLoading || isMoviesLoading
                    ? <FilmsGallerySkeletonGrid count={PAGE_SIZE}/>
                    : filmsData.map(movie => (
                        <FilmCard key={movie.id} film={movie}
                                  source={getPosterUrl(movie.poster_path, POSTER_SIZE.W342)}/>
                    ))}
            </Box>

            {hasNextPage && (
                <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage}/>
            )}
            {!hasNextPage && filmsData.length > 0
                && <Typography variant={'h3'}
                               component={'h3'}
                               sx={categorySx.error}>
                    Nothing more to load
                </Typography>}
        </Box>
    );
};
