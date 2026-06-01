import { useGetGenresQuery } from '@/features/films/api/filmsApi.ts';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { genresBlockSx, genresControlsSx } from '@/common/components/Genres/Genres.styles.ts';
import { SEARCH_PARAMS } from '@/common/enums';

export const Genres = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedGenresParam = searchParams.get(SEARCH_PARAMS.GENRES);

    const {
        data: genresData,
        // isLoading: isGenresLoading,
        // // isError: isGenresError
    } = useGetGenresQuery({ language: 'en' });

    const handleGenreClick = (genreId: number) => {
        const genreIdStr = genreId.toString();
        const currentGenres = selectedGenresParam?.split(',') || [];

        const updatedGenres = currentGenres.includes(genreIdStr)
            ? currentGenres.filter(id => id !== genreIdStr)
            : [...currentGenres, genreIdStr];

        const newSearchParams = new URLSearchParams(searchParams);

        if (updatedGenres.length === 0) {
            newSearchParams.delete(SEARCH_PARAMS.GENRES);
        } else {
            newSearchParams.set(SEARCH_PARAMS.GENRES, updatedGenres.join(','));
        }
        setSearchParams(newSearchParams);
    };

    const isGenreSelected = (genreId: number) => {
        return selectedGenresParam?.split(',').includes(genreId.toString());
    };

    // if(isGenresLoading) return <div>Loading genres controls skeleton...</div>;
    if (genresData?.genres?.length === 0) return null;

    return (
        <Box sx={genresBlockSx}>
            {genresData?.genres?.map(genre => (
                <Button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    sx={genresControlsSx}
                    className={isGenreSelected(genre.id) ? 'active' : ''}
                    variant={isGenreSelected(genre.id) ? 'contained' : 'outlined'}
                >
                    {genre.name}
                </Button>
            ))}
        </Box>
    );
};
