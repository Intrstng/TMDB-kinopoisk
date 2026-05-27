import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {SearchFilmForm} from "@/common/components/SearchFilmForm/SearchFilmForm.tsx";
import {useSearchFilmQuery} from "@/features/films/api/filmsApi.ts";
import {useState} from "react";

export const SearchPage = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const {
        data: searchFilmsData,
        // isLoading: isSearchLoading,
        isFetching: isSearchFetching,
    } = useSearchFilmQuery(
        { query: searchValue, page: 1 },
        { skip: !searchValue }
    );

    const handleSearch = (search: string) => {
        if (search.trim()) {
            setSearchValue(search);
        }
    };

    return (
        <Box>
            <Typography variant="h2" component="h2">Search Results</Typography>
            <SearchFilmForm onSearch={handleSearch} isSearchFetching={isSearchFetching}/>

            {!searchValue && (
                <Typography>Enter a movie title to start searching.</Typography>
            )}

            {searchValue && (
                <>
                    <Typography>Results for "{searchValue}"</Typography>

                    {isSearchFetching && <div>Loading...</div>}

                    {searchFilmsData && !isSearchFetching && (
                        <div>
                            {searchFilmsData.results?.map((film) => (
                                <div key={film.id}>
                                    <h3>{film.title}</h3>
                                    <p>{film.overview}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isSearchFetching && !searchFilmsData?.results?.length && (
                        <div>No movies found for "{searchValue}"</div>
                    )}
                </>
            )}
        </Box>
    );
};