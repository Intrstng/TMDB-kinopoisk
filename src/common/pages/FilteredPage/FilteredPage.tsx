import {useGetGenresQuery} from "@/features/films/api/filmsApi.ts";
import {useMoviesWithConfig} from "@/common/hooks";

export const FilteredPage = () => {
    const {
        data: genresData,
        // isLoading: isGenresLoading,
        // // isError: isGenresError
    } = useGetGenresQuery({ language: 'en' });

    const {
        // config: configData,
        // isLoading: isConfigLoading,
        // isError: isConfigError,
        // getPosterUrl
    } = useMoviesWithConfig();

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
        <div>
            FilteredPage {JSON.stringify(genresData)}

        </div>
    );
};


//     with_genres: z.string().optional(),
//     sort_by: SortBySchema,
//     vote_average_gte: z.number().nonnegative(),
//     vote_average_lte: z.number().nonnegative(),
//     page: z.number().int().positive(),