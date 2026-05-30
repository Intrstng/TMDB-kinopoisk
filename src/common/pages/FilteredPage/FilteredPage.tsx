import Box from "@mui/material/Box";
import {GenresControls} from "@/common/components/GenresControls/GenresControls.tsx";
import {ResetFiltersButton} from "@/common/components/ResetFiltersButton/ResetFiltersButton.tsx";
import {RatingRange} from "@/common/components/RatingRange/RatingRange.tsx";

export const FilteredPage = () => {


    // const {
    //     // config: configData,
    //     // isLoading: isConfigLoading,
    //     // isError: isConfigError,
    //     // getPosterUrl
    // } = useMoviesWithConfig();

    // const {
    //     data: searchFilmsData,
    //     // isLoading: isSearchLoading,
    //     isFetching: isSearchFetching,
    // } = useSearchFilmQuery(
    //     {query, page},
    //     {skip: !query || !configData}
    // );

    // const {
    //     data: searchFilmsData,
    //     // isLoading: isSearchLoading,
    //     isFetching: isSearchFetching,
    // } = useSortFilmsQuery(
    //     // {query, page},
    //     {},
    //     {skip: !configData}
    // );


    return (
        <Box>
            <RatingRange/>
            <GenresControls/>
            <ResetFiltersButton />
        </Box>
    );
};


//     with_genres: z.string().optional(),
//     sort_by: SortBySchema,
//     vote_average_gte: z.number().nonnegative(),
//     vote_average_lte: z.number().nonnegative(),
//     page: z.number().int().positive(),

// Пример с несколькими фильтрами
// const handleFiltersChange = (filters) => {
//     const params = new URLSearchParams();
//     if (filters.genre) params.set('genre', filters.genre);
//     if (filters.year) params.set('year', filters.year);
//     if (filters.sort) params.set('sort', filters.sort);
//     setSearchParams(params);
// };