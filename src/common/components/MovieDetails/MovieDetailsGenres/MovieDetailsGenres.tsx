import Box from "@mui/material/Box";
import {movieDetailsSx} from "@/common/components/MovieDetails/MovieDetails.styles.ts";
import Typography from "@mui/material/Typography";
import type {MovieDetailsGenresProps} from "@/common/components/MovieDetails/types.ts";

export const MovieDetailsGenres = ({data, isLoading}: MovieDetailsGenresProps) => {
    return (
        <Box sx={movieDetailsSx.genresList}>
            {!isLoading && data?.genres ? data?.genres.map(genre => (
                <Typography key={genre.id} variant="h5" component="h5" sx={movieDetailsSx.genreItem}>
                    {genre.name}
                </Typography>
            )) : <Typography variant="h5" component="h5" sx={movieDetailsSx.genreItem}>
                The genre was not specified by the author
            </Typography>}
        </Box>
    );
};