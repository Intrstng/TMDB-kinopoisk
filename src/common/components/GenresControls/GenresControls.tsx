import {useGetGenresQuery} from "@/features/films/api/filmsApi.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ResetFiltersButton} from "@/common/components/ResetFiltersButton/ResetFiltersButton.tsx";
import {PATH} from "@/common/enums";
import {genresControlsSx} from "@/common/components/GenresControls/GenresControls.styles.ts";

export const GenresControls = () => {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const {
        data: genresData,
        // isLoading: isGenresLoading,
        // // isError: isGenresError
    } = useGetGenresQuery({ language: 'en' });


    const selectedGenresParam = searchParams.get('genre');


    const handleGenreClick = (genreId: number) => {
        const currentGenres = selectedGenresParam?.split(',') || [];
        const genreIdStr = genreId.toString();

        const updatedGenres = currentGenres.includes(genreIdStr)
            ? currentGenres.filter(id => id !== genreIdStr)
            : [...currentGenres, genreIdStr];

        if (updatedGenres.length === 0) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('genre');
            navigate(`${PATH.FILTERED}?${newSearchParams.toString()}`, { replace: true });
        } else {
            // Добавляем genre без кодирования запятых
            navigate(`${PATH.FILTERED}?genre=${updatedGenres.join(',')}`, { replace: true });
        }
    };

    const isGenreSelected = (genreId: number) => {
        return selectedGenresParam?.split(',').includes(genreId.toString());
    };

    // if(isGenresLoading) return <div>Loading genres controls skeleton...</div>;
    if (genresData?.genres.length === 0) return null;

    return (
        <Box>
             {genresData?.genres.map((genre) => (
                <Button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    sx={genresControlsSx}
                    className={isGenreSelected(genre.id) ? "active" : ""}
                    variant={isGenreSelected(genre.id) ? "contained" : "outlined"}
                >
                    {genre.name}
                </Button>
            ))}
            <ResetFiltersButton/>
        </Box>
    );
};